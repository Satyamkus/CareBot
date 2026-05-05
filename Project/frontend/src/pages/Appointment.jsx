// // import React, { useContext, useEffect, useState } from 'react'
// // import { useParams } from 'react-router-dom'
// // import { AppContext } from '../context/AppContext'
// // import { assets } from '../assets/assets'
// // import RelatedDoctors from '../components/RelatedDoctors'

// // const Appointment = () => {

// //   const { docId } = useParams()
// //   const { doctors, currencySymbol } = useContext(AppContext)

// //   const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// //   const [docInfo,setDocInfo] = useState(null)
// //   const [docSlots,setDocSlots] = useState([])
// //   const [slotIndex,setSlotIndex] = useState(0)
// //   const [slotTime,setSlotTime] = useState('')

// //   const fetchDocInfo = () => {
// //     const docInfo = doctors.find((item)=>item._id===docId)
// //     setDocInfo(docInfo)
// //   }

// //   const getAvailableSlots = () => {

// //     setDocSlots([])
// //     let today = new Date()

// //     for(let i=0;i<7;i++){

// //       let currentDate = new Date()
// //       currentDate.setDate(today.getDate()+i)

// //       let endTime = new Date()
// //       endTime.setDate(today.getDate()+i)
// //       endTime.setHours(21,0,0,0)

// //       if(today.getDate()===currentDate.getDate()){
// //         currentDate.setHours(today.getHours()>10?today.getHours()+1:10)
// //         currentDate.setMinutes(today.getMinutes()>30?30:0)
// //       }
// //       else{
// //         currentDate.setHours(10)
// //         currentDate.setMinutes(0)
// //       }

// //       let timeSlots=[]

// //       while(currentDate<=endTime){

// //         let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

// //         timeSlots.push({
// //           datetime:new Date(currentDate),
// //           time:formattedTime
// //         })

// //         currentDate.setMinutes(currentDate.getMinutes()+30)
// //       }

// //       setDocSlots(prev => [...prev,timeSlots])
// //     }
// //   }

// //   useEffect(()=>{
// //     fetchDocInfo()
// //   },[doctors,docId])

// //   useEffect(()=>{
// //     if(docInfo){
// //       getAvailableSlots()
// //     }
// //   },[docInfo])

// //   return docInfo && (
// //     <div>

// //       {/* Doctor Info */}
// //       <div className='flex flex-col sm:flex-row gap-4'>

// //         <div>
// //           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
// //         </div>

// //         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0'>

// //           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
// //             {docInfo.name}
// //             <img className='w-6' src={assets.verified_icon} alt="" />
// //           </p>

// //           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
// //             <p>{docInfo.degree}-{docInfo.speciality}</p>
// //             <button className='py-0.5 px-2 border text-xs rounded-full'>
// //               {docInfo.experience} years of experience
// //             </button>
// //           </div>

// //           <div>
// //             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
// //               About <img src={assets.info_icon} alt="" />
// //             </p>

// //             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
// //               {docInfo.about}
// //             </p>
// //           </div>

// //           <p className='text-gray-500 font-medium mt-4'>
// //             Appointment Fee :
// //             <span className='text-gray-600'> {currencySymbol}{docInfo.fees}</span>
// //           </p>

// //         </div>
// //       </div>

// //       {/* Booking Slots */}

// //       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>

// //         <p>Booking Slots</p>

// //         {/* Days */}

// //         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>

// //           {docSlots.length && docSlots.map((item,index)=>(
// //             <div
// //               key={index}
// //               className={`text-center py-6 min-w-16 rounded-full cursor-pointer
// //               ${slotIndex===index?'bg-blue-700 text-white':'bg-gray-200 text-gray-700'}`}
// //               onClick={()=>setSlotIndex(index)}
// //             >
// //               <p>{item[0] && days[item[0].datetime.getDay()]}</p>
// //               <p>{item[0] && item[0].datetime.getDate()}</p>
// //             </div>
// //           ))}

// //         </div>

// //         {/* Times */}

// //         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>

// //           {docSlots.length && docSlots[slotIndex].map((item,index)=>(
// //             <p
// //               key={index}
// //               onClick={()=>setSlotTime(item.time)}
// //               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
// //               ${item.time===slotTime?'bg-blue-700 text-white':'bg-gray-200 text-gray-700'}`}
// //             >
// //               {item.time.toLowerCase()}
// //             </p>
// //           ))}

// //         </div>

// //         <button className='bg-blue-700 text-white py-2 px-4 rounded-full mt-4'>
// //           Book Appointment
// //         </button>

// //       </div>
// //       {/* Listing Related Doctors */}
// //       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

// //     </div>
// //   )
// // }

// // export default Appointment

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";

// const Appointment = () => {
//   const bookAppointment = async () => {
//     if (!slotTime) {
//       alert("Please select a time slot");
//       return;
//     }

//     try {
//       const selectedDate = docSlots[slotIndex][0].datetime;

//       const bookingData = {
//         doctorId: docInfo._id,
//         doctorName: docInfo.name,
//         speciality: docInfo.speciality,
//         fees: docInfo.fees,

//         userId: "123", // replace later with real auth
//         userName: "Satyam",

//         slotDate: selectedDate.toISOString().split("T")[0], // IMPORTANT
//         slotTime: slotTime,

//         bookedAt: new Date(),
//       };

//       const res = await fetch("http://localhost:4000/api/appointments/book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert("Appointment booked successfully ✅");
//       } else {
//         alert(data.message); // 🔥 "This slot is already booked"
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };
//   const { docId } = useParams();
//   const { doctors, currencySymbol } = useContext(AppContext);

//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   // Fetch Doctor Info
//   const fetchDocInfo = () => {
//     const doctor = doctors.find((item) => item._id === docId);
//     setDocInfo(doctor);
//   };

//   // Generate Available Slots
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
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime,
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       allSlots.push(timeSlots);
//     }

//     setDocSlots(allSlots);
//   };

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   return (
//     docInfo && (
//       <div>
//         {/* Doctor Info */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt=""
//             />
//           </div>

//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {docInfo.name}
//               <img className="w-6" src={assets.verified_icon} alt="" />
//             </p>

//             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//               <p>
//                 {docInfo.degree}-{docInfo.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {docInfo.experience} years of experience
//               </button>
//             </div>

//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                 About <img src={assets.info_icon} alt="" />
//               </p>

//               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                 {docInfo.about}
//               </p>
//             </div>

//             <p className="text-gray-500 font-medium mt-4">
//               Appointment Fee :
//               <span className="text-gray-600">
//                 {" "}
//                 {currencySymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Booking Slots */}

//         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//           <p>Booking Slots</p>

//           {/* Days */}

//           <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//             {docSlots.length > 0 &&
//               docSlots.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
//               ${
//                 slotIndex === index
//                   ? "bg-blue-700 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//                   onClick={() => setSlotIndex(index)}
//                 >
//                   <p>{item[0] && days[item[0].datetime.getDay()]}</p>
//                   <p>{item[0] && item[0].datetime.getDate()}</p>
//                 </div>
//               ))}
//           </div>

//           {/* Times */}

//           <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//             {docSlots.length > 0 &&
//               docSlots[slotIndex]?.map((item, index) => (
//                 <p
//                   key={index}
//                   onClick={() => setSlotTime(item.time)}
//                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
//               ${
//                 item.time === slotTime
//                   ? "bg-blue-700 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//                 >
//                   {item.time.toLowerCase()}
//                 </p>
//               ))}
//           </div>

//           <button
//             onClick={bookAppointment}
//             className="bg-blue-700 text-white py-2 px-4 rounded-full mt-4"
//           >
//             Book Appointment
//           </button>
//         </div>

//         {/* Related Doctors */}
//         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//       </div>
//     )
//   );
// };

// // export default Appointment;
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

//   // ---------------- FETCH USER ----------------
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         const userData = await getProfile();
//         setUser(userData);
//       }
//     };

//     fetchUser();
//   }, [token]);

//   // ---------------- FETCH DOCTOR ----------------
//   useEffect(() => {
//     const doctor = doctors.find((item) => item._id === docId);
//     setDocInfo(doctor);
//   }, [doctors, docId]);

//   // ---------------- GENERATE SLOTS ----------------
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
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime,
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       allSlots.push(timeSlots);
//     }

//     setDocSlots(allSlots);
//   };

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   // ---------------- BOOK APPOINTMENT ----------------
//   const bookAppointment = async () => {
//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     if (!slotTime) {
//       alert("Please select a time slot");
//       return;
//     }

//     try {
//       const selectedDate = docSlots[slotIndex][0].datetime;
//       const slotDate = selectedDate.toISOString().split("T")[0];

//       // STEP 1 → check available slots first
//       const slotRes = await fetch(
//         `http://localhost:4000/api/appointments/available-slots?doctorId=${docInfo._id}&date=${slotDate}`
//       );

//       const slotData = await slotRes.json();

//       if (!slotData.availableSlots.includes(slotTime)) {
//         alert("This slot is already booked. Please choose another slot.");
//         return;
//       }

//       // STEP 2 → book
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

//       if (data.success) {
//         alert("Appointment booked successfully");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     docInfo && (
//       <div>
//         {/* Doctor Info */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div>
//             <img
//               className="bg-primary w-full sm:max-w-72 rounded-lg"
//               src={docInfo.image}
//               alt=""
//             />
//           </div>

//           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white">
//             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//               {docInfo.name}
//               <img className="w-6" src={assets.verified_icon} alt="" />
//             </p>

//             <p className="text-sm mt-2 text-gray-600">
//               {docInfo.degree} - {docInfo.speciality}
//             </p>

//             <p className="text-gray-500 font-medium mt-4">
//               Appointment Fee : {currencySymbol}
//               {docInfo.fees}
//             </p>
//           </div>
//         </div>

//         {/* Slots */}
//         <div className="sm:ml-72 sm:pl-4 mt-6">
//           <p className="font-medium text-gray-700">Booking Slots</p>

//           {/* Days */}
//           <div className="flex gap-3 overflow-x-scroll mt-4">
//             {docSlots.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSlotIndex(index)}
//                 className={`text-center py-5 min-w-16 rounded-full cursor-pointer ${
//                   slotIndex === index
//                     ? "bg-blue-700 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 <p>{days[item[0]?.datetime.getDay()]}</p>
//                 <p>{item[0]?.datetime.getDate()}</p>
//               </div>
//             ))}
//           </div>

//           {/* Times */}
//           <div className="flex gap-3 overflow-x-scroll mt-4">
//             {docSlots[slotIndex]?.map((item, index) => (
//               <p
//                 key={index}
//                 onClick={() => setSlotTime(item.time)}
//                 className={`px-5 py-2 rounded-full cursor-pointer ${
//                   slotTime === item.time
//                     ? "bg-blue-700 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {item.time.toLowerCase()}
//               </p>
//             ))}
//           </div>

//           <button
//             onClick={bookAppointment}
//             className="bg-blue-700 text-white py-2 px-5 rounded-full mt-5"
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


import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const { token, getProfile } = useContext(AuthContext);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [user, setUser] = useState(null);

  const backendUrl= import.meta.env.VITE_BACKEND_URL;
  // ---------------- USER ----------------
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const userData = await getProfile();
        setUser(userData);
      }
    };
    fetchUser();
  }, [token]);

  // ---------------- DOCTOR ----------------
  useEffect(() => {
    const doctor = doctors.find((item) => item._id === docId);
    setDocInfo(doctor);
  }, [doctors, docId]);

  // ---------------- SLOTS ----------------
  const getAvailableSlots = () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.toDateString() === currentDate.toDateString()) {
        currentDate.setHours(today.getHours() > 10 ? today.getHours() + 1 : 10);
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate <= endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  // ---------------- BOOK ----------------
  const bookAppointment = async () => {
    if (!token) return alert("Please login first");
    if (!slotTime) return alert("Select a time slot");

    try {
      const selectedDate = docSlots[slotIndex][0].datetime;
      const slotDate = selectedDate.toISOString().split("T")[0];

      const bookingData = {
        doctorId: docInfo._id,
        doctorName: docInfo.name,
        speciality: docInfo.speciality,
        fees: docInfo.fees,
        userId: user?._id,
        userName: user?.name,
        slotDate,
        slotTime,
      };

      const res = await fetch(`${backendUrl}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
      } else {
        alert("Appointment booked successfully (Pending approval)");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    docInfo && (
      <div>
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} />

          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
            <p className="text-2xl font-medium flex items-center gap-2">
              {docInfo.name}
              <img className="w-6" src={assets.verified_icon} />
            </p>

            <p className="text-sm mt-2">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <p className="mt-4 font-medium">
  Fee: {currencySymbol}{docInfo.fees}
</p>

{docInfo.about && (
  <div className="mt-4">
    <p className="font-medium text-gray-800">About</p>
    <p className="text-sm text-gray-600 leading-6 mt-1">
      {docInfo.about}
    </p>
  </div>
)}
          </div>
        </div>

        {/* Slots */}
        <div className="mt-6">
          <p className="font-medium">Booking Slots</p>

          <div className="flex gap-3 overflow-x-scroll mt-3">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`px-4 py-3 rounded-full cursor-pointer ${
                  slotIndex === index ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                <p>{days[item[0]?.datetime.getDay()]}</p>
                <p>{item[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  slotTime === item.time ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {item.time}
              </p>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="mt-5 bg-blue-700 text-white px-5 py-2 rounded-full"
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;