// import React, { useState } from 'react'

// const Login = () => {

//   const[state,setState]=useState('Sign Up');
//   const[email,setEmail]=useState('');
//   const[password,setPassword]=useState('');
//   const[name,setName]=useState('');

//   const onSubmitHandler=async(event)=>{
//     event.preventDefault();
//   }

//   return (
//     <form className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
//         <p className='text-2xl font-semibold'>{state==='Sign Up'? 'Create Account':'Login'}</p>
//         <p >Please {state==='Sign Up'?'Sign Up':'log in'} to Book Appointments</p>
//         <div className='w-full'>
//           {state==='Sign Up' && (
//             <div>
//               <p>Full Name</p>
//               <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
//             </div>
//           )}
//           <p>Email</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
//         </div>
//         <div className='w-full'>
//           <p>Password</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
//         </div>
//       <button type="submit" className='bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600'>
//         {state==='Sign Up' ? 'Create Account' : 'Login'}
//       </button>
//         {state==='Sign Up' ? 
//         <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login</span></p> 
//         : <p>Create an Account ? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click Here</span></p>}
//       </div>
//     </form>
//   )
// }

// export default Login


// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const { login, signup } = useContext(AuthContext);

// const onSubmitHandler = async (e) => {
//   e.preventDefault();

//   if (state === "Sign Up") {
//     await signup(name, email, password);
//   } else {
//     await login(email, password);
//   }
// };


// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [state, setState] = useState("Sign Up");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
  

//   // ✅ MUST BE INSIDE COMPONENT
//   const { login, signup } = useContext(AuthContext);

//   // const onSubmitHandler = async (event) => {
//   //   event.preventDefault();

//   //   try {
//   //     if (state === "Sign Up") {
//   //       await signup(name, email, password);
//   //     } else {
//   //       await login(email, password);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     alert("Something went wrong");
//   //   }
//   // };
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
  
//     try {
//       if (state === "Sign Up") {
//         const success = await signup(name, email, password);
//         if (success) navigate("/"); // ✅ redirect
//       } else {
//         const success = await login(email, password);
//         if (success) navigate("/"); // ✅ redirect
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }
//   };
//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">

//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>

//         <p>
//           Please {state === "Sign Up" ? "Sign Up" : "log in"} to Book Appointments
//         </p>

//         <div className="w-full">
//           {state === "Sign Up" && (
//             <div>
//               <p>Full Name</p>
//               <input
//                 className="border border-zinc-300 rounded w-full p-2 mt-1"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           )}

//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </button>

//         {state === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-blue-500 underline cursor-pointer"
//             >
//               Login
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create an Account?{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-blue-500 underline cursor-pointer"
//             >
//               Click Here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useContext(AuthContext);

//   const [mode, setMode] = useState("login"); // login | signup
//   const [role, setRole] = useState("patient"); // patient | doctor

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       let success = false;

//       // 🔥 SIGNUP
//       if (mode === "signup") {
//         success = await signup(name, email, password, role);
//       }

//       // 🔥 LOGIN
//       else {
//         success = await login(email, password);
//       }

//       if (success) {
//         // 🚀 ROLE BASED NAVIGATION
//         if (role === "doctor") {
//           navigate("/doctor/dashboard");
//         } else {
//           navigate("/");
//         }
//       }

//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] border rounded-xl shadow-lg">

//         {/* TITLE */}
//         <p className="text-2xl font-semibold">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </p>

//         {/* NAME (SIGNUP ONLY) */}
//         {mode === "signup" && (
//           <div>
//             <p>Full Name</p>
//             <input
//               className="border w-full p-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//         )}

//         {/* EMAIL */}
//         <div>
//           <p>Email</p>
//           <input
//             className="border w-full p-2"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* PASSWORD */}
//         <div>
//           <p>Password</p>
//           <input
//             type="password"
//             className="border w-full p-2"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {/* ROLE SELECT (ONLY SIGNUP) */}
//         {mode === "signup" && (
//           <div>
//             <p>Login As</p>
//             <select
//               className="border w-full p-2"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </div>
//         )}

//         {/* BUTTON */}
//         <button className="bg-blue-500 text-white p-2 rounded">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </button>

//         {/* SWITCH */}
//         <p className="text-sm">
//           {mode === "login" ? (
//             <>
//               New user?{" "}
//               <span
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => setMode("signup")}
//               >
//                 Create account
//               </span>
//             </>
//           ) : (
//             <>
//               Already have account?{" "}
//               <span
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => setMode("login")}
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </form>
//   );
// };

// export default Login;


// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useContext(AuthContext);

//   const [mode, setMode] = useState("login");
//   const [role, setRole] = useState("patient");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       let success = false;
//       let userRole = role;

//       if (mode === "signup") {
//         success = await signup(name, email, password, role);
//       } else {
//         const res = await login(email, password);

//         // backend should return role
//         userRole = res?.role;
//         success = res?.success;
//       }

//       if (success) {
//         if (userRole === "doctor") {
//           navigate("/doctor/dashboard");
//         } else {
//           navigate("/");
//         }
//       }

//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] border rounded-xl shadow-lg">

//         <p className="text-2xl font-semibold">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </p>

//         {/* NAME */}
//         {mode === "signup" && (
//           <input
//             placeholder="Full Name"
//             className="border w-full p-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         {/* EMAIL */}
//         <input
//           placeholder="Email"
//           className="border w-full p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="border w-full p-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* ROLE ONLY SIGNUP */}
//         {mode === "signup" && (
//           <select
//             className="border w-full p-2"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="patient">Patient</option>
//             <option value="doctor">Doctor</option>
//           </select>
//         )}

//         <button className="bg-blue-500 text-white p-2 rounded">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </button>

//         <p className="text-sm">
//           {mode === "login" ? (
//             <>
//               New user?{" "}
//               <span onClick={() => setMode("signup")} className="text-blue-500 cursor-pointer">
//                 Create account
//               </span>
//             </>
//           ) : (
//             <>
//               Already have account?{" "}
//               <span onClick={() => setMode("login")} className="text-blue-500 cursor-pointer">
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </form>
//   );
// };

// export default Login;



// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useContext(AuthContext);

//   const [mode, setMode] = useState("login"); // login | signup
//   const [role, setRole] = useState("patient"); // patient | doctor

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       let res;
//       let userRole = role;

//       // ================= SIGNUP =================
//       if (mode === "signup") {
//         res = await signup(name, email, password, role);

//         userRole = res?.role || role;
//       }

//       // ================= LOGIN =================
//       else {
//         if (role === "doctor") {
//           res = await fetch("http://localhost:4000/api/doctors/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//           }).then((r) => r.json());
//         } else {
//           res = await login(email, password);
//         }

//         userRole = res?.role;
//       }

//       // ================= NAVIGATION =================
//       if (res?.success) {
//         if (userRole === "doctor") {
//           navigate("/doctor/dashboard");
//         } else {
//           navigate("/");
//         }
//       } else {
//         alert(res?.message || "Login failed");
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] border rounded-xl shadow-lg">

//         <p className="text-2xl font-semibold">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </p>

//         {/* NAME */}
//         {mode === "signup" && (
//           <input
//             placeholder="Full Name"
//             className="border w-full p-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         {/* EMAIL */}
//         <input
//           placeholder="Email"
//           className="border w-full p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="border w-full p-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* ROLE (ONLY SIGNUP) */}
//         {mode === "signup" && (
//           <select
//             className="border w-full p-2"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="patient">Patient</option>
//             <option value="doctor">Doctor</option>
//           </select>
//         )}

//         <button className="bg-blue-500 text-white p-2 rounded">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </button>

//         <p className="text-sm">
//           {mode === "login" ? (
//             <>
//               New user?{" "}
//               <span
//                 onClick={() => setMode("signup")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Create account
//               </span>
//             </>
//           ) : (
//             <>
//               Already have account?{" "}
//               <span
//                 onClick={() => setMode("login")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </form>
//   );
// };

// export default Login;


// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useContext(AuthContext);

//   const [mode, setMode] = useState("login");
//   const [role, setRole] = useState("patient");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       let res;

//       // ================= SIGNUP =================
//       if (mode === "signup") {
//         res = await signup(name, email, password, role);
//       }

//       // ================= LOGIN =================
//       else {
//         res = await login(email, password);
//       }

//       // ❌ IMPORTANT: backend response check
//       if (!res || res.success === false) {
//         alert(res?.message || "Authentication failed");
//         return;
//       }

//       // ================= ROLE REDIRECT =================
//       const userRole = res.role || role;

//       if (userRole === "doctor") {
//         navigate("/doctor/dashboard");
//       } else {
//         navigate("/");
//       }

//     } catch (error) {
//       console.log(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-3 p-8 min-w-[340px] border rounded-xl shadow-lg">

//         <p className="text-2xl font-semibold">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </p>

//         {mode === "signup" && (
//           <input
//             placeholder="Full Name"
//             className="border w-full p-2"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         <input
//           placeholder="Email"
//           className="border w-full p-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border w-full p-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {mode === "signup" && (
//           <select
//             className="border w-full p-2"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="patient">Patient</option>
//             <option value="doctor">Doctor</option>
//           </select>
//         )}

//         <button className="bg-blue-500 text-white p-2 rounded">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </button>

//         <p className="text-sm">
//           {mode === "login" ? (
//             <>
//               New user?{" "}
//               <span
//                 onClick={() => setMode("signup")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Create account
//               </span>
//             </>
//           ) : (
//             <>
//               Already have account?{" "}
//               <span
//                 onClick={() => setMode("login")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>

//       </div>
//     </form>
//   );
// };

// export default Login;

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login, signup } = useContext(AuthContext);

//   const [mode, setMode] = useState("login");
//   const [role, setRole] = useState("patient");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const onSubmitHandler = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     let res;

//   //     // ================= SIGNUP =================
//   //     if (mode === "signup") {
//   //       res = await signup(name, email, password, role);
//   //     }

//   //     // ================= LOGIN =================
//   //     else {
//   //       res = await login(email, password, role);
//   //     }

//   //     if (!res || !res.success) {
//   //       alert(res?.message || "Authentication failed");
//   //       return;
//   //     }

//   //     // save role
//   //     localStorage.setItem("role", res.role);

//   //     // redirect
//   //     if (res.role === "doctor") {
//   //       navigate("/doctor/dashboard");
//   //     } else {
//   //       navigate("/");
//   //     }

//   //   } catch (error) {
//   //     console.log(error);
//   //     alert("Server error");
//   //   }
//   // };


//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
  
//     try {
//       let res;
  
//       if (mode === "signup") {
//         res = await signup(name, email, password, role);
//       } else {
//         res = await login(email, password, role);
//       }
  
//       if (!res || !res.success) {
//         alert(res?.message || "Authentication failed");
//         return;
//       }
  
//       if (res.role === "doctor") {
//         navigate("/doctor/dashboard");
//       } else {
//         navigate("/");
//       }
  
//     } catch (error) {
//       console.log(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="min-h-[80vh] flex items-center justify-center"
//     >
//       <div className="flex flex-col gap-4 p-8 min-w-[360px] border rounded-xl shadow-lg">

//         <p className="text-2xl font-semibold text-center">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </p>

//         {/* ROLE SELECT FOR BOTH LOGIN + SIGNUP */}
//         <div>
//           <p className="mb-1 text-sm">Login As</p>
//           <select
//             className="border w-full p-2 rounded"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="patient">Patient</option>
//             <option value="doctor">Doctor</option>
//           </select>
//         </div>

//         {mode === "signup" && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="border w-full p-2 rounded"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="border w-full p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border w-full p-2 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           {mode === "signup" ? "Create Account" : "Login"}
//         </button>

//         <p className="text-sm text-center">
//           {mode === "login" ? (
//             <>
//               New user?{" "}
//               <span
//                 onClick={() => setMode("signup")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Create account
//               </span>
//             </>
//           ) : (
//             <>
//               Already have account?{" "}
//               <span
//                 onClick={() => setMode("login")}
//                 className="text-blue-500 cursor-pointer"
//               >
//                 Login
//               </span>
//             </>
//           )}
//         </p>

//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [mode, setMode] = useState("login"); // login | signup
  const [role, setRole] = useState("patient");

  const [step, setStep] = useState("form"); // form | otp | reset

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [resendTimer, setResendTimer] = useState(0);

  // ================= ROUTE MAPPING (IMPORTANT FIX) =================
  const getBaseRoute = (role) => {
    return role === "doctor" ? "doctor" : "user";
  };

  // ================= TIMER =================
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // ================= SIGNUP (SEND OTP) =================
  const sendSignupOtp = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/${getBaseRoute(role)}/register`,
        { name, email, password }
      );

      if (!res.data.success) return alert(res.data.message);

      alert("OTP sent to email");
      setStep("otp");
      setResendTimer(600); // 10 min
    } catch (err) {
      console.log(err);
      alert("Error sending OTP");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/${getBaseRoute(role)}/verify-otp`,
        { email, otp }
      );

      if (!res.data.success) return alert(res.data.message);

      alert("Account created successfully");

      setStep("form");
      setMode("login");
      setOtp("");
    } catch (err) {
      console.log(err);
      alert("OTP verification failed");
    }
  };

  // ================= LOGIN =================
  const loginHandler = async () => {
    try {
      const res = await login(email, password, role);

      if (!res.success) return alert(res.message);

      localStorage.setItem("role", res.role);

      if (res.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  // ================= FORGOT PASSWORD =================
  const sendForgotOtp = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/${getBaseRoute(role)}/forgot-password`,
        { email }
      );

      if (!res.data.success) return alert(res.data.message);

      alert("OTP sent to email for password reset");
      setStep("reset");
    } catch (err) {
      console.log(err);
      alert("Error sending reset OTP");
    }
  };

  // ================= RESET PASSWORD =================
  const resetPassword = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/${getBaseRoute(role)}/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      if (!res.data.success) return alert(res.data.message);

      alert("Password updated successfully");

      setStep("form");
      setMode("login");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      alert("Reset failed");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (mode === "login") loginHandler();
        else sendSignupOtp();
      }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 p-8 w-[380px] border rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold text-center">
          {mode === "signup" ? "Create Account" : "Login"}
        </h2>

        {/* ROLE */}
        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {/* NAME */}
        {mode === "signup" && step === "form" && (
          <input
            placeholder="Full Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        {step === "form" && (
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {/* ================= OTP STEP ================= */}
        {step === "otp" && (
          <>
            <input
              placeholder="Enter OTP"
              className="border p-2 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              type="button"
              onClick={verifyOtp}
              className="bg-green-600 text-white p-2 rounded"
            >
              Verify OTP
            </button>

            {resendTimer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in {resendTimer}s
              </p>
            ) : (
              <button
                type="button"
                onClick={sendSignupOtp}
                className="text-blue-600"
              >
                Resend OTP
              </button>
            )}
          </>
        )}

        {/* ================= RESET PASSWORD ================= */}
        {step === "reset" && (
          <>
            <input
              placeholder="Enter OTP"
              className="border p-2 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={resetPassword}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}

        {/* SUBMIT */}
        {step === "form" && (
          <button className="bg-blue-600 text-white p-2 rounded">
            {mode === "signup" ? "Send OTP" : "Login"}
          </button>
        )}

        {/* SWITCH */}
        {step === "form" && (
          <p
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="text-center text-blue-500 cursor-pointer"
          >
            {mode === "login"
              ? "Create account"
              : "Already have account?"}
          </p>
        )}

        {/* FORGOT */}
        {mode === "login" && step === "form" && (
          <p
            onClick={sendForgotOtp}
            className="text-red-500 text-center cursor-pointer"
          >
            Forgot Password?
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;