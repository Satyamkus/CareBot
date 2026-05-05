// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const DoctorDashboard = () => {
// //   const [appointments, setAppointments] = useState([]);
// //   const token = localStorage.getItem("doctorToken");

// //   const backendUrl = "http://localhost:4000";

// //   const fetchAppointments = async () => {
// //     const res = await axios.get(`${backendUrl}/api/appointments/doctor`, {
// //       headers: { token },
// //     });

// //     if (res.data.success) {
// //       setAppointments(res.data.appointments);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAppointments();
// //   }, []);

// //   const acceptAppointment = async (id) => {
// //     await axios.post(
// //       `${backendUrl}/api/appointments/doctor/accept/${id}`,
// //       {},
// //       { headers: { token } }
// //     );
// //     fetchAppointments();
// //   };

// //   const cancelAppointment = async (id) => {
// //     await axios.post(
// //       `${backendUrl}/api/appointments/doctor/cancel/${id}`,
// //       {},
// //       { headers: { token } }
// //     );
// //     fetchAppointments();
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-xl font-semibold mb-4">Doctor Appointments</h2>

// //       {appointments.map((item) => (
// //         <div key={item._id} className="border rounded p-4 mb-4">

// //           <p><b>User:</b> {item.userName}</p>
// //           <p><b>Email:</b> {item.userEmail}</p>
// //           <p><b>Phone:</b> {item.userPhone}</p>
// //           <p><b>Address:</b> {item.userAddress}</p>

// //           <p><b>Date:</b> {item.slotDate}</p>
// //           <p><b>Time:</b> {item.slotTime}</p>

// //           <p><b>Status:</b> {item.status}</p>

// //           {item.status === "pending" && (
// //             <div className="flex gap-3 mt-3">
// //               <button
// //                 onClick={() => acceptAppointment(item._id)}
// //                 className="bg-green-600 text-white px-4 py-2 rounded"
// //               >
// //                 Accept
// //               </button>

// //               <button
// //                 onClick={() => cancelAppointment(item._id)}
// //                 className="bg-red-600 text-white px-4 py-2 rounded"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default DoctorDashboard;


// import React from "react";
// import DoctorAppointments from "../components/DoctorAppointment";
// import DoctorProfile from "../components/DoctorProfile";

// const DoctorDashboard = () => {
//   return (
//     <div className="p-6">
//       <p className="text-2xl font-semibold mb-6">Doctor Dashboard</p>

//       <DoctorProfile />
//       <DoctorAppointments />
//     </div>
//   );
// };

// export default DoctorDashboard;


import React, { useState } from "react";
import { assets } from "../assets/assets";
import DoctorAppointments from "../components/DoctorAppointment";
import DoctorProfile from "../components/DoctorProfile";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderSection = () => {
    if (activeTab === "profile") {
      return <DoctorProfile />;
    }

    if (activeTab === "appointments") {
      return <DoctorAppointments />;
    }

    return (
      <div className="mt-12">
        {/* Banner */}
        <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 overflow-hidden">
          {/* Left */}
          <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-20">
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold text-white leading-tight">
              <p>Welcome back, Doctor.</p>
              <p className="mt-3">Your care makes a difference every day.</p>
            </div>

            <p className="text-blue-100 mt-5 max-w-xl text-sm sm:text-base leading-6">
              Review upcoming appointments, update your profile, and manage your
              availability — all from one place.
            </p>
          </div>

          {/* Right */}
          <div className="hidden md:block md:w-1/2 lg:w-[360px] relative">
            <img
              className="w-full absolute bottom-0 right-0 max-w-md"
              src={assets.appointment_img}
              alt=""
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all">
            <p className="text-lg font-semibold text-gray-800">
              Manage Profile
            </p>
            <p className="text-sm text-gray-600 mt-2 leading-6">
              Keep your professional details, fees, speciality and availability
              updated for patients.
            </p>
            <button
              onClick={() => setActiveTab("profile")}
              className="mt-4 text-sm text-primary font-medium"
            >
              Open Profile →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all">
            <p className="text-lg font-semibold text-gray-800">
              Today's Appointments
            </p>
            <p className="text-sm text-gray-600 mt-2 leading-6">
              View all appointment requests, accept bookings, or decline when
              needed.
            </p>
            <button
              onClick={() => setActiveTab("appointments")}
              className="mt-4 text-sm text-primary font-medium"
            >
              View Appointments →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all">
            <p className="text-lg font-semibold text-gray-800">
              Better Patient Care
            </p>
            <p className="text-sm text-gray-600 mt-2 leading-6">
              Quick response to bookings helps patients trust your care and keeps
              your schedule organized.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-4 sm:mx-[6%] min-h-screen">
      {/* Top Navbar */}
      <div className="flex items-center justify-between py-5 border-b">
        <div className="flex items-center gap-3">
          <img src={assets.logo} className="w-36" alt="" />
          <span className="text-xs border px-2.5 py-0.5 rounded-full text-gray-500">
            Doctor Panel
          </span>
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <button
            onClick={() => setActiveTab("home")}
            className={`hover:text-primary ${
              activeTab === "home" ? "text-primary" : ""
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`hover:text-primary ${
              activeTab === "profile" ? "text-primary" : ""
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`hover:text-primary ${
              activeTab === "appointments" ? "text-primary" : ""
            }`}
          >
            Appointments
          </button>
        </div>
      </div>

      {/* Main Content */}
      {renderSection()}

      {/* Footer */}
      <div className="mt-24 border-t pt-8 pb-6">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr] gap-10 text-sm">
          <div>
            <img className="mb-4 w-36" src={assets.logo} alt="" />
            <p className="text-gray-600 leading-6 max-w-lg">
              CareBot helps doctors manage appointments efficiently while giving
              patients a smoother healthcare experience.
            </p>
          </div>

          <div>
            <p className="text-lg font-medium mb-4">Doctor Access</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>Dashboard</li>
              <li>Profile</li>
              <li>Appointments</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-8">
          © 2026 CareBot. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DoctorDashboard;