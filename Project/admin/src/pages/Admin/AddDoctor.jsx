// import React from 'react'
// import { assets } from '../../assets/assets'

// const AddDoctor = () => {
//   return (
//     <form className='m-5 w-full' action="">
//         <p className='mb-3 text-lg font-medium'>Add Doctor</p>
//     <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
//     <div className='flex items-center gap-4 mb-8 text-gray-500'>
//         <label htmlFor="doc-img">
//         <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="" />
//         </label>
//         <input type="file" id='doc-img' hidden />
//         <p>Upload Doctor <br/> picture</p>
//         </div>
//     <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
//         <div className='w-full lg:flex-1 flex flex-col gap-4'>
//             <div className='flex-1 flex flex-col gap-1'>
//             <p>Doctor Name</p>
//             <input type="text" placeholder='Name' />
//             </div>
//         <div className='flex-1 flex flex-col gap-1'>
//             <p>Doctor Email</p>
//             <input type="email" placeholder='Email' />
//         </div>
    
//     <div className='flex-1 flex flex-col gap-1'>
//         <p>Doctor Password</p>
//         <input type="password" placeholder='Password' />
//     </div>
//     <div className='flex-1 flex flex-col gap-1'>
//         <p>Experience</p>
//         <select name="" id="">
//             <option value="1 Year">1 Year</option>
//             <option value="2 Year">2 Year</option>
//             <option value="3 Year">3 Year</option>
//             <option value="4 Year">4 Year</option>
//             <option value="5 Year">5 Year</option>
//             <option value="6 Year">6 Year</option>
//             <option value="7 Year">7 Year</option>  
//             <option value="8 Year">8 Year</option>
//             <option value="9 Year">9 Year</option>
//             <option value="10 Year">10 Year</option>
//         </select>
//     </div>
//     <div className='flex-1 flex flex-col gap-1'>
//         <p>Fees</p>
//     <input type="number" placeholder='fees' required/>
//     </div>
//      <div className='flex-1 flex flex-col gap-1'>
//         <p>About Doctor</p>
//     <input type="text-area" placeholder='write about the doctor' required/>
//     </div>
//     </div>
//     <div className='w-full lg:flex-1 flex flex-col gap-4'>
//     <div className='flex lg:flex-1 flex-col gap-1'>
//         <p>Speciality</p>
//     <select name="" id="">
//     <option value="General Physician">General Physician</option>
//     <option value="Gynecologist">Gynecologist</option>
//     <option value="Dermatologist">Dermatologist</option>
//     <option value="Pediatricians">Pediatricians</option>
//     <option value="Neurologist">Neurologist</option>
//     <option value="Gastroenterologist">Gastroenterologist</option>
//     </select>
//     </div>
//     <div>
//         <p>Education</p>
//         <input type="text" name="" id="" />
//     </div>
//     <div>Address</div>
//     <input type="text" name="" id="" />
//     </div>
//     </div>
//     </div>
//     </form>
//   )
// }

// export default AddDoctor



import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    about: '',
    speciality: 'General Physician',
    education: '',
    address: ''
  });

  const backend = "http://localhost:4000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      // 🚨 CHECK IMAGE
      if (!docImg) {
        return toast.error("Please upload doctor image ❌");
      }

      const data = new FormData();

      data.append('image', docImg);

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // ✅ GET TOKEN
      const token = localStorage.getItem("aToken");

      if (!token) {
        return toast.error("Please login first ❌");
      }

      const res = await axios.post(
        `${backend}/api/admin/add-doctor`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token
          }
        }
      );

      if (res.data.success) {
        toast.success("Doctor Added Successfully ✅");

        // 🔥 RESET FORM
        setFormData({
          name: '',
          email: '',
          password: '',
          experience: '1 Year',
          fees: '',
          about: '',
          speciality: 'General Physician',
          education: '',
          address: ''
        });

        setDocImg(null);

      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Error adding doctor ❌");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        {/* Upload Image */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>

          <input
            type="file"
            id='doc-img'
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p>Upload Doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>

          {/* LEFT */}
          <div className='flex-1 flex flex-col gap-4'>

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Doctor Name" className='border p-2 rounded' required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className='border p-2 rounded' required />
            <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" className='border p-2 rounded' required />

            <select name="experience" onChange={handleChange} className='border p-2 rounded'>
              {[...Array(10)].map((_, i) => (
                <option key={i}>{i + 1} Year</option>
              ))}
            </select>

            <input name="fees" value={formData.fees} onChange={handleChange} type="number" placeholder="Fees" className='border p-2 rounded' />

            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About Doctor" className='border p-2 rounded' />

          </div>

          {/* RIGHT */}
          <div className='flex-1 flex flex-col gap-4'>

            <select name="speciality" onChange={handleChange} className='border p-2 rounded'>
              <option>General Physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>

            <input name="education" value={formData.education} onChange={handleChange} placeholder="Education" className='border p-2 rounded' />

            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className='border p-2 rounded' />

          </div>

        </div>

        <button className='mt-6 bg-primary text-white px-6 py-2 rounded'>
          Add Doctor
        </button>

      </div>
    </form>
  );
};

export default AddDoctor;