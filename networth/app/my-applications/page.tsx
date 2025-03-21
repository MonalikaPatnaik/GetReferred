"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ApplicationPopup from "../components/Application";

const MyApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Track userId
  const [isPopupVisible, setIsPopupVisible] = useState(false);

//   useEffect(() => {
//     // Listen for auth state changes
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });
//     return () => unsubscribe(); // Cleanup on unmount
//   }, []);

//   useEffect(() => {
//     if (!userId) return; // Wait until userId is available

//     const fetchApplications = async () => {
//       try {
//         const applicationsRef = collection(firestore, `users/${userId}/applications`);
//         const querySnapshot = await getDocs(applicationsRef);

//         const appsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setApplications(appsData);
//       } catch (error) {
//         console.error("Error fetching applications: ", error);
//       }
//     };

//     fetchApplications();
//   }, [userId]); // Re-run when userId changes

  const handleApplyClick = () => {
    setIsPopupVisible(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
            My Applications
          </h1>
          <br />

          <div className="grid grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
              <ul>
                <li className="mb-4 text-teal-600 font-semibold">
                  Referrer&apos;s Profile
                </li>
                <li className="mb-4 text-teal-600">John Doe</li>
                <li className="mb-4 text-gray-700">Software Engineer</li>
                <li className="mb-4 text-gray-700">Google</li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2
                className="text-xl text-red-600 mb-4 text-center cursor-pointer"
                onClick={handleApplyClick}
              >
                Click <span className="text-blue-600 hover:underline">here</span> to apply
              </h2>
              {isPopupVisible && (
                <ApplicationPopup onClose={() => setIsPopupVisible(false)} />
              )}

              {/* Display Applications */}
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app.id} className="p-4 mb-4 border rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">{app.companyName}</h2>
                    <p><strong>Job Link:</strong> {app.jobLink}</p>
                    <p><strong>Resume Link:</strong> {app.resumeLink}</p>
                    <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                    <p><strong>Import from Profile:</strong> {app.importFromProfile ? "Yes" : "No"}</p>
                    <p><strong>Submitted On:</strong> {app.createdAt?.toDate().toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No applications submitted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyApplications;
