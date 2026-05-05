import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// const Navbar = () => {

// const navigate = useNavigate()
// const [showMenu,setShowMenu] = useState(false)
// const [token,setToken] = useState(true)

// return (

// <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300'>

// <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo"/>

// <ul className='hidden md:flex items-start gap-5 font-medium'>

// <NavLink to="/">
// <li className='py-1'>Home</li>
// </NavLink>

// <NavLink to="/doctors">
// <li className='py-1'>All Doctors</li>
// </NavLink>

// <NavLink to="/contact">
// <li className='py-1'>Contact</li>
// </NavLink>

// <NavLink to="/about">
// <li className='py-1'>About</li>
// </NavLink>

// </ul>

// <div className='flex items-center gap-4'>

// {
// token ? (

// <div className='flex items-center gap-2 cursor-pointer group relative'>

// <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile"/>

// <img className='w-2.5' src={assets.dropdown_icon} alt=""/>

// <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>

// <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

// <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>
// My Profile
// </p>

// <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>
// My Appointments
// </p>

// <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>
// Logout
// </p>

// </div>
// </div>
// </div>

// ) : (

// <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
// Create Account
// </button>

// )
// }

// <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="menu"/>

// {/* Mobile Menu */}

// <div className={`${showMenu ? 'fixed w-full h-full' : 'hidden'} md:hidden right-0 top-0 bottom-0 z-20 bg-white`}>

// <div className='flex items-center justify-between px-5 py-6'>

// <img className='w-36' src={assets.logo} alt="logo"/>

// <img onClick={()=>setShowMenu(false)} className='w-7 cursor-pointer' src={assets.cross_icon} alt="close"/>

// </div>

// <ul className='flex flex-col items-center gap-4 mt-5 text-lg font-medium'>

// <NavLink to="/" onClick={()=>setShowMenu(false)} className='px-4 py-2 rounded-full'>
// Home
// </NavLink>

// <NavLink to="/doctors" onClick={()=>setShowMenu(false)} className='px-4 py-2 rounded-full'>
// All Doctors
// </NavLink>

// <NavLink to="/contact" onClick={()=>setShowMenu(false)} className='px-4 py-2 rounded-full'>
// Contact
// </NavLink>

// <NavLink to="/about" onClick={()=>setShowMenu(false)} className='px-4 py-2 rounded-full'>
// About
// </NavLink>

// <NavLink to="/login" onClick={()=>setShowMenu(false)} className='px-4 py-2 rounded-full'>
// Login
// </NavLink>

// </ul>
// </div>
// </div>
// </div>
// )
// }

// export default Navbar




const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // ✅ REAL AUTH STATE
  const { token, logout } = useContext(AuthContext);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300'>

      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo"/>

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/"><li className='py-1'>Home</li></NavLink>
        <NavLink to="/doctors"><li className='py-1'>All Doctors</li></NavLink>
        <NavLink to="/checkups"><li className='py-1'>Checkups</li></NavLink>
        <NavLink to="/contact"><li className='py-1'>Contact</li></NavLink>
        <NavLink to="/about"><li className='py-1'>About</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>

        {
          token ? (

            <div className='flex items-center gap-2 cursor-pointer group relative'>

              <img className='w-8 rounded-full' src={assets.profile_pic} alt="profile"/>
              <img className='w-2.5' src={assets.dropdown_icon} alt=""/>

              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>

                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

                  <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>
                    My Profile
                  </p>

                  <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>
                    My Appointments
                  </p>

                  <p onClick={logout} className='hover:text-black cursor-pointer'>
                    Logout
                  </p>

                </div>

              </div>
            </div>

          ) : (

            <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
              Create Account
            </button>

          )
        }

        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="menu"/>

      </div>
    </div>
  );
}

export default Navbar;