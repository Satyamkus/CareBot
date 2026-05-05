import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';

const Doctor = () => {

  const{speciality}=useParams();
  const {doctors}=useContext(AppContext);
  const navigate=useNavigate();
  const[showFilter,setShowFilter]=useState(false);

  const [filterDoc,setFilterDoc]=useState([]);

  // const applyFilter=()=>{
  //  if(speciality){
  //   setFilterDoc(doctors.filter((item)=>item.speciality===speciality));
  //  }else{
  //   setFilterDoc(doctors);
  //  }
  // }
  const applyFilter = () => {
    if (speciality) {
      const selected = decodeURIComponent(speciality).toLowerCase();
  
      setFilterDoc(
        doctors.filter(
          (item) =>
            item.speciality &&
            item.speciality.toLowerCase() === selected
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(()=>{
    applyFilter();
  },[doctors,speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transitional-all sm:hidden ${showFilter ?'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col gap-5 text-sm text-gray-600 ${showFilter ? 'flex':'hidden'} sm:flex`}>
          <p onClick={()=>speciality==='General physician'? navigate('/doctors'):navigate('/doctor/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician' ? 'bg-blue-400 text-black' : ''}`}>General Physician</p>
          <p onClick={()=>speciality==='Gynecologist'? navigate('/doctors'):navigate('/doctor/Gynecologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist' ? 'bg-blue-400 text-black' : ''}`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'? navigate('/doctors'):navigate('/doctor/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist' ? 'bg-blue-400 text-black' : ''}`}>Dermatologist</p>
          <p onClick={()=>speciality==='Neurologist'? navigate('/doctors'):navigate('/doctor/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist' ? 'bg-blue-400 text-black' : ''}`}>Neurologist</p>
          <p onClick={()=>speciality==='Gastroenterologist'? navigate('/doctors'):navigate('/doctor/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist' ? 'bg-blue-400 text-black' : ''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item) => (
                <div key={item._id} onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex item-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p >Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  )
}

export default Doctor