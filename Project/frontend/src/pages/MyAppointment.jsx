// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const MyAppointment = () => {

//   const { doctors } = useContext(AppContext);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My Appointment
//       </p>

//       <div>
//         {doctors.slice(0, 2).map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 border-b"
//           >
            
//             {/* Doctor Image */}
//             <div>
//               <img
//                 className="w-32 bg-indigo-50 rounded"
//                 src={item.image}
//                 alt={item.name}
//               />
//             </div>

//             {/* Doctor Details */}
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">{item.name}</p>
//               <p>{item.speciality}</p>

//               <p className="text-zinc-700 font-medium mt-2">Address</p>
//               <p className="text-xs">{item.address.line1}</p>
//               <p className="text-xs">{item.address.line2}</p>

//               <p className="text-xs mt-2">
//                 <span className="text-sm text-neutral-700 font-medium">
//                   Date & Time:
//                 </span>{" "}
//                 9 March, 2026 | 9:00 AM
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col gap-2 justify-center">
//               <button className="text-sm border border-indigo-500 px-4 py-2 rounded text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all">
//                 Pay Online
//               </button>

//               <button className="text-sm border border-red-400 px-4 py-2 rounded text-red-400 hover:bg-red-500 hover:text-white transition-all">
//                 Cancel Appointment
//               </button>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;

// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// const MyAppointment = () => {
//   const { getAppointments, cancelAppointment } = useContext(AuthContext);
//   const [appointments, setAppointments] = useState([]);

//   const fetchAppointments = async () => {
//     const data = await getAppointments();
//     if (data) setAppointments(data);
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleCancel = async (id) => {
//     const ok = await cancelAppointment(id);

//     if (ok) {
//       alert("Appointment Cancelled");
//       fetchAppointments();
//     }
//   };

//   if (!appointments.length) {
//     return <p className="text-center mt-10">No Appointments Found</p>;
//   }

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My Appointments
//       </p>

//       <div>
//         {appointments.map((item) => {
//           const doctor = item.doctorId;

//           return (
//             <div
//               key={item._id}
//               className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 border-b"
//             >
//               {/* Doctor Image */}
//               <div>
//                 <img
//                   className="w-32 h-32 object-cover bg-indigo-50 rounded"
//                   src={doctor?.image}
//                   alt={doctor?.name}
//                 />
//               </div>

//               {/* Doctor Details */}
//               <div className="flex-1 text-sm text-zinc-600">
//                 <p className="text-lg text-neutral-800 font-semibold">
//                   {doctor?.name || item.doctorName}
//                 </p>

//                 <p className="mt-1">
//                   <span className="font-medium">Category:</span>{" "}
//                   {doctor?.speciality || item.speciality}
//                 </p>

//                 <p className="mt-1">
//                   <span className="font-medium">Fees:</span> ₹
//                   {doctor?.fees || item.fees}
//                 </p>

//                 <p className="text-zinc-700 font-medium mt-3">Address</p>

//                 <p className="text-xs">
//                   {doctor?.address?.line1 || "Address not available"}
//                 </p>

//                 <p className="text-xs">
//                   {doctor?.address?.line2 || ""}
//                 </p>

//                 <p className="mt-3">
//                   <span className="font-medium">Booking Date:</span>{" "}
//                   {item.slotDate}
//                 </p>

//                 <p className="mt-1">
//                   <span className="font-medium">Booking Time:</span>{" "}
//                   {item.slotTime}
//                 </p>

//                 <p className="mt-1 text-xs text-zinc-500">
//                   Booked on{" "}
//                   {item.bookedAt
//                     ? new Date(item.bookedAt).toLocaleString()
//                     : ""}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col gap-2 justify-center">
//                 <button className="text-sm border border-indigo-500 px-4 py-2 rounded text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all">
//                   Pay Online
//                 </button>

//                 <button
//                   onClick={() => handleCancel(item._id)}
//                   className="text-sm border border-red-400 px-4 py-2 rounded text-red-400 hover:bg-red-500 hover:text-white transition-all"
//                 >
//                   Cancel Appointment
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;



import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyAppointment = () => {
  const { getAppointments, cancelAppointment } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    if (data) setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    const ok = await cancelAppointment(id);

    if (ok) {
      alert("Appointment Cancelled");
      fetchAppointments();
    }
  };

  const getStatusText = (status) => {
    if (status === "pending") return "Pending";
    if (status === "accepted") return "Accepted by doctor";
    if (status === "cancelled_by_user") return "Cancelled by you";
    if (status === "cancelled_by_doctor") return "Cancelled by doctor";
    return status;
  };

  if (!appointments.length) {
    return <p className="text-center mt-10">No Appointments Found</p>;
  }
  console.log(appointments);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>

      <div>
        {appointments.map((item) => {
          const doctor = item.doctorId;

          return (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 border-b"
            >
              {/* Doctor Image */}
              <div>
                <img
                  className="w-32 h-32 object-cover bg-indigo-50 rounded"
                  src={doctor?.image}
                  alt={doctor?.name}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-lg text-neutral-800 font-semibold">
                  {doctor?.name || item.doctorName}
                </p>

                <p className="mt-1">
                  <span className="font-medium">Category:</span>{" "}
                  {doctor?.speciality || item.speciality}
                </p>

                <p className="mt-1">
                  <span className="font-medium">Fees:</span> ₹
                  {doctor?.fees || item.fees}
                </p>

                <p className="text-zinc-700 font-medium mt-3">Address</p>

                <p className="text-xs">
                  {doctor?.address?.line1 || "Address not available"}
                </p>

                <p className="text-xs">
                  {doctor?.address?.line2 || ""}
                </p>

                <p className="mt-3">
                  <span className="font-medium">Booking Date:</span>{" "}
                  {item.slotDate}
                </p>

                <p className="mt-1">
                  <span className="font-medium">Booking Time:</span>{" "}
                  {item.slotTime}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Booked on{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : ""}
                </p>

                {/* Status */}
                <p className="mt-3">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      item.status === "accepted"
                        ? "text-green-600"
                        : item.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {getStatusText(item.status)}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 justify-center">
                <button className="text-sm border border-indigo-500 px-4 py-2 rounded text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all">
                  Pay Online
                </button>

                <button
                  disabled={item.status !== "pending"}
                  onClick={() => handleCancel(item._id)}
                  className={`text-sm px-4 py-2 rounded transition-all ${
                    item.status === "pending"
                      ? "border border-red-400 text-red-400 hover:bg-red-500 hover:text-white"
                      : "border border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointment;



// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { AuthContext } from "../context/AuthContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol } = useContext(AppContext);
//   const { token, getProfile } = useContext(AuthContext);

//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");
//   const [user, setUser] = useState(null);

//   // ---------------- USER ----------------
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         const userData = await getProfile();
//         setUser(userData);
//       }
//     };
//     fetchUser();
//   }, [token]);

//   // ---------------- DOCTOR ----------------
//   useEffect(() => {
//     const doctor = doctors.find((item) => item._id === docId);
//     setDocInfo(doctor);
//   }, [doctors, docId]);

//   // ---------------- SLOTS ----------------
//   const getAvailableSlots = () => {
//     let today = new Date();
//     let allSlots = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date();
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(21, 0, 0, 0);

//       if (today.toDateString() === currentDate.toDateString()) {
//         currentDate.setHours(today.getHours() > 10 ? today.getHours() + 1 : 10);
//         currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];

//       while (currentDate <= endTime) {
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: currentDate.toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       allSlots.push(timeSlots);
//     }

//     setDocSlots(allSlots);
//   };

//   useEffect(() => {
//     if (docInfo) getAvailableSlots();
//   }, [docInfo]);

//   // ---------------- BOOK ----------------
//   const bookAppointment = async () => {
//     if (!token) return alert("Please login first");
//     if (!slotTime) return alert("Select a time slot");

//     try {
//       const selectedDate = docSlots[slotIndex][0].datetime;
//       const slotDate = selectedDate.toISOString().split("T")[0];

//       const bookingData = {
//         doctorId: docInfo._id,
//         doctorName: docInfo.name,
//         speciality: docInfo.speciality,
//         fees: docInfo.fees,
//         userId: user?._id,
//         userName: user?.name,
//         slotDate,
//         slotTime,
//       };

//       const res = await fetch("http://localhost:4000/api/appointments/book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token,
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         alert(data.message);
//       } else {
//         alert("Appointment booked successfully (Pending approval)");
//       }
//     } catch (err) {
//       alert("Something went wrong");
//     }
//   };

//   return (
//     docInfo && (
//       <div>
//         {/* Doctor Info */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} />

//           <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
//             <p className="text-2xl font-medium flex items-center gap-2">
//               {docInfo.name}
//               <img className="w-6" src={assets.verified_icon} />
//             </p>

//             <p className="text-sm mt-2">
//               {docInfo.degree} - {docInfo.speciality}
//             </p>

//             <p className="mt-4 font-medium">
//               Fee: {currencySymbol}{docInfo.fees}
//             </p>
//           </div>
//         </div>

//         {/* Slots */}
//         <div className="mt-6">
//           <p className="font-medium">Booking Slots</p>

//           <div className="flex gap-3 overflow-x-scroll mt-3">
//             {docSlots.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSlotIndex(index)}
//                 className={`px-4 py-3 rounded-full cursor-pointer ${
//                   slotIndex === index ? "bg-blue-600 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 <p>{days[item[0]?.datetime.getDay()]}</p>
//                 <p>{item[0]?.datetime.getDate()}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-3 overflow-x-scroll mt-4">
//             {docSlots[slotIndex]?.map((item, index) => (
//               <p
//                 key={index}
//                 onClick={() => setSlotTime(item.time)}
//                 className={`px-4 py-2 rounded-full cursor-pointer ${
//                   slotTime === item.time ? "bg-blue-600 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {item.time}
//               </p>
//             ))}
//           </div>

//           <button
//             onClick={bookAppointment}
//             className="mt-5 bg-blue-700 text-white px-5 py-2 rounded-full"
//           >
//             Book Appointment
//           </button>
//         </div>

//         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//       </div>
//     )
//   );
// };

// export default Appointment;