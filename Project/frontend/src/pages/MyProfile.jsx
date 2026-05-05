// // // import React, { useState } from 'react'
// // // import { assets } from '../assets/assets';

// // // const MyProfile = () => {
// // //   const[userData, setUserData] = useState(
// // //     {
// // //       name: "Vishal Verma",
// // //       image: assets.profile_pic,
// // //       email: "vishalkrverma302004@gmail.com",
// // //       phone: "+91 7068614701",
// // //       address: "123 Main Street, City, Country",
// // //       gender: "Male",
// // //       age: 21,
// // //       dob: "2004-03-30",
// // //     }
// // //   );

// // //   const[isEdit,setIsEdit] = useState(false);


// // //   return (
// // //     <div className='max-w-lg flex flex-col gap-2 text-sm'>
// // //       <img  className="w-36 h-38 rounded-full" src={userData.image} alt="" />
// // //     {
// // //       isEdit ? 
// // //       <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} />
// // //       :
// // //       <p className='font-medium text-3xl text-neutral-800 mt-4' >{userData.name}</p>
// // //     }
// // //     <hr className='bg-zinc-400 h-[1px] border-none'/>
// // //     <div>
// // //       <p className='text-natural-500 underline mt-3'>Contact Information</p>
// // //       <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-700'>
// // //         <p className='font-medium'>Email id:</p>
// // //         {
// // //           isEdit ?
// // //           <input className='bg-gray-50 max-w-52' type="text" value={userData.email} onChange={e=>setUserData(prev=>({...prev,email:e.target.value}))} />
// // //           :
// // //           <p className='text-blue-600'>{userData.email}</p>
// // //         }
// // //         <p className='font-medium'>Phone:</p>
// // //         {
// // //           isEdit ?
// // //           <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))} />
// // //           :  <p className='text-blue-350'>{userData.phone}</p>
// // //         }
// // //         <p className='font-medium'>Address:</p>
// // //         {
// // //           isEdit ?
// // //           <input className='bg-gray-50' type="text" value={userData.address} onChange={e=>setUserData(prev=>({...prev,address:e.target.value}))} />
// // //           :  <p className='text-gray-600'>{userData.address}</p>
// // //         }
// // //       </div>
// // //     </div>
// // //     <div>

// // //     <p className='text-natural-500 underline mt-3'>Basic Information</p>
// // //         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-700'>
// // //           <p className='font-medium'>Gender:</p>
// // //           {
// // //             isEdit ?
// // //             <select className='bg-gray-50 max-w-20' onChange={(e)=> setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
// // //               <option value="Male">Male</option>
// // //               <option value="Female">Female</option>
// // //               <option value="Other">Other</option>
// // //             </select>
// // //             :  <p>{userData.gender}</p>
// // //           }
// // //           <p>Age:</p>
// // //           {
// // //             isEdit ?
// // //             <input className='max-w-28 bg-gray-100' type="number" value={userData.age} onChange={e=>setUserData(prev=>({...prev,age:e.target.value}))} />
// // //             :  <p>{userData.age}</p>
// // //           }
         
// // //           <p className='font-medium'>Date of Birth:</p>
// // //           {
// // //             isEdit ?
// // //             <input className='max-w-28 bg-gray-100'   type="date" value={userData.dob} onChange={e=>setUserData(prev=>({...prev,dob:e.target.value}))} />
// // //             :  <p>{userData.dob}</p>
// // //           }
// // //           </div>
// // //         </div>
// // //           <div className='mt-10'>
// // //         {
// // //         isEdit?<button className='border-primary text-white bg-blue-700 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-black' onClick={()=>setIsEdit(false)}>Save Information</button> 
// // //         : <button className='border-primary px-8 text-white  bg-blue-700 py-2 rounded-full  hover:bg-blue-400 hover:text-black' onClick={()=>setIsEdit(true)}>Edit</button>
// // //         }
// // //         </div>
// // //     </div>
// // //   )
// // // }

// // // export default MyProfile


// // import React, { useState, useEffect, useContext } from "react";
// // import { assets } from "../assets/assets";
// // import { AuthContext } from "../context/AuthContext";
// // import axios from "axios";

// // const MyProfile = () => {

// //   const { token } = useContext(AuthContext);

// //   const [userData, setUserData] = useState(null);
// //   const [isEdit, setIsEdit] = useState(false);

// //   const backendUrl = "http://localhost:4000";

// //   // ✅ FETCH USER PROFILE
// //   const fetchProfile = async () => {
// //     try {
// //       const res = await axios.get(`${backendUrl}/api/user/profile`, {
// //         headers: { token }
// //       });

// //       if (res.data.success) {
// //         setUserData(res.data.user);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // ✅ UPDATE PROFILE
// //   const updateProfile = async () => {
// //     try {
// //       const res = await axios.post(
// //         `${backendUrl}/api/user/update`,
// //         userData,
// //         {
// //           headers: { token }
// //         }
// //       );

// //       if (res.data.success) {
// //         alert("Profile Updated");
// //         setIsEdit(false);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   // ⛔ Prevent crash before data loads
// //   if (!userData) return <p className="text-center mt-10">Loading...</p>;

// //   return (
// //     <div className="max-w-lg flex flex-col gap-2 text-sm">

// //       {/* PROFILE IMAGE */}
// //       <img
// //         className="w-36 h-36 rounded-full"
// //         src={userData.image || assets.profile_pic}
// //         alt=""
// //       />

// //       {/* NAME */}
// //       {
// //         isEdit ? (
// //           <input
// //             className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
// //             type="text"
// //             value={userData.name || ""}
// //             onChange={(e) =>
// //               setUserData(prev => ({ ...prev, name: e.target.value }))
// //             }
// //           />
// //         ) : (
// //           <p className="font-medium text-3xl text-neutral-800 mt-4">
// //             {userData.name}
// //           </p>
// //         )
// //       }

// //       <hr className="bg-zinc-400 h-[1px] border-none" />

// //       {/* CONTACT */}
// //       <div>
// //         <p className="text-neutral-500 underline mt-3">
// //           Contact Information
// //         </p>

// //         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">

// //           <p className="font-medium">Email:</p>
// //           <p className="text-blue-600">{userData.email}</p>

// //           <p className="font-medium">Phone:</p>
// //           {
// //             isEdit ? (
// //               <input
// //                 className="bg-gray-100 max-w-52"
// //                 type="text"
// //                 value={userData.phone || ""}
// //                 onChange={(e) =>
// //                   setUserData(prev => ({ ...prev, phone: e.target.value }))
// //                 }
// //               />
// //             ) : (
// //               <p>{userData.phone || "Not Added"}</p>
// //             )
// //           }

// //           <p className="font-medium">Address:</p>
// //           {
// //             isEdit ? (
// //               <input
// //                 className="bg-gray-50"
// //                 type="text"
// //                 value={userData.address || ""}
// //                 onChange={(e) =>
// //                   setUserData(prev => ({ ...prev, address: e.target.value }))
// //                 }
// //               />
// //             ) : (
// //               <p>{userData.address || "Not Added"}</p>
// //             )
// //           }

// //         </div>
// //       </div>

// //       {/* BASIC INFO */}
// //       <div>

// //         <p className="text-neutral-500 underline mt-3">
// //           Basic Information
// //         </p>

// //         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">

// //           <p className="font-medium">Gender:</p>
// //           {
// //             isEdit ? (
// //               <select
// //                 className="bg-gray-50 max-w-28"
// //                 value={userData.gender || ""}
// //                 onChange={(e) =>
// //                   setUserData(prev => ({ ...prev, gender: e.target.value }))
// //                 }
// //               >
// //                 <option value="">Select</option>
// //                 <option value="Male">Male</option>
// //                 <option value="Female">Female</option>
// //                 <option value="Other">Other</option>
// //               </select>
// //             ) : (
// //               <p>{userData.gender || "Not Added"}</p>
// //             )
// //           }

// //           <p className="font-medium">Age:</p>
// //           {
// //             isEdit ? (
// //               <input
// //                 className="max-w-28 bg-gray-100"
// //                 type="number"
// //                 value={userData.age || ""}
// //                 onChange={(e) =>
// //                   setUserData(prev => ({ ...prev, age: e.target.value }))
// //                 }
// //               />
// //             ) : (
// //               <p>{userData.age || "Not Added"}</p>
// //             )
// //           }

// //           <p className="font-medium">DOB:</p>
// //           {
// //             isEdit ? (
// //               <input
// //                 className="max-w-36 bg-gray-100"
// //                 type="date"
// //                 value={userData.dob || ""}
// //                 onChange={(e) =>
// //                   setUserData(prev => ({ ...prev, dob: e.target.value }))
// //                 }
// //               />
// //             ) : (
// //               <p>{userData.dob || "Not Added"}</p>
// //             )
// //           }

// //         </div>
// //       </div>

// //       {/* BUTTON */}
// //       <div className="mt-10">
// //         {
// //           isEdit ? (
// //             <button
// //               onClick={updateProfile}
// //               className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-400 hover:text-black"
// //             >
// //               Save Information
// //             </button>
// //           ) : (
// //             <button
// //               onClick={() => setIsEdit(true)}
// //               className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-400 hover:text-black"
// //             >
// //               Edit
// //             </button>
// //           )
// //         }
// //       </div>

// //     </div>
// //   );
// // };

// // export default MyProfile;




// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// const MyProfile = () => {
//   const { token } = useContext(AuthContext);

//   const role = localStorage.getItem("role") || "patient";
//   const backendUrl = "http://localhost:4000";

//   const [profileData, setProfileData] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   const fetchProfile = async () => {
//     try {
//       const url =
//         role === "doctor"
//           ? `${backendUrl}/api/doctor/profile`
//           : `${backendUrl}/api/user/profile`;

//       const res = await axios.get(url, {
//         headers: { token },
//       });

//       if (res.data.success) {
//         setProfileData(res.data.doctor || res.data.user || res.data.profile || res.data);
//         console.log(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchProfile();
//   }, [token]);

//   if (!profileData) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   const doctorAddress =
//     role === "doctor" && profileData.address
//       ? `${profileData.address.street || ""}, ${profileData.address.city || ""}, ${profileData.address.state || ""} ${profileData.address.zip || ""}`
//       : profileData.address || "Not Added";

//   return (
//     <div className="max-w-xl flex flex-col gap-3 text-sm">
//       <img
//         className="w-36 h-36 rounded-full object-cover"
//         src={profileData.image || assets.profile_pic}
//         alt=""
//       />

//       <h2 className="text-2xl font-semibold">{profileData.name}</h2>

//       <hr />

//       <p>
//         <strong>Email:</strong> {profileData.email}
//       </p>

//       <p>
//         <strong>Address:</strong> {doctorAddress}
//       </p>

//       {role === "doctor" ? (
//         <>
//           <p>
//             <strong>Speciality:</strong> {profileData.speciality}
//           </p>
//           <p>
//             <strong>Degree:</strong> {profileData.degree}
//           </p>
//           <p>
//             <strong>Experience:</strong> {profileData.experience}
//           </p>
//           <p>
//             <strong>Fees:</strong> ₹ {profileData.fees}
//           </p>
//           <p>
//             <strong>About:</strong> {profileData.about}
//           </p>
//         </>
//       ) : (
//         <>
//           <p>
//             <strong>Phone:</strong> {profileData.phone || "Not Added"}
//           </p>
//           <p>
//             <strong>Gender:</strong> {profileData.gender || "Not Added"}
//           </p>
//           <p>
//             <strong>Age:</strong> {profileData.age || "Not Added"}
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyProfile;


import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyProfile = () => {
  const { token } = useContext(AuthContext);

  const role = localStorage.getItem("role") || "patient";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [profileData, setProfileData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProfile = async () => {
    try {
      const url =
        role === "doctor"
          ? `${backendUrl}/api/doctor/profile`
          : `${backendUrl}/api/user/profile`;

      const res = await axios.get(url, {
        headers: { token },
      });

      if (res.data.success) {
        setProfileData(
          res.data.doctor || res.data.user || res.data.profile || res.data
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const url =
        role === "doctor"
          ? `${backendUrl}/api/doctor/update`
          : `${backendUrl}/api/user/update`;

      const res = await axios.post(url, profileData, {
        headers: { token },
      });

      if (res.data.success) {
        alert("Profile updated");
        setIsEdit(false);
        fetchProfile();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  if (!profileData) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl flex flex-col gap-3 text-sm">
      <img
        className="w-36 h-36 rounded-full object-cover"
        src={profileData.image || assets.profile_pic}
        alt=""
      />

      {isEdit ? (
        <input
          className="border p-2 rounded"
          value={profileData.name || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
          }
        />
      ) : (
        <h2 className="text-2xl font-semibold">{profileData.name}</h2>
      )}

      <hr />

      <p>
        <strong>Email:</strong> {profileData.email}
      </p>

      <div>
        <strong>Address:</strong>{" "}
        {isEdit ? (
          role === "doctor" ? (
            <div className="flex flex-col gap-2 mt-2">
              <input
                className="border p-2 rounded"
                placeholder="Street"
                value={profileData.address?.street || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: {
                      ...profileData.address,
                      street: e.target.value,
                    },
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="City"
                value={profileData.address?.city || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: {
                      ...profileData.address,
                      city: e.target.value,
                    },
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="State"
                value={profileData.address?.state || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: {
                      ...profileData.address,
                      state: e.target.value,
                    },
                  })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="ZIP"
                value={profileData.address?.zip || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: {
                      ...profileData.address,
                      zip: e.target.value,
                    },
                  })
                }
              />
            </div>
          ) : (
            <input
              className="border p-2 rounded"
              value={profileData.address || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
            />
          )
        ) : role === "doctor" ? (
          `${profileData.address?.street || ""}, ${profileData.address?.city || ""}, ${profileData.address?.state || ""} ${profileData.address?.zip || ""}`
        ) : (
          profileData.address || "Not Added"
        )}
      </div>

      {role === "doctor" ? (
        <>
          {["speciality", "degree", "experience", "fees", "about"].map(
            (field) => (
              <div key={field}>
                <strong>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </strong>{" "}
                {isEdit ? (
                  <input
                    className="border p-2 rounded w-full mt-1"
                    value={profileData[field] || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        [field]: e.target.value,
                      })
                    }
                  />
                ) : (
                  profileData[field]
                )}
              </div>
            )
          )}
        </>
      ) : (
        <>
          {["phone", "gender", "age"].map((field) => (
            <div key={field}>
              <strong>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </strong>{" "}
              {isEdit ? (
                <input
                  className="border p-2 rounded"
                  value={profileData[field] || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      [field]: e.target.value,
                    })
                  }
                />
              ) : (
                profileData[field] || "Not Added"
              )}
            </div>
          ))}
        </>
      )}

      <div className="mt-4">
        {isEdit ? (
          <button
            onClick={updateProfile}
            className="bg-blue-700 text-white px-6 py-2 rounded-full"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-700 text-white px-6 py-2 rounded-full"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;