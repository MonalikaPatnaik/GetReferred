"use client";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { firestore, auth } from "../firebase";
import { FaDownload } from "react-icons/fa"; 

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    graduationYear: string;
    gender: string;
    pastExperience?: string[];
    education?: string[];
    skills?: string[];
}

const ResumeBuilder: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phoneNumber: "",
    graduationYear: "",
    gender: "",
  });
  const [pastExperience, setPastExperience] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  
  const [isExperienceOpen, setExperienceOpen] = useState<boolean>(false);
  const [isEducationOpen, setEducationOpen] = useState<boolean>(false);
  const [isSkillsOpen, setSkillsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserInfo;
          setUserInfo({
            ...userData,
            pastExperience: userData.pastExperience || [],
            education: userData.education || [],
            skills: userData.skills || [],
          });
        }
      }
    };
    fetchData();
  }, []);

  const handleAddExperience = async () => {
    if (pastExperience.trim()) {
      const updatedExperience = [...(userInfo.pastExperience || []), pastExperience];
      await updateUserData({ pastExperience: updatedExperience });
      setPastExperience("");
    }
  };

  const handleAddEducation = async () => {
    if (education.trim()) {
      const updatedEducation = [...(userInfo.education || []), education];
      await updateUserData({ education: updatedEducation });
      setEducation("");
    }
  };

  const handleAddSkills = async () => {
    if (skills.trim()) {
      const updatedSkills = [...(userInfo.skills || []), skills];
      await updateUserData({ skills: updatedSkills });
      setSkills("");
    }
  };

  const updateUserData = async (updates: Partial<UserInfo>) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, updates, { merge: true });
      setUserInfo((prev) => ({ ...prev, ...updates }));
    }
  };

  const toggleExperience = () => setExperienceOpen((prev) => !prev);
  const toggleEducation = () => setEducationOpen((prev) => !prev);
  const toggleSkills = () => setSkillsOpen((prev) => !prev);

  const handleDownload = () => {
    console.log("Download button clicked");
  };

  return (
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-6 mx-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resume Builder</h2>
        <button onClick={handleDownload} className="text-teal-600 hover:text-teal-800">
          <FaDownload className="text-xl" />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-medium cursor-pointer" onClick={toggleSkills}>
          Skills {isSkillsOpen ? '−' : '+'}
        </h3>
        {isSkillsOpen && (
          <div>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Add skills"
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <button onClick={handleAddSkills} className="text-teal-600">
              Add Skills
            </button>
            {userInfo.skills && userInfo.skills.length > 0 && (
              <div>
                <h4 className="font-semibold">Current Skills:</h4>
                <ul>
                  {userInfo.skills.map((skill, index) => (
                    <li key={index} className="ml-4">{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-medium cursor-pointer" onClick={toggleExperience}>
          Past Experience {isExperienceOpen ? '−' : '+'}
        </h3>
        {isExperienceOpen && (
          <div>
            <input
              type="text"
              value={pastExperience}
              onChange={(e) => setPastExperience(e.target.value)}
              placeholder="Add past experience"
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <button onClick={handleAddExperience} className="text-teal-600">
              Add Experience
            </button>
            {userInfo.pastExperience && userInfo.pastExperience.length > 0 && (
              <div>
                <h4 className="font-semibold">Current Past Experience:</h4>
                <ul>
                  {userInfo.pastExperience.map((experience, index) => (
                    <li key={index} className="ml-4">{experience}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-medium cursor-pointer" onClick={toggleEducation}>
          Education {isEducationOpen ? '−' : '+'}
        </h3>
        {isEducationOpen && (
          <div>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Add education"
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <button onClick={handleAddEducation} className="text-teal-600">
              Add Education
            </button>
            {userInfo.education && userInfo.education.length > 0 && (
              <div>
                <h4 className="font-semibold">Current Education:</h4>
                <ul>
                  {userInfo.education.map((edu, index) => (
                    <li key={index} className="ml-4">{edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
