// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const DoctorProfile = () => {
// //   const [doctor, setDoctor] = useState(null);

// //   const fetchDoctor = async () => {
// //     const token = localStorage.getItem("token");

// //     const res = await axios.get(
// //       "http://localhost:4000/api/doctor/profile",
// //       {
// //         headers: { token },
// //       }
// //     );

// //     if (res.data.success) {
// //       setDoctor(res.data.doctor);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDoctor();
// //   }, []);

// //   if (!doctor) return null;

// //   return (
// //     <div className="border rounded p-4 mb-6">
// //       <p className="text-lg font-semibold">{doctor.name}</p>
// //       <p>{doctor.email}</p>
// //       <p>{doctor.speciality}</p>
// //     </div>
// //   );
// // };

// // export default DoctorProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DoctorProfile = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   const token = localStorage.getItem("token");
//   const backendUrl = "http://localhost:4000";

//   const fetchDoctor = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/doctor/profile`, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         setDoctor(res.data.doctor);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateDoctor = async () => {
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/doctor/update`,
//         doctor,
//         {
//           headers: { token },
//         }
//       );

//       if (res.data.success) {
//         alert("Profile updated");
//         setIsEdit(false);
//         fetchDoctor();
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchDoctor();
//   }, []);

//   if (!doctor) return <p className="mt-6">Loading...</p>;

//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Image */}
//         <div>
//           <img
//             src={
//               doctor.image ||
//               "https://cdn-icons-png.flaticon.com/512/9187/9187532.png"
//             }
//             alt={doctor.name}
//             className="w-40 h-40 rounded-xl object-cover border"
//           />

//           {isEdit && (
//             <input
//               type="text"
//               placeholder="Image URL"
//               className="border p-2 rounded mt-3 w-full"
//               value={doctor.image || ""}
//               onChange={(e) =>
//                 setDoctor({ ...doctor, image: e.target.value })
//               }
//             />
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1 space-y-3">
//           {isEdit ? (
//             <input
//               className="border p-2 rounded w-full text-xl font-semibold"
//               value={doctor.name || ""}
//               onChange={(e) =>
//                 setDoctor({ ...doctor, name: e.target.value })
//               }
//             />
//           ) : (
//             <h2 className="text-2xl font-bold text-blue-700">
//               {doctor.name}
//             </h2>
//           )}

//           <p>
//             <strong>Email:</strong> {doctor.email}
//           </p>

//           {[
//             "speciality",
//             "degree",
//             "experience",
//             "fees",
//             "about",
//           ].map((field) => (
//             <div key={field}>
//               <strong>
//                 {field.charAt(0).toUpperCase() + field.slice(1)}:
//               </strong>{" "}
//               {isEdit ? (
//                 <input
//                   className="border p-2 rounded w-full mt-1"
//                   value={doctor[field] || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       [field]: e.target.value,
//                     })
//                   }
//                 />
//               ) : (
//                 doctor[field]
//               )}
//             </div>
//           ))}

//           {/* Address */}
//           <div>
//             <strong>Address:</strong>

//             {isEdit ? (
//               <div className="grid md:grid-cols-2 gap-2 mt-2">
//                 <input
//                   className="border p-2 rounded"
//                   placeholder="Street"
//                   value={doctor.address?.street || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       address: {
//                         ...doctor.address,
//                         street: e.target.value,
//                       },
//                     })
//                   }
//                 />

//                 <input
//                   className="border p-2 rounded"
//                   placeholder="City"
//                   value={doctor.address?.city || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       address: {
//                         ...doctor.address,
//                         city: e.target.value,
//                       },
//                     })
//                   }
//                 />

//                 <input
//                   className="border p-2 rounded"
//                   placeholder="State"
//                   value={doctor.address?.state || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       address: {
//                         ...doctor.address,
//                         state: e.target.value,
//                       },
//                     })
//                   }
//                 />

//                 <input
//                   className="border p-2 rounded"
//                   placeholder="Zip"
//                   value={doctor.address?.zip || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       address: {
//                         ...doctor.address,
//                         zip: e.target.value,
//                       },
//                     })
//                   }
//                 />
//               </div>
//             ) : (
//               <p className="mt-1 text-gray-700">
//                 {doctor.address?.street}, {doctor.address?.city},{" "}
//                 {doctor.address?.state} {doctor.address?.zip}
//               </p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="pt-4">
//             {isEdit ? (
//               <button
//                 onClick={updateDoctor}
//                 className="bg-blue-700 text-white px-6 py-2 rounded-full"
//               >
//                 Save Changes
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="bg-blue-700 text-white px-6 py-2 rounded-full"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DoctorProfile = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   const token = localStorage.getItem("token");
//   const backendUrl = "http://localhost:4000";

//   const fetchDoctor = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/doctor/profile`, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         setDoctor(res.data.doctor);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateDoctor = async () => {
//     try {
//       const res = await axios.post(
//         `${backendUrl}/api/doctor/update`,
//         doctor,
//         { headers: { token } }
//       );

//       if (res.data.success) {
//         alert("Profile updated successfully");
//         setIsEdit(false);
//         fetchDoctor();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctor();
//   }, []);

//   if (!doctor)
//     return <p className="p-6 text-gray-500">Loading profile...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-4 sm:p-6">
//       <div className="bg-white shadow-md rounded-2xl overflow-hidden border">

//         {/* Header */}
//         <div className="bg-blue-600 p-6 text-white">
          
//           <p className="text-sm opacity-80">Manage your personal and professional details</p>
          
          
//         </div>

//         {/* Body */}
//         <div className="p-6 grid md:grid-cols-3 gap-6">

//           {/* LEFT - IMAGE */}
//           <div className="flex flex-col items-center text-center">
//             <img
//               src={
//                 doctor.image ||
//                 "https://cdn-icons-png.flaticon.com/512/9187/9187532.png"
//               }
//               className="w-36 h-36 rounded-full object-cover border shadow"
//               alt="doctor"
//             />

//             {isEdit && (
//               <input
//                 className="mt-4 border rounded-lg p-2 w-full text-sm"
//                 placeholder="Image URL"
//                 value={doctor.image || ""}
//                 onChange={(e) =>
//                   setDoctor({ ...doctor, image: e.target.value })
//                 }
//               />
//             )}

//             <p className="mt-3 font-semibold text-lg">{doctor.name}</p>
//             <p className="text-sm text-gray-500">{doctor.email}</p>
//           </div>

//           {/* RIGHT - DETAILS */}
//           <div className="md:col-span-2 space-y-4">

//             {/* Fields */}
//             <div className="grid sm:grid-cols-2 gap-4">

//               {["speciality", "degree", "experience", "fees"].map((item) => (
//                 <div key={item}>
//                   <p className="text-xs text-gray-500 capitalize">{item}</p>

//                   {isEdit ? (
//                     <input
//                       className="w-full border rounded-lg p-2 text-sm"
//                       value={doctor[item] || ""}
//                       onChange={(e) =>
//                         setDoctor({ ...doctor, [item]: e.target.value })
//                       }
//                     />
//                   ) : (
//                     <p className="font-medium">{doctor[item]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* About */}
//             <div>
//               <p className="text-xs text-gray-500">About</p>

//               {isEdit ? (
//                 <textarea
//                   className="w-full border rounded-lg p-2 text-sm mt-1"
//                   rows={3}
//                   value={doctor.about || ""}
//                   onChange={(e) =>
//                     setDoctor({ ...doctor, about: e.target.value })
//                   }
//                 />
//               ) : (
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   {doctor.about}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div>
//               <p className="text-xs text-gray-500">Address</p>

//               {isEdit ? (
//                 <input
//                   className="w-full border rounded-lg p-2 text-sm mt-1"
//                   value={doctor.address?.line1 || ""}
//                   onChange={(e) =>
//                     setDoctor({
//                       ...doctor,
//                       address: {
//                         ...doctor.address,
//                         line1: e.target.value,
//                       },
//                     })
//                   }
//                 />
//               ) : (
//                 <p className="text-sm text-gray-700">
//                   {doctor.address?.line1}, {doctor.address?.line2}
//                 </p>
//               )}
//             </div>

//             {/* BUTTON */}
//             <div className="pt-3">
//               {isEdit ? (
//                 <button
//                   onClick={updateDoctor}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm"
//                 >
//                   Save Changes
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsEdit(true)}
//                   className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg text-sm"
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;



import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [doctor, setDoctor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // FETCH PROFILE
  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { token },
      });

      if (res.data.success) setDoctor(res.data.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  // UPDATE PROFILE
  const updateProfile = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/doctor/update`,
        doctor,
        { headers: { token } }
      );

      if (res.data.success) {
        alert("Profile updated");
        setIsEdit(false);
        fetchDoctor();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // IMAGE UPLOAD
  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await axios.post(
  //       `${backendUrl}/api/upload`,
  //       formData,
  //       {
  //         headers: {
  //           token,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (res.data.success) {
  //       console.log(res.data);
  //       setDoctor({ ...doctor, image: res.data.url });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  const uploadImage = async (e) => {
    const file = e.target.files[0];
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post(
        `${backendUrl}/api/upload`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
  
      console.log("UPLOAD RESPONSE:", res.data);
  
      if (res.data.success) {
        const imageUrl = res.data.url;
  
        // 1. update local UI instantly
        setDoctor((prev) => ({ ...prev, image: imageUrl }));
  
        // 2. SAVE TO DATABASE (IMPORTANT FIX)
        await axios.post(
          `${backendUrl}/api/doctor/update`,
          { image: imageUrl },
          { headers: { token } }
        );
  
        fetchDoctor(); // refresh from DB
      }
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (!doctor) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-sm opacity-80">{doctor.email}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>


      {/* BODY */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">

        {/* IMAGE */}
        <img
          src={doctor.image || "https://via.placeholder.com/150"}
          className="w-32 h-32 rounded-full object-cover"
        />

        {isEdit && (
          <input
            type="file"
            className="mt-2"
            onChange={uploadImage}
          />
        )}

        {/* FIELDS */}
        <div className="grid gap-3 mt-4">

          {["speciality", "degree", "experience", "fees", "about"].map(
            (field) => (
              <div key={field}>
                <label className="text-sm text-gray-500">
                  {field}
                </label>

                {isEdit ? (
                  <input
                    className="border w-full p-2 rounded"
                    value={doctor[field] || ""}
                    onChange={(e) =>
                      setDoctor({
                        ...doctor,
                        [field]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{doctor[field]}</p>
                )}
              </div>
            )
          )}
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;