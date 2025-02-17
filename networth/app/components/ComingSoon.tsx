import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

// Company logo data
const companyData = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" },
  { name: "Amazon", logo: "https://i.pinimg.com/736x/e4/7b/25/e47b2595458dbb68a40ae461a82d54b1.jpg" },
  { name: "Microsoft", logo: "https://pngimg.com/uploads/microsoft/microsoft_PNG4.png" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1280px-Salesforce.com_logo.svg.png" },
  { name: "Atlassian", logo: "https://assets.themuse.com/uploaded/companies/741/small_logo.png?v=7f5c1ad7a79da7f23abbb7b3967b320e1fe8f93c2843ce272b4d602e51474423" },
];

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleEmailSubmit = async (email: string) => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }
    try {
      const emailDocRef = doc(firestore, "emails", "emailsList");
      const emailDocSnap = await getDoc(emailDocRef);
      if (emailDocSnap.exists() && emailDocSnap.data().emails.includes(email)) {
        setMessage("This email is already subscribed!");
        return;
      }
      emailDocSnap.exists()
        ? await updateDoc(emailDocRef, { emails: arrayUnion(email) })
        : await setDoc(emailDocRef, { emails: [email] });
      setMessage("You've been successfully subscribed!");
      setEmail("");
    } catch (e) {
      console.error("Error adding email: ", e);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const calculateTimeLeft = () => {
    const launchDate = new Date("2025-02-28T23:59:59");
    const now = new Date().getTime();
    const difference = launchDate.getTime() - now;
    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleResize = () => {
        if (window.innerWidth < 500) {
          carousel.classList.add('carousel');
        } else {
          carousel.classList.remove('carousel');
        }
      };

      // Initial check
      handleResize();

      // Add event listener for resize
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
  <div className="min-h-screen flex flex-col justify-center items-center font-sans px-6 text-center pt-20 bg-[#121212]">
      <motion.h1 
        className="text-6xl font-bold tracking-wide" 
        style={{ color: '#9FE358' }} 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}>
        Referrly
      </motion.h1>
      <p className="text-[#EAEAEA] text-lg max-w-lg mt-4">No More Cold DMs. No More Referral Spam. Just the Right Connections.</p>
      <div className="flex space-x-8 mt-10">
        {Object.entries(timeLeft).map(([key, value]) => (
          <motion.div key={key} className="text-center" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <div className="text-5xl font-bold" style={{ color: '#9FE358' }}>{value}</div>
            <div className="text-sm uppercase text-[#EAEAEA]/70">{key}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 w-full max-w-lg">
        <p className="text-md text-[#EAEAEA] mb-4">Be the first to know when we launch:</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 justify-center items-center w-full">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 border border-[#303030] rounded-lg bg-[#1A1A1A] text-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-[#9FE358] w-full sm:w-auto max-w-md" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <motion.button 
            onClick={() => handleEmailSubmit(email)} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="relative px-6 py-2 font-medium rounded-lg bg-[#9FE358] text-[#121212] transition-all hover:bg-[#6FBF44] sm:w-auto w-full max-w-md">
            Join waitlist
          </motion.button>
        </div>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className={`mt-4 text-sm ${
              message.includes("successfully") ? "text-[#9FE358]" : "text-red-400"
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>
      {/* Company Logos Section */}
      <div className="w-full overflow-hidden mt-20">
        <div className="border-t border-[#303030] mb-4"></div>
        <div ref={carouselRef} className="max-w-4xl mx-auto flex items-center justify-between px-4 space-x-12">
          {companyData.slice(0, 5).map((company, index) => (
            <div 
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="border-b border-[#303030] mt-4"></div>
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        .carousel {
          display: flex;
          animation: carousel 10s linear infinite;
          width: calc(100% * ${companyData.length}); /* Adjust based on the number of logos */
        }

        .carousel > div {
          flex: 0 0 auto; /* Prevent shrinking */
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
