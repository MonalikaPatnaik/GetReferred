"use client";
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { doc, getDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";

// Define the UserInfo interface
interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  graduationYear: string;
  gender: string;
}

const ProfileComponent: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    gender: "",
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Start collapsed

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserInfo;
          setUserInfo({
            name: userData.name || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            graduationYear: userData.graduationYear || "",
            gender: userData.gender || "",
          });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-6 mx-24">
      <div className="flex justify-between items-center mb-4"> {/* Adjusted spacing */}
        <h2 className="text-lg font-semibold">User Information</h2>
        <button onClick={() => setIsCollapsed((prev) => !prev)} className="text-teal-600">
          {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
        </button>
      </div>
      <div className={`${isCollapsed ? "h-0 overflow-hidden" : "flex flex-col"}`}> {/* Use height for collapsing */}
        {Object.entries(userInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center mb-4">
            <span className="font-medium">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</span>
            <span className="flex-1 mx-2">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComponent;
