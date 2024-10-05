"use client";
import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiEdit2, FiTrash2, FiDownload, FiSave } from 'react-icons/fi';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from "../firebase";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OtherActions from '../components/OtherActions';
import ProfileDetails from '../components/Details';

interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  interface ResumeData {
    careerObjective: string;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    workExperience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
  }
const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [resumeData, setResumeData] = useState<ResumeData>({
    careerObjective: '',
    education: [],
    workExperience: []
  });
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {

        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserInfo({
              name: userData.name || '',
              email: userData.email || '',
              phoneNumber: userData.phoneNumber || '',
            });
          }
  

        const resumeDocRef = doc(firestore, 'resumes', user.uid);
        const resumeDocSnap = await getDoc(resumeDocRef);
        if (resumeDocSnap.exists()) {
            const resumeData = resumeDocSnap.data() as ResumeData;
            setResumeData({
                careerObjective: resumeData.careerObjective || '',
                education: resumeData.education || [],
                workExperience: resumeData.workExperience || [],
              });
          } else {

            const emptyResume: ResumeData = {
              careerObjective: '',
              education: [],
              workExperience: []
            };
            await setDoc(resumeDocRef, emptyResume);
            setResumeData(emptyResume);
          }
        }
      };
    fetchData();
  }, []);

  const handleEdit = (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = async (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
    const user = auth.currentUser;
    if (user) {
      if (['name', 'email', 'phoneNumber'].includes(field)) {
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, { [field]: userInfo[field as keyof UserInfo] });
      } else {
        const resumeDocRef = doc(firestore, 'resumes', user.uid);
        await updateDoc(resumeDocRef, { [field]: resumeData[field as keyof ResumeData] });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    if (['name', 'email', 'phoneNumber'].includes(field)) {
      setUserInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setResumeData(prev => ({ ...prev, [field]: value }));
    }
  };

  const EditableField: React.FC<{ field: string; value: string; multiline?: boolean }> = ({ field, value, multiline = false }) => (
    isEditing[field] ? (
      <div>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full p-2 border rounded"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}
        <button onClick={() => handleSave(field)} className="mt-2 text-blue-500">
          <FiSave className="inline mr-1" /> Save
        </button>
      </div>
    ) : (
      <div className="flex justify-between items-center">
        <span>{value}</span>
        <button onClick={() => handleEdit(field)} className="text-gray-500">
          <FiEdit2 />
        </button>
      </div>
    )
  );

  return ( 
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Profile</h1> 
      <div className="bg-gray-100 p-4 rounded-lg mb-8 text-center">
        <p> Click on the pencil icon to make edits. Do remember to save the changes too.</p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <EditableField field="name" value={userInfo.name} />
            <EditableField field="email" value={userInfo.email} />
            <EditableField field="phoneNumber" value={userInfo.phoneNumber} />
          </div>
          <button className="text-blue-500 flex items-center">
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>
        
        <Section title="CAREER OBJECTIVE">
          <EditableField field="careerObjective" value={resumeData.careerObjective} multiline />
        </Section>
        
        <Section title="EDUCATION">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <EditableField field={`education[${index}].degree`} value={edu.degree} />
              <EditableField field={`education[${index}].institution`} value={edu.institution} />
              <EditableField field={`education[${index}].year`} value={edu.year} />
            </div>
          ))}
          <button className="text-blue-500 mt-2">+ Add education</button>
        </Section>
        
        <Section title="WORK EXPERIENCE">
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <EditableField field={`workExperience[${index}].title`} value={exp.title} />
              <EditableField field={`workExperience[${index}].company`} value={exp.company} />
              <EditableField field={`workExperience[${index}].duration`} value={exp.duration} />
              <EditableField field={`workExperience[${index}].description`} value={exp.description} multiline />
            </div>
          ))}
          <button className="text-blue-500 mt-2">+ Add work experience</button>
        </Section>
      </div>
    </div>
    
    <ProfileDetails />
    <OtherActions />
    <Footer />
    </>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      </div>
      {children}
    </div>
  );

export default ProfilePage;