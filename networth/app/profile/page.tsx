// "use client";
// import React, { useState, useEffect } from 'react';
// import { FiEdit2, FiSave } from 'react-icons/fi';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
// import { firestore, auth } from "../firebase";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import OtherActions from '../components/OtherActions';
// import ResumeBuilder from '../components/ResumeBuilder';
// import ReferalTProfile from '../components/ReferalTProfile';
// import ReferalGProfile from '../components/ReferalGProfile';

// interface UserInfo {
//   name: string;
//   email: string;
//   phoneNumber: string;
// }

// const ProfilePage = () => {
//   const [userInfo, setUserInfo] = useState<UserInfo>({
//     name: '',
//     email: '',
//     phoneNumber: '',
//   });
  
//   const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
//   const [userRole, setUserRole] = useState<string>(''); // Add state for userRole

//   useEffect(() => {
//     const fetchData = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         // Fetch user details
//         const userDocRef = doc(firestore, 'users', user.uid);
//         const userDocSnap = await getDoc(userDocRef);
//         if (userDocSnap.exists()) {
//           const userData = userDocSnap.data();
//           setUserInfo({
//             name: userData.name || '',
//             email: userData.email || '',
//             phoneNumber: userData.phoneNumber || '',
//           });
//           // Set user role (assuming role is stored in user data)
//           setUserRole(userData.role || ''); // Ensure 'role' exists in Firestore
//         }
//       }
//     };
//     fetchData();
//   }, []);

//   const handleEdit = (field: string) => {
//     setIsEditing(prev => ({ ...prev, [field]: true }));
//   };

//   const handleSave = async (field: string) => {
//     setIsEditing(prev => ({ ...prev, [field]: false }));
//     const user = auth.currentUser;
//     if (user) {
//       const userDocRef = doc(firestore, 'users', user.uid);
//       await updateDoc(userDocRef, { [field]: userInfo[field as keyof UserInfo] });
//     }
//   };

//   const handleChange = (field: string, value: string) => {
//     setUserInfo(prev => ({ ...prev, [field]: value }));
//   };

//   const EditableField: React.FC<{ field: string; value: string }> = ({ field, value }) => (
//     isEditing[field] ? (
//       <div>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => handleChange(field, e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button onClick={() => handleSave(field)} className="mt-2 text-blue-500">
//           <FiSave className="inline mr-1" /> Save
//         </button>
//       </div>
//     ) : (
//       <div className="flex justify-between items-center">
//         <span>{value}</span>
//         <button onClick={() => handleEdit(field)} className="text-gray-500">
//           <FiEdit2 />
//         </button>
//       </div>
//     )
//   );

//   return (
//     <>
//       <Navbar />
//       {userRole === "referee" ? (
//         <ReferalGProfile />
//       ) : (
//         <>
//           <ReferalTProfile />
//           <ResumeBuilder />
//         </>
//       )}
//       <OtherActions />
//       <Footer />
//     </>
//   );
// };

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
//   <div className="mb-6">
//     <div className="flex justify-between items-center mb-2">
//       <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
//     </div>
//     {children}
//   </div>
// );

// export default ProfilePage;
