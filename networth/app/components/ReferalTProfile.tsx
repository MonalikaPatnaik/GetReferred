"use client";
import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { firestore, auth } from "../firebase";

interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  graduationYear: string;
  gender: string;
}

const ReferalTProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    gender: "",
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, userInfo, { merge: true });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 my-6 mx-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User Information</h2>
        <button onClick={() => setIsCollapsed((prev) => !prev)} className="text-teal-600">
          {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
        </button>
      </div>
      <div className={`${isCollapsed ? "h-0 overflow-hidden" : "flex flex-col"}`}>
        {Object.entries(userInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center mb-4">
            <span className="font-medium">{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</span>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 rounded p-1 flex-1 mx-2"
              />
            ) : (
              <span className="flex-1 mx-2">{value}</span>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button onClick={handleSave} className="text-teal-600 mr-2">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-teal-600">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferalTProfile;
