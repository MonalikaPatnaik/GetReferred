"use client";
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OtpVerificationProps {
  email: string;
  onVerify: (otpValue: string) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const OtpVerification = ({ email, onVerify, onBack, isSubmitting = false }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleResendOtp = () => {
    // Reset OTP fields
    setOtp(['', '', '', '', '', '']);
    
    // Focus on first input
    const firstInput = document.getElementById('otp-0');
    if (firstInput) {
      firstInput.focus();
    }
    
    // Disable resend button and start countdown
    setResendDisabled(true);
    setCountdown(30);
    
    // In a real app, you would call your API to resend OTP
    console.log('Resending OTP to:', email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    
    // Check if OTP is complete
    if (otpValue.length !== 6) {
      alert('Please enter the complete 6-digit OTP');
      return;
    }
    
    // Call the parent component's verification handler
    onVerify(otpValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b border-gray-200 mb-6 pb-4">
        <h3 className="text-lg font-medium text-gray-800">Verify Your Email</h3>
        <p className="text-sm text-gray-600">We&apos;ve sent a 6-digit code to {email}</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Enter Verification Code
        </label>
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50] focus:border-transparent"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {resendDisabled ? (
            <span>Resend code in {countdown}s</span>
          ) : (
            <button 
              type="button" 
              className="text-[#118B50] hover:underline"
              onClick={handleResendOtp}
            >
              Resend code
            </button>
          )}
        </p>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button 
          type="button" 
          className="flex items-center justify-center w-12 h-10 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          type="submit" 
          className="flex-1 bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors flex justify-center items-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          Verify
        </button>
      </div>
    </form>
  );
};

export default OtpVerification;
