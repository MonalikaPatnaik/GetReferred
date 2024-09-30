"use client"; // Make sure it's a Client Component

import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-teal-600 mb-6">
          Referrer's Dashboard
        </h1>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
            <ul>
              <li className="mb-4 text-teal-600 font-semibold">Dashboard</li>
              <li className="mb-4 text-gray-700">Wallet</li>
              <li className="mb-4 text-gray-700">Transactions</li>
              <li className="mb-4 text-gray-700">Analytics</li>
              <li className="mb-4 text-gray-700">Reporting</li>
              <li className="mb-4 text-gray-700">Settings</li>
            </ul>
          </div>

          {/* Referred Users */}
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-teal-600 mb-4">
              Referred Users
            </h2>

            {/* Applications List */}
            {applications.map((application) => (
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
                  {application.status === "Pending" && (
                    <>
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
                    </>
                  )}
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-lg ${
                      application.status === "Referred"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {application.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
