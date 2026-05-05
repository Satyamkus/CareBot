// import React, { useContext } from 'react'
// import Login from './pages/Login'
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { AdminContext } from './context/AdminContext';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Admin/Dashboard';
// import DoctorList from './pages/Admin/DoctorList';
// import AllApointments from './pages/Admin/AllApointments';
// import AddDoctor from './pages/Admin/AddDoctor';

// const App = () => {

//   const {aToken}=useContext(AdminContext)


//   return  aToken?(
//     <div className='bg-[#F8F9FD]'>
//   <ToastContainer/>
//   <Navbar/>
//   <div className='flex items-start'>
//     <Sidebar/>
//     <Routes>
//     <Route path='/' element={<></>}/>
//     <Route path='/admin-dashboard' element={<Dashboard/>}/>
//     <Route path='/add-doctor' element={<AddDoctor/>}/>
//     <Route path='/all-appointments' element={<AllApointments/>}/>
//     <Route path='/doctor-list' element={<DoctorList/>}/>


//     </Routes>
//   </div>
//     </div>
//   ):(
//     <>
//     <Login/>
//   <ToastContainer/>
//     </>
//   )
// }

// export default App




import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import DoctorList from './pages/Admin/DoctorList';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';

const App = () => {

  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FD] min-h-screen'>

      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <div className='flex'>

        {/* Sidebar */}
        <Sidebar />

        {/* 🔥 THIS FIXES YOUR ISSUE */}
        <div className='flex-1 p-6'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorList />} />
            <Route path='/all-appointments' element={<AllApointments />} />
          </Routes>
        </div>

      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;