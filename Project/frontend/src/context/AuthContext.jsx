// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);

//   const backendUrl = "http://localhost:4000";

//   const loadUser = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/user/profile`, {
//         headers: { token },
//       });
//       setUser(res.data.user);
//     } catch {
//       logout();
//     }
//   };

//   useEffect(() => {
//     if (token) loadUser();
//   }, [token]);

//   const login = async (email, password) => {
//     const res = await axios.post(`${backendUrl}/api/user/login`, { email, password });
//     if (res.data.success) {
//       setToken(res.data.token);
//       localStorage.setItem("token", res.data.token);
//     }
//   };

//   const signup = async (name, email, password) => {
//     const res = await axios.post(`${backendUrl}/api/user/register`, {
//       name,
//       email,
//       password,
//     });
//     if (res.data.success) {
//       setToken(res.data.token);
//       localStorage.setItem("token", res.data.token);
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// import { createContext, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   const backendUrl = "http://localhost:4000/api/user";

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(`${backendUrl}/login`, {
//         email,
//         password,
//       });

//       if (res.data.success) {
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         return true;
//       } else {
//         alert(res.data.message);
//         return false;
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Login failed");
//       return false;
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       const res = await axios.post(`${backendUrl}/register`, {
//         name,
//         email,
//         password,
//       });

//       if (res.data.success) {
//         setToken(res.data.token);
//         localStorage.setItem("token", res.data.token);
//         return true;
//       } else {
//         alert(res.data.message);
//         return false;
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Signup failed");
//       return false;
//     }
//   };

//   const logout = () => {
//     setToken("");
//     localStorage.removeItem("token");
//   };

//   const getProfile = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/profile`, {
//         headers: { token },
//       });

//       return res.data.user;
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   };

//   const getAppointments = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/appointments/my", {
//         headers: { token },
//       });

//       return res.data.appointments;
//     } catch (err) {
//       console.log(err);
//       return [];
//     }
//   };

//   const cancelAppointment = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:4000/api/appointments/cancel/${id}`,
//         {
//           headers: { token },
//         }
//       );

//       return res.data.success;
//     } catch (err) {
//       console.log(err);
//       return false;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         login,
//         signup,
//         logout,
//         getProfile,
//         getAppointments,
//         cancelAppointment,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // ================= LOGIN =================
  const login = async (email, password, selectedRole) => {
    try {
      const endpoint =
        selectedRole === "doctor"
          ? `${baseUrl}/api/doctor/login`
          : `${baseUrl}/api/user/login`;

      const res = await axios.post(endpoint, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        setRole(res.data.role);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        return res.data;
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Login failed",
      };
    }
  };

  // ================= SIGNUP =================
  const signup = async (name, email, password, selectedRole) => {
    try {
      const endpoint =
        selectedRole === "doctor"
          ? `${baseUrl}/api/doctor/register`
          : `${baseUrl}/api/user/register`;

      const payload =
        selectedRole === "doctor"
          ? {
              name,
              email,
              password,
              speciality: "General Physician",
            }
          : {
              name,
              email,
              password,
            };

      const res = await axios.post(endpoint, payload);

      if (res.data.success) {
        setToken(res.data.token);
        setRole(res.data.role);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        return res.data;
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Signup failed",
      };
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setToken("");
    setRole("");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // ================= USER PROFILE =================
  const getProfile = async () => {
    try {
      const endpoint =
        role === "doctor"
          ? `${baseUrl}/api/doctor/profile`
          : `${baseUrl}/api/user/profile`;

      const res = await axios.get(endpoint, {
        headers: { token },
      });

      return res.data.profile || res.data.user || res.data.doctor;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // ================= USER APPOINTMENTS =================
  const getAppointments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/appointments/my`, {
        headers: { token },
      });

      return res.data.appointments || [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // ================= USER CANCEL APPOINTMENT =================
  const cancelAppointment = async (id) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/appointments/user-cancel/${id}`,
        {},
        {
          headers: { token },
        }
      );

      return res.data.success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // ================= DOCTOR APPOINTMENTS =================
  const getDoctorAppointments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/doctor/appointments`, {
        headers: { token },
      });

      return res.data.appointments || [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // ================= DOCTOR UPDATE STATUS =================
  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/doctor/appointment-status`,
        {
          appointmentId,
          status,
        },
        {
          headers: { token },
        }
      );

      return res.data.success;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,

        login,
        signup,
        logout,

        getProfile,

        getAppointments,
        cancelAppointment,

        getDoctorAppointments,
        updateAppointmentStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;