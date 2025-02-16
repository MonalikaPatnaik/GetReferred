import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    title: "For Job Seekers",
    color: "text-[#9FE358]",
    steps: [
      {
        step: "Step 1: Tell Us Your Dream Company",
        description:
          "No more cold DMs or priority DMs. Share where you want to work, and we'll connect you to the right referrers.",
      },
      {
        step: "Step 2: Get Matched to a Referrer",
        description:
          "We match you with verified professionals at your target company.",
      },
      {
        step: "Step 3: Secure Your Referral",
        description:
          "Skip the application black hole - get a referral from someone who believes in your skills.",
      },
    ],
  },
  {
    title: "For Referrers",
    color: "text-[#9FE358]",
    steps: [
      {
        step: "Step 1: Discover Top Talent Easier",
        description:
          "Skip the LinkedIn inbox clutter. Browse and find job seekers who are actually aligned with your company's needs.",
      },
      {
        step: "Step 2: Refer the Right Candidates",
        description:
          "Don't waste your referrals - connect top talent with real opportunities.",
      },
      {
        step: "Step 3: Power the Next Great Hire",
        description:
          "Your referrals can help top talent land where they belong.",
      },
    ],
  },
];

const ReferralSteps = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-[#EAEAEA] font-sans px-8 md:px-16 text-center pt-20 pb-16 bg-[#121212]">
      <div className="flex flex-col justify-center items-center font-sans px-6 py-12 text-center">
        <motion.h1
          className="text-5xl font-bold tracking-wide gradient-text pb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Making referrals actually work for you
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[90vw] md:max-w-6xl w-full">
        {steps.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-[#1A1A1A] bg-opacity-80 px-5 py-10 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-lg md:max-w-2xl mx-auto"
          >
            <h2 className={`text-3xl font-bold mb-8 ${section.color}`}>
              {section.title}
            </h2>
            <div className="w-full space-y-4">
              {section.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="relative">
                  <div className="p-4 gradient-animation rounded-xl">
                    <p className="font-semibold text-xl">{step.step}</p>
                    <p className="text-[#EAEAEA] text-base mt-1 mb-3">
                      {step.description}
                    </p>
                  </div>
                  {stepIndex !== section.steps.length - 1 && (
                    <div className="flex justify-center mt-1">
                      <ArrowDown
                        className="text-[#9FE358] animate-bounce"
                        size={32}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReferralSteps;
