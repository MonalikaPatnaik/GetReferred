"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "../components/Navbar";
import OtpVerification from "../components/OtpVerification";
import { ApiService } from '../services/apiService';

// Create a client component that uses useSearchParams
function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    // Get email and userType from URL parameters
    const emailParam = searchParams.get('email');
    const userTypeParam = searchParams.get('userType');
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Redirect to home if no email provided
      router.push('/');
    }
    
    if (userTypeParam) {
      setUserType(userTypeParam);
    }

    // If we have formData in sessionStorage (from the signup page), retrieve it
    const storedFormData = sessionStorage.getItem('signupFormData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [searchParams, router]);

  // Handle verification for referrer users
  const handleReferrerVerification = async (email: string, otpValue: string) => {
    // Check if this is a signup or login attempt
    const isSignup = !!formData;
    
    try {
      // Check if the referrer exists
      const referrerExists = await ApiService.checkReferrerEmailExists(email);
      
      if (isSignup) {
        // This is a signup attempt
        if (referrerExists) {
          // If the user already exists, show an error
          throw new Error('An account with this email already exists. Please login instead.');
        }
        
        // Create new referrer with OTP verification
        await ApiService.verifyOTPAndCreateReferrer({
          full_name: formData.name,
          email_company: email,
          email_personal: formData.personalEmail || null,
          phone_number: formData.phone,
          company_name: formData.company,
          role: formData.role,
          linkedin_url: formData.linkedin,
          years_of_exp: parseInt(formData.experience),
          twitter_url: formData.twitterUrl || null,
          portfolio_links: formData.portfolioUrl || null,
          otp: otpValue
        });
        
        // Clear the stored form data
        sessionStorage.removeItem('signupFormData');
      } else {
        // This is a login attempt
        if (!referrerExists) {
          // If the user doesn't exist, show an error
          throw new Error('No account found with this email. Please sign up first.');
        }
        
        // Verify OTP for existing referrer
        await ApiService.verifyOTP(email, otpValue);
      }
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      throw error; // Re-throw to be caught by the parent handler
    }
  };

  // Handle OTP verification
  const handleVerify = async (otpValue: string) => {
    setError('');
    setIsSubmitting(true);
    
    try {
      // Check if userType is provided
      if (!userType) {
        throw new Error('Invalid login attempt. Please try again from the login page.');
      }
      
      if (userType === 'referrer') {
        await handleReferrerVerification(email, otpValue);
      } else if (userType === 'referee') {
        throw new Error('Referee login is not available yet. Please use referrer login.');
      } else {
        throw new Error('Invalid user type. Please try again.');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <OtpVerification 
          email={email}
          onVerify={handleVerify}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyOtpLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component that wraps the content in a Suspense boundary
function VerifyOtpPage() {
  return (
    <Suspense fallback={<VerifyOtpLoading />}>
      <VerifyOtpContent />
    </Suspense>
  );
}

export default VerifyOtpPage;
