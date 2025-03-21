"use client";
import { useState } from 'react';

interface OtpVerificationProps {
  email: string;
  onVerify: (otpValue: string) => void;
  isSubmitting?: boolean;
}

const OtpVerification = ({ email, onVerify, isSubmitting = false }: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  const handleOtpChange = (position: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[position] = value;
    setOtp(newOtp);

    // If a digit was entered and there's a next input, focus it
    if (value && position < 5) {
      const nextInput = document.getElementById(`otp-${position + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (position: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed and current input is empty, focus previous input
    if (e.key === 'Backspace' && !otp[position] && position > 0) {
      const prevInput = document.getElementById(`otp-${position - 1}`);
      if (prevInput) prevInput.focus();
    }
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
      <div className="border-b border-gray-200 mb-6 pb-4">
        <h3 className="text-lg font-medium text-gray-800">OTP Verification</h3>
        <p className="text-sm text-gray-600">We&apos;ve sent a 6-digit code to {email}</p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="otp-input-group" className="block text-gray-700 text-sm font-medium mb-3">
          Enter Verification Code
        </label>
        <div id="otp-input-group" className="flex justify-between gap-2">
          {[0, 1, 2, 3, 4, 5].map((position) => (
            <input
              key={position}
              id={`otp-${position}`}
              type="text"
              maxLength={1}
              value={otp[position]}
              onChange={(e) => handleOtpChange(position, e.target.value)}
              onKeyDown={(e) => handleKeyDown(position, e)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:border-[#118B50] focus:ring-1 focus:ring-[#118B50] outline-none text-lg"
              disabled={isSubmitting}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          type="submit" 
          className="w-full bg-[#118B50] text-white py-2 px-4 rounded-md hover:bg-[#0f753a] transition-colors flex justify-center items-center"
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
