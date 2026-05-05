// // routes/doctorRoutes.js
// import express from "express";
// import {
//   getDoctorAppointments,
//   acceptAppointment,
//   cancelAppointmentByDoctor,
// } from "../controllers/doctorController.js";

// import doctorAuth from "../middleware/doctorAuth.js";

// const router = express.Router();

// router.get("/appointments", doctorAuth, getDoctorAppointments);

// router.post("/appointments/accept/:id", doctorAuth, acceptAppointment);

// router.post("/appointments/cancel/:id", doctorAuth, cancelAppointmentByDoctor);

// export default router;


// import express from "express";
// import {
//   getDoctorAppointments,
//   acceptAppointment,
//   cancelAppointmentByDoctor,
// } from "../controllers/doctorController.js";

// import authDoctor from "../middleware/doctorAuth.js";

// const router = express.Router();

// router.get("/appointments", authDoctor, getDoctorAppointments);
// router.post("/appointments/accept/:id", authDoctor, acceptAppointment);
// router.post("/appointments/cancel/:id", authDoctor, cancelAppointmentByDoctor);

// export default router;

// import express from "express";
// import authUser from "../middlewares/authMiddleware.js";

// import {
//   registerDoctor,
//   loginDoctor,
//   getDoctorProfile,
//   updateDoctorProfile,
//   // sendDoctorOtp,
//   // verifyDoctorOtp,
//   // resetDoctorPassword,
// } from "../controllers/doctorController.js";

// import {
//   getDoctorAppointments,
//   acceptAppointment,
//   cancelByDoctor,
// } from "../controllers/appointMentController.js";
// import Doctor from "../models/doctorsModel.js";
// const router = express.Router();

// // doctor auth
// router.post("/register", registerDoctor);
// router.post("/login", loginDoctor);
// // doctor profile
// router.get("/profile", authUser, getDoctorProfile);
// router.post("/update", authUser, updateDoctorProfile);
// // doctor appointments
// router.get("/appointments", authUser, getDoctorAppointments);
// router.patch("/appointments/accept/:id", authUser, acceptAppointment);
// router.patch("/appointments/cancel/:id", authUser, cancelByDoctor);

// // router.post("/send-otp", sendDoctorOtp);
// // router.post("/verify-otp", verifyDoctorOtp);
// // router.post("/reset-password", resetDoctorPassword);

// router.get("/list", async (req, res) => {
//   try {
//     const doctors = await Doctor.find().select("-password");

//     res.json({
//       success: true,
//       doctors,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// export default router;


import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import Doctor from "../models/doctorsModel.js";
import {
  registerDoctor,
  verifyDoctorOtp,
  loginDoctor,
  forgotDoctorPassword,
  resetDoctorPassword,
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";

import {
  getDoctorAppointments,
  acceptAppointment,
  cancelByDoctor,
} from "../controllers/appointMentController.js";

const router = express.Router();

// AUTH FLOW
router.post("/register", registerDoctor);
router.post("/verify-otp", verifyDoctorOtp);
router.post("/login", loginDoctor);

// PASSWORD RESET
router.post("/forgot-password", forgotDoctorPassword);
router.post("/reset-password", resetDoctorPassword);

// PROFILE
router.get("/profile", authUser, getDoctorProfile);
router.post("/update", authUser, updateDoctorProfile);

// APPOINTMENTS
router.get("/appointments", authUser, getDoctorAppointments);
router.patch("/appointments/accept/:id", authUser, acceptAppointment);
router.patch("/appointments/cancel/:id", authUser, cancelByDoctor);


router.get("/list", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});


export default router;