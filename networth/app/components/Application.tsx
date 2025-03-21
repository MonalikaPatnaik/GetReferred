// import { useState } from "react";
// import {collection, doc, setDoc, addDoc } from 'firebase/firestore';
// import { auth, firestore } from "../firebase";

// interface ApplicationPopupProps {
//   onClose: () => void;
// }

// const ApplicationPopup: React.FC<ApplicationPopupProps> = ({ onClose }) => {
//   const [resumeLink, setResumeLink] = useState("");
//   const [jobLink, setJobLink] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [importFromProfile, setImportFromProfile] = useState(false);

//   const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const user = auth.currentUser;
//     if (!user) {
//       console.warn("User is not logged in.");
//       return;
//     }
    
//     const userId = user.uid;
//     const userRef = doc(firestore, `users/${userId}`);
//   const applicationsRef = collection(userRef, 'applications'); // Subcollection 'applications' under each user

//   try {
//     await addDoc(applicationsRef, {
//       resumeLink,
//       jobLink,
//       companyName,
//       coverLetter,
//       importFromProfile,
//       createdAt: new Date(),
//     });
//     console.log("Application submitted successfully!");
//     onClose()
//   } catch (error) {
//     console.error("Error submitting application: ", error);
//   }

//   };

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center z-50">

//         <div
//           className="fixed inset-0 bg-black opacity-50"
//           onClick={onClose}
//         ></div>

//         {/* Popup Modal */}
//         <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-50">
//           <div className="flex justify-between items-center border-b pb-4 mb-4">
//             <h2 className="text-xl font-bold">Submit Your Application</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               X
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">
//                 Google Drive Link for Resume
//               </label>
//               <input
//                 type="text"
//                 value={resumeLink}
//                 onChange={(e) => setResumeLink(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                 placeholder="Paste your Google Drive resume link here"
//                 required
//               />
//               <div className="mt-2">
//                 <input
//                   type="checkbox"
//                   id="importFromProfile"
//                   checked={importFromProfile}
//                   onChange={(e) => setImportFromProfile(e.target.checked)}
//                 />
//                 <label htmlFor="importFromProfile" className="ml-2 text-sm">
//                   Do you like to import the link from your profile?
//                 </label>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">
//                 Job Link
//               </label>
//               <input
//                 type="text"
//                 value={jobLink}
//                 onChange={(e) => setJobLink(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                 placeholder="Paste the job link here"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                 placeholder="Enter the company name"
//                 required
//               />
//             </div>

//             {/* Cover Letter */}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">
//                 Short Cover Letter
//               </label>
//               <textarea
//                 value={coverLetter}
//                 onChange={(e) => setCoverLetter(e.target.value)}
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                 rows={4}
//                 placeholder="Mention in detail what relevant skill or past experience you have for this internship. What excites you about this internship? Why would you be a good fit?"
//                 required
//               ></textarea>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
//               >
//                 Submit Application
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ApplicationPopup;
