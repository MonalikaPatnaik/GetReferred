"use client";
import Navbar from '../components/Navbar';
import ImageComponent from '../components/ImageComponent';
import ReferralCard from '../components/ReferralCard';

const OnboardingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">The easiest way to get and give referrals</h2>
                    
                    <p className="text-lg text-gray-600 mb-8">Referrlyy streamlines the referral process, connecting talented individuals with the right opportunities seamlessly.</p>
                    
                    <ReferralCard 
                        title="Referee" 
                        description="Need a referral? Get the right one, fast!" 
                        isActive={true}
                        route="/referee-signup"
                    />
                    
                    <ReferralCard 
                        title="Referrers" 
                        description="Refer the top talent without the hassle" 
                        isActive={false}
                        route="/referrer-signup"
                    />
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

export default OnboardingPage;