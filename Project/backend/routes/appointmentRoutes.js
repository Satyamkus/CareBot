// // // // routes/appointmentRoutes.js

// // // import express from 'express'
// // // import AppointmentModel from '../models/appointmentSchema.js'
// // // import { getAvailableSlots } from "../controllers/appointMentController.js";
// // // const router = express.Router()

// // // router.post('/book', async (req, res) => {
// // //   try {
// // //     const {
// // //       doctorId,
// // //       doctorName,
// // //       speciality,
// // //       fees,
// // //       userId,
// // //       userName,
// // //       slotDate,
// // //       slotTime,
// // //       bookedAt
// // //     } = req.body

// // //     // ✅ Check if slot already booked
// // //     const existing = await AppointmentModel.findOne({
// // //       doctorId,
// // //       slotDate,
// // //       slotTime
// // //     })

// // //     if (existing) {
// // //       return res.json({
// // //         success: false,
// // //         message: "This slot is already booked"
// // //       })
// // //     }

// // //     // ✅ Save appointment
// // //     const newAppointment = new AppointmentModel({
// // //       doctorId,
// // //       doctorName,
// // //       speciality,
// // //       fees,
// // //       userId,
// // //       userName,
// // //       slotDate,
// // //       slotTime,
// // //       bookedAt
// // //     })

// // //     await newAppointment.save()

// // //     res.json({ success: true, message: "Appointment booked" });
// // //     console.log("Saving: Appointments", newAppointment)

// // //   } catch (error) {
// // //     res.json({ success: false, message: error.message })
// // //   }
// // // })

// // // // router.get("/available-slots", getAvailableSlots);

// // // router.get("/available-slots", (req, res, next) => {
// // //   console.log("🔥 Route hit");
// // //   next();
// // // }, getAvailableSlots);

// // // export default router


// // import express from 'express'
// // import AppointmentModel from '../models/appointmentSchema.js'
// // import { getAvailableSlots } from "../controllers/appointMentController.js";
// // import authUser from '../middlewares/authMiddleware.js';
// // import { getMyAppointments, cancelAppointment } from '../controllers/appointMentController.js';

// // const router = express.Router();


// // // ✅ BOOK APPOINTMENT (LOGIN REQUIRED)
// // router.post('/book', authUser, async (req, res) => {
// //   try {
// //     const userId = req.userId;

// //     const {
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       slotDate,
// //       slotTime,
// //       bookedAt
// //     } = req.body;

// //     // 🔒 Check if already booked
// //     const existing = await AppointmentModel.findOne({
// //       doctorId,
// //       slotDate,
// //       slotTime
// //     });

// //     if (existing) {
// //       return res.json({
// //         success: false,
// //         message: "This slot is already booked"
// //       });
// //     }

// //     // ✅ Save with logged-in user
// //     const newAppointment = new AppointmentModel({
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       userId,
// //       slotDate,
// //       slotTime,
// //       bookedAt
// //     });

// //     await newAppointment.save();

// //     res.json({
// //       success: true,
// //       message: "Appointment booked successfully"
// //     });

// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // });


// // // ✅ GET USER APPOINTMENTS
// // router.get('/user', authUser, async (req, res) => {
// //   try {
// //     const appointments = await AppointmentModel.find({
// //       userId: req.userId
// //     }).sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       appointments
// //     });

// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // });


// // // ✅ CANCEL APPOINTMENT
// // router.post('/cancel', authUser, async (req, res) => {
// //   try {
// //     const { appointmentId } = req.body;

// //     await AppointmentModel.findByIdAndDelete(appointmentId);

// //     res.json({
// //       success: true,
// //       message: "Appointment cancelled"
// //     });

// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // });


// // // ✅ AVAILABLE SLOTS (YOUR CONTROLLER)
// // router.get("/available-slots", (req, res, next) => {
// //   console.log("🔥 Slots route hit");
// //   next();
// // }, getAvailableSlots);

// // router.get("/my", authUser, getMyAppointments);
// // router.delete("/cancel/:id", authUser, cancelAppointment);

// // export default router;





// // import express from "express";
// // import authUser from "../middlewares/authMiddleware.js";

// // import {
// //   bookAppointment,
// //   getAvailableSlots,
// //   getMyAppointments,
// //   cancelAppointment,
// // } from "../controllers/appointMentController.js";

// // const router = express.Router();

// // // BOOK APPOINTMENT
// // router.post("/book", authUser, bookAppointment);

// // // GET AVAILABLE SLOTS
// // router.get("/available-slots", getAvailableSlots);

// // // GET LOGGED-IN USER APPOINTMENTS
// // router.get("/my", authUser, getMyAppointments);

// // // CANCEL APPOINTMENT
// // router.delete("/cancel/:id", authUser, cancelAppointment);

// // export default router;



// import express from "express";
// import authUser from "../middlewares/authMiddleware.js";
// import authDoctor from "../middlewares/authDoctor.js";

// import {
//   bookAppointment,
//   getMyAppointments,
//   cancelAppointment,
//   getDoctorAppointments,
//   acceptAppointment,
//   doctorCancelAppointment,
//     getAvailableSlots
// } from "../controllers/appointMentController.js";

// const router = express.Router();

// router.post("/book", authUser, bookAppointment);

// router.get("/my", authUser, getMyAppointments);

// router.delete("/cancel/:id", authUser, cancelAppointment);

// router.get("/available-slots", getAvailableSlots);
// // doctor
// router.get("/doctor", authDoctor, getDoctorAppointments);

// router.post("/doctor/accept/:id", authDoctor, acceptAppointment);

// router.post("/doctor/cancel/:id", authDoctor, doctorCancelAppointment);

// export default router;



import express from "express";
import authUser from "../middlewares/authMiddleware.js";

import {
  bookAppointment,
  getMyAppointments,
  cancelByUser,
  getDoctorAppointments,
  acceptAppointment,
  cancelByDoctor,
} from "../controllers/appointMentController.js";

const router = express.Router();


// user
router.post("/book", authUser, bookAppointment);
router.get("/my", authUser, getMyAppointments);
router.patch("/user-cancel/:id", authUser, cancelByUser);


// doctor
// router.get("/doctor", authUser, getDoctorAppointments);
// router.patch("/doctor/accept/:id", authUser, acceptAppointment);
// router.patch("/doctor/cancel/:id", authUser, cancelByDoctor);

export default router;