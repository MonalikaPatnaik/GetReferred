"use client";
import { useRouter } from 'next/navigation';

interface ReferralCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  titleColor?: string;
  route?: string;
}

const ReferralCard = ({
  title,
  description,
  isActive = true,
  titleColor = "#ffff",
  route = "#"
}: ReferralCardProps) => {
  const router = useRouter();
  const bgColor = isActive ? "bg-[#118B50]" : "bg-gray-50";
  const textColor = isActive ? "text-white" : "text-black";
  const descriptionColor = isActive ? "text-gray-100" : "text-gray-700";
  const handleClick = () => {
    if (route !== "#") {
      router.push(route);
    }
  };
  
  return (
    <div 
      className={`${bgColor} border border-gray-200 rounded-lg shadow-sm p-6 mb-6 hover:shadow-md transition-shadow cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
        <div className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <p className={descriptionColor}>{description}</p>
    </div>
  );
};

export default ReferralCard;
