"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';
import OtpVerification from '../components/OtpVerification';

const RefereeSignupPage = () => {
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState('');
  const [linkedinError, setLinkedinError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    phone: '',
    yearOfPassing: '',
    skills: '',
    githubUrl: '',
    leetcodeUrl: '',
    codeforcesUrl: '',
    codechefUrl: '',
    portfolioUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear errors when user types
    if (id === 'email' && emailError) {
      setEmailError('');
    }
    if (id === 'linkedin' && linkedinError) {
      setLinkedinError('');
    }
  };

  // Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // LinkedIn validation function
  const validateLinkedIn = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return regex.test(url);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate email
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // Validate LinkedIn
    if (!validateLinkedIn(formData.linkedin)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
      isValid = false;
    }
    
    if (isValid) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setStep(3); // Move to OTP verification step
  };

  const handleOtpVerification = (otpValue: string) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would verify the OTP with your backend
      console.log('OTP submitted:', otpValue);
      alert('Signup successful!');
      // Redirect or show success message
    }, 1500);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleBackFromOtp = () => {
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Join as a Referee👋</h2>
          <p className="text-lg text-gray-600 mb-8">Tell us about yourself to become a referee.</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {step === 1 ? (
              <form onSubmit={handleContinue}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    // placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent`}
                    placeholder="Enter your email address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500">{emailError}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    // placeholder="Enter your phone number"
                    required
                    pattern="^\d{10}$"
                    title="Please enter a valid 10-digit phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-gray-700 text-sm font-medium mb-1">
                    LinkedIn Profile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    className={`w-full px-3 py-2 border ${linkedinError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent`}
                    placeholder="https://linkedin.com/in/username"
                    required
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                  {linkedinError && (
                    <p className="mt-1 text-sm text-red-500">{linkedinError}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="yearOfPassing" className="block text-gray-700 text-sm font-medium mb-1">
                    Year of Passing <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="yearOfPassing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    required
                    value={formData.yearOfPassing || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    {[...Array(29).keys()].map(i => (
                      <option key={i + 2000} value={i + 2000}>{i + 2000}</option>
                    ))}
                  </select>
                </div>
      
                
                <button 
                  type="submit" 
                  className="w-full bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors mt-6"
                >
                  Continue
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already a referee? <Link href="/login" className="text-[#118B50]">Login</Link>
                </p>
              </form>
            ) : step === 2 ? (
              <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-200 mb-6 pb-4">
                  <h3 className="text-lg font-medium text-gray-800">Additional Information</h3>
                  <p className="text-sm text-gray-600">These fields are optional but will help us find better matches for you</p>

                </div>
                
                <div className="mb-4">
                  <label htmlFor="githubUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    id="githubUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://github.com/username"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="leetcodeUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    LeetCode URL
                  </label>
                  <input
                    type="text"
                    id="leetcodeUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://leetcode.com/username"
                    value={formData.leetcodeUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="codeforcesUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    Codeforces URL
                  </label>
                  <input
                    type="text"
                    id="codeforcesUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://codeforces.com/profile/username"
                    value={formData.codeforcesUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="codechefUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    CodeChef URL
                  </label>
                  <input
                    type="text"
                    id="codechefUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://codechef.com/users/username"
                    value={formData.codechefUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="portfolioUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="text"
                    id="portfolioUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button" 
                    className="flex items-center justify-center w-12 h-10 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    type="submit" 
                    className="w-1/2 bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            ) : (
              <OtpVerification 
                email={formData.email}
                onVerify={handleOtpVerification}
                onBack={handleBackFromOtp}
                isSubmitting={isSubmitting}
              />
            )}
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

export default RefereeSignupPage;
