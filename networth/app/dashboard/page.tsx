"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type Application = {
  id: number;
  name: string;
  email: string;
  dateApplied: string;
  status: "Pending" | "Referred" | "Rejected";
};

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "Andrew Benson",
      email: "andrew.benson@mail.com",
      dateApplied: "2024-09-28",
      status: "Pending",
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma.davis@mail.com",
      dateApplied: "2024-09-27",
      status: "Pending",
    },
    {
      id: 3,
      name: "Olivia Cox",
      email: "olivia.cox@mail.com",
      dateApplied: "2024-09-26",
      status: "Pending",
    },
  ]);

  const handleReferral = (id: number) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Referred" } : app))
    );
  };

  const handleReject = (id: number) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))
    );
  };

  const pendingApplications = applications.filter(
    (app) => app.status === "Pending"
  );
  const referredApplications = applications.filter(
    (app) => app.status === "Referred"
  );
  const rejectedApplications = applications.filter(
    (app) => app.status === "Rejected"
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-teal-600 mb-6">
            Referrer&apos;s Dashboard
          </h1>
          <h3>Software Engineer, Google</h3>
          <br></br>

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
                {/* <li className="mb-4 text-gray-700">Reporting</li>
              <li className="mb-4 text-gray-700">Settings</li> */}
              </ul>
            </div>

            {/* Main Content */}
            <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-teal-600 mb-4">
                Pending Applications
              </h2>

              {/* Pending Applications */}
              {pendingApplications.length > 0 ? (
                pendingApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex justify-between items-center border-b pb-4 mb-4"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {application.name}
                      </p>
                      <p className="text-gray-600">{application.email}</p>
                      <p className="text-gray-400">{application.dateApplied}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                        onClick={() => handleReferral(application.id)}
                      >
                        Give Referral
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleReject(application.id)}
                      >
                        Reject App
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No pending applications.</p>
              )}

              {/* Referred Applications */}
              <h2 className="text-xl font-bold text-green-600 mt-8 mb-4">
                Referred Applications
              </h2>
              {referredApplications.length > 0 ? (
                referredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex justify-between items-center border-b pb-4 mb-4"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {application.name}
                      </p>
                      <p className="text-gray-600">{application.email}</p>
                      <p className="text-gray-400">{application.dateApplied}</p>
                    </div>
                    <div className="text-sm font-semibold px-3 py-1 rounded-lg bg-green-100 text-green-700">
                      {application.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No referred applications.</p>
              )}

              {/* Rejected Applications */}
              <h2 className="text-xl font-bold text-red-600 mt-8 mb-4">
                Rejected Applications
              </h2>
              {rejectedApplications.length > 0 ? (
                rejectedApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex justify-between items-center border-b pb-4 mb-4"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {application.name}
                      </p>
                      <p className="text-gray-600">{application.email}</p>
                      <p className="text-gray-400">{application.dateApplied}</p>
                    </div>
                    <div className="text-sm font-semibold px-3 py-1 rounded-lg bg-red-100 text-red-700">
                      {application.status}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No rejected applications.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
