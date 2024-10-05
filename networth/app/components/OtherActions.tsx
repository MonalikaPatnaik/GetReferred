import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Link from 'next/link';

const OtherActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="my-4 mx-24 border rounded-md shadow-md p-6 bg-white">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
        <h2 className="text-lg font-semibold">Other Actions</h2>
        {isOpen ? (
          <FiChevronUp className="text-teal-600" />
        ) : (
          <FiChevronDown className="text-teal-600" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4">
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <Link href="/submit-testimonial" className="text-teal-600 hover:text-teal-800">
                Submit a Testimonial
              </Link>
              <p className="text-gray-600">
                Share your journey with us and inspire others. Your story can help shape our community!
              </p>
            </li>
            <li className="border-b pb-4">
              <Link href="/report-suspicious-activity" className="text-teal-600 hover:text-teal-800">
                Report a Suspicious Activity
              </Link>
              <p className="text-gray-600">
                Whether it's a bug or malicious user activity, please let us know so we can investigate and take action.
              </p>
            </li>
            <li className="pb-4">
              <Link href="/delete-account" className="text-teal-600 hover:text-teal-800">
                Delete Account
              </Link>
              <p className="text-gray-600">
                We are sorry to see you go. If you really want to delete your account, please consider providing feedback on your experience.
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OtherActions;
