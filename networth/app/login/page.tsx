"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';
import { ApiService } from '../services/apiService';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send OTP via API - the backend will check if the email exists
      await ApiService.sendOTP(email, 'referrer');
      
      // Redirect to OTP verification page with correct user type
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&userType=referrer`);
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error for non-existent email
      if (error.message?.includes('not found') || error.message?.includes('No account')) {
        setError('No account found with this email. Please sign up first.');
      } else {
        setError(error.message || 'Failed to send verification code');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Welcome Back</h2>
          <p className="text-lg text-gray-600 mb-8">Log in to your Referrly account</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent`}
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors mt-6 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                Continue
              </button>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don&apos;t have an account? <Link href="/onboarding" className="text-[#118B50] hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <ImageComponent 
            src="/assets/onboard.jpg" 
            alt="Referral Illustration" 
            width={500}
            height={400}
            priority={true}
          />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
