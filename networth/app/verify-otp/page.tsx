"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from "../components/Navbar";
import OtpVerification from "../components/OtpVerification";

// Create a client component that uses useSearchParams
function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [searchParams, router]);

  const handleVerify = (otpValue: string) => {
    setIsSubmitting(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsSubmitting(false);
      
      // In a real app, you would verify the OTP with your backend
      console.log("OTP entered:", otpValue, "for email:", email, "user type:", userType);
      
      // Redirect based on user type after successful verification
      if (userType === 'referee') {
        alert('Referee signup successful!');
        router.push('/referee-dashboard');
      } else {
        alert('Login successful!');
        router.push('/dashboard');
      }
    }, 1500);
  };

  const handleBack = () => {
    // Redirect back based on user type
    if (userType === 'referee') {
      router.push('/referee-signup');
    } else if (userType === 'referrer') {
      router.push('/referrer-signup');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600">We&apos;ve sent a verification code to your email</p>
        </div>
        
        <OtpVerification 
          email={email} 
          onVerify={handleVerify} 
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyOtpLoading() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600">Loading verification...</p>
        </div>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#118B50]"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component that wraps the content in a Suspense boundary
const VerifyOtpPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<VerifyOtpLoading />}>
        <VerifyOtpContent />
      </Suspense>
    </div>
  );
};

export default VerifyOtpPage;
