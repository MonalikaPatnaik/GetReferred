"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user types
    if (emailError) {
      setEmailError('');
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Redirect to OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&userType=login`);
      
      // In a real app, you would call your API to send OTP to the user's email
      console.log('Sending OTP to:', email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Welcome Back</h2>
          <p className="text-lg text-gray-600 mb-8">Log in to your Referrly account</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleContinue}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent`}
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
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
