"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';
import { Link, ArrowLeft } from 'lucide-react';

const ReferrerSignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState('');
  const [linkedinError, setLinkedinError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    phone: '',
    company: '',
    position: '',
    experience: '',
    personalEmail: '',
    twitterUrl: '',
    portfolioUrl: '',
    role: '',
    referralHistory: '',
    interests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    
    // LinkedIn validation
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    if (!linkedinRegex.test(formData.linkedin)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
      isValid = false;
    }
    
    if (isValid) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // Redirect to OTP verification page with email and user type
      router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}&userType=referrer`);
    }
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
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Join as a Referrer</h2>
          <p className="text-lg text-gray-600 mb-8">Help connect talented individuals with great opportunities.</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {step === 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                    Company Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent`}
                    // placeholder="Enter your email address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-500">{emailError}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  >
                    <option value="">Select company</option>
                    <option value="Adobe">Adobe</option>
                    <option value="Amazon">Amazon</option>
                    <option value="American Express">American Express</option>
                    <option value="Apple">Apple</option>
                    <option value="Atlassian">Atlassian</option>
                    <option value="Citi Bank">Citi Bank</option>
                    <option value="Goldman Sachs">Goldman Sachs</option>
                    <option value="Google">Google</option>
                    <option value="JP Morgan">JP Morgan</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Service Now">Service Now</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                  </select>
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
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700 text-sm font-medium mb-1">
                    Current Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    // placeholder="Enter your phone number"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="experience" className="block text-gray-700 text-sm font-medium mb-1">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="experience"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    // placeholder="Enter your phone number"
                    required
                    value={formData.experience}
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
                
                
                
                <button 
                  type="submit" 
                  className="w-full bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors mt-6"
                >
                  Continue
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                Already a referrer? <Link href="/login" className="text-[#118B50]">Login</Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-200 mb-6 pb-4">
                  <h3 className="text-lg font-medium text-gray-800">Additional Information</h3>
                  <p className="text-sm text-gray-600">These fields are optional but help us know you better</p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="personalEmail" className="block text-gray-700 text-sm font-medium mb-1">
                    Personal Email
                  </label>
                  <input
                    type="email"
                    id="personalEmail"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="Enter your personal email"
                    value={formData.personalEmail}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="twitterUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    id="twitterUrl"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
                    placeholder="https://twitter.com/username"
                    value={formData.twitterUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="portfolioUrl" className="block text-gray-700 text-sm font-medium mb-1">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
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
                    onClick={() => setStep(1)}
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

export default ReferrerSignupPage;
