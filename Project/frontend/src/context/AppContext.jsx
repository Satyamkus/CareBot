// import { createContext } from "react";
// import { doctors } from "../assets/assets";



// export const AppContext=createContext();

// const AppContextProvider=(props)=>{

//     const currencySymbol='$';

//     const value={
//         doctors,
//         currencySymbol 
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>      
//     )
// }
// export default AppContextProvider


// import { createContext } from "react";
// import { doctors } from "../assets/assets";

// export const AppContext = createContext();   // ✅ REQUIRED

// const AppContextProvider = ({ children }) => {

//   const currencySymbol = "$";

//   const value = {
//     doctors,
//     currencySymbol
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;


import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "₹";

  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctors = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/list`);

      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const value = {
    doctors,
    setDoctors,
    getDoctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;