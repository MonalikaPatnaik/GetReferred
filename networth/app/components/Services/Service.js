import React from 'react';
import { Users, Award, ArrowRight } from 'lucide-react';

const Service = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h4 className="text-orange-500 font-bold uppercase mb-2">The worlds #1 referral platform</h4>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">See our numbers in action</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
          {/* Service 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="text-green-500 text-4xl" />
              <h3 className="text-lg font-semibold ml-3">Connecti</h3>
            </div>
            <p className="text-gray-600">
            Build your professional network and find new opportunities.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Award className="text-blue-500 text-4xl" />
              <h3 className="text-lg font-semibold ml-3">Get referred</h3>
            </div>
            <p className="text-gray-600">
            Increase your chances of landing your dream job with a personal referral.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ArrowRight className="text-purple-500 text-4xl" />
              <h3 className="text-lg font-semibold ml-3">Earn Rewards</h3>
            </div>
            <p className="text-gray-600">
            Referrers can earn bonuses and build their professional network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
