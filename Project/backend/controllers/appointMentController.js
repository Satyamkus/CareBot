// // // 

// // // import AppointmentModel from "../models/appointmentSchema.js";

// // // export const getAvailableSlots = async (req, res) => {
// // //   try {
// // //     const { doctorName, doctorId, date } = req.query;

// // //     // ✅ Validation
// // //     if ((!doctorName && !doctorId) || !date) {
// // //       return res.json({
// // //         success: false,
// // //         message: "doctorName/doctorId and date required",
// // //       });
// // //     }

// // //     let bookedTimes = [];

// // //     try {
// // //       // ✅ Fetch booked slots (support both doctorName & doctorId)
// // //       const query = doctorId
// // //         ? { doctorId, slotDate: date }
// // //         : { doctorName, slotDate: date };

// // //       const booked = await AppointmentModel.find(query);

// // //       bookedTimes = booked.map((item) => item.slotTime);

// // //     } catch (dbError) {
// // //       // ⚠️ VERY IMPORTANT (fix your Mongo crash issue)
// // //       console.log("⚠️ DB not connected, using fallback slots");
// // //     }

// // //     // 🟢 Generate slots (your logic improved)
// // //     let slots = [];

// // //     for (let h = 10; h < 21; h++) {
// // //       const hour12 = h > 12 ? h - 12 : h;
// // //       const ampm = h >= 12 ? "PM" : "AM";

// // //       slots.push(`${hour12}:00 ${ampm}`);
// // //       slots.push(`${hour12}:30 ${ampm}`);
// // //     }

// // //     // 🧹 Remove booked slots
// // //     const availableSlots = slots.filter(
// // //       (slot) => !bookedTimes.includes(slot)
// // //     );

// // //     // ✅ RESPONSE FORMAT (IMPORTANT for chatbot + frontend)
// // //     res.json({
// // //       success: true,
// // //       slots: availableSlots,        // ✅ for chatbot
// // //       availableSlots: availableSlots // ✅ for frontend (your old code)
// // //     });

// // //   } catch (err) {
// // //     console.error("Slot Error:", err);

// // //     // 🔥 FINAL FALLBACK (never crash)
// // //     const fallbackSlots = [
// // //       "10:00 AM", "10:30 AM",
// // //       "11:00 AM", "11:30 AM",
// // //       "12:00 PM", "12:30 PM",
// // //       "01:00 PM", "01:30 PM"
// // //     ];

// // //     res.json({
// // //       success: true,
// // //       slots: fallbackSlots,
// // //       availableSlots: fallbackSlots
// // //     });
// // //   }
// // // };


// // // import AppointmentModel from "../models/appointmentSchema.js";

// // // export const getAvailableSlots = async (req, res) => {
// // //   try {
// // //     const { doctorName, doctorId, date } = req.query;

// // //     if ((!doctorName && !doctorId) || !date) {
// // //       return res.json({
// // //         success: false,
// // //         message: "doctorName/doctorId and date required",
// // //       });
// // //     }

// // //     let bookedTimes = [];

// // //     try {
// // //       const query = doctorId
// // //         ? { doctorId, slotDate: date }
// // //         : { doctorName, slotDate: date };

// // //       const booked = await AppointmentModel.find(query);
// // //       bookedTimes = booked.map(item => item.slotTime);

// // //     } catch (err) {
// // //       console.log("⚠️ DB issue, fallback mode");
// // //     }

// // //     // 🟢 Generate slots
// // //     let slots = [];

// // //     for (let h = 10; h < 21; h++) {
// // //       const hour12 = h > 12 ? h - 12 : h;
// // //       const ampm = h >= 12 ? "PM" : "AM";

// // //       slots.push(`${hour12}:00 ${ampm}`);
// // //       slots.push(`${hour12}:30 ${ampm}`);
// // //     }

// // //     const availableSlots = slots.filter(
// // //       slot => !bookedTimes.includes(slot)
// // //     );

// // //     res.json({
// // //       success: true,
// // //       slots: availableSlots,
// // //       availableSlots
// // //     });

// // //   } catch (error) {
// // //     console.error("Slot Error:", error);

// // //     res.json({
// // //       success: true,
// // //       slots: ["10:00 AM", "11:00 AM"],
// // //       availableSlots: ["10:00 AM", "11:00 AM"]
// // //     });
// // //   }
// // // };



// // // // ✅ GET USER APPOINTMENTS
// // // export const getMyAppointments = async (req, res) => {
// // //   try {
// // //     const appointments = await AppointmentModel.find({
// // //       userId: req.userId
// // //     }).populate("doctorId");

// // //     res.json({ success: true, appointments });
// // //   } catch (err) {
// // //     res.json({ success: false, message: err.message });
// // //   }
// // // };

// // // // ✅ CANCEL
// // // export const cancelAppointment = async (req, res) => {
// // //   try {
// // //     await AppointmentModel.findByIdAndDelete(req.params.id);
// // //     res.json({ success: true, message: "Cancelled" });
// // //   } catch (err) {
// // //     res.json({ success: false, message: err.message });
// // //   }
// // // };


// // import AppointmentModel from "../models/appointmentSchema.js";

// // // ================= BOOK APPOINTMENT =================
// // export const bookAppointment = async (req, res) => {
// //   try {
// //     const userId = req.userId;

// //     const {
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       slotDate,
// //       slotTime,
// //     } = req.body;

// //     const appointment = await AppointmentModel.create({
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       userId,
// //       slotDate,
// //       slotTime,
// //       bookedAt: new Date(),
// //     });

// //     res.json({
// //       success: true,
// //       message: "Appointment booked successfully",
// //       appointment,
// //     });
// //   } catch (error) {
// //     // Duplicate slot booking
// //     if (error.code === 11000) {
// //       return res.json({
// //         success: false,
// //         message: "This slot is already booked. Please choose another slot.",
// //       });
// //     }

// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= AVAILABLE SLOTS =================
// // export const getAvailableSlots = async (req, res) => {
// //   try {
// //     const { doctorId, doctorName, date } = req.query;

// //     if ((!doctorId && !doctorName) || !date) {
// //       return res.json({
// //         success: false,
// //         message: "doctorId/doctorName and date required",
// //       });
// //     }

// //     const query = doctorId
// //       ? { doctorId, slotDate: date }
// //       : { doctorName, slotDate: date };

// //     const bookedAppointments = await AppointmentModel.find(query);

// //     const bookedTimes = bookedAppointments.map((item) => item.slotTime);

// //     let slots = [];

// //     for (let h = 10; h < 21; h++) {
// //       const hour12 = h > 12 ? h - 12 : h;
// //       const ampm = h >= 12 ? "PM" : "AM";

// //       slots.push(`${hour12}:00 ${ampm}`);
// //       slots.push(`${hour12}:30 ${ampm}`);
// //     }

// //     const availableSlots = slots.filter(
// //       (slot) => !bookedTimes.includes(slot)
// //     );

// //     res.json({
// //       success: true,
// //       availableSlots,
// //     });
// //   } catch (error) {
// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= MY APPOINTMENTS =================
// // export const getMyAppointments = async (req, res) => {
// //   try {
// //     const appointments = await AppointmentModel.find({
// //       userId: req.userId,
// //     })
// //       .populate("doctorId")
// //       .sort({ createdAt: -1 });

// //     res.json({
// //       success: true,
// //       appointments,
// //     });
// //   } catch (error) {
// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= CANCEL =================
// // export const cancelAppointment = async (req, res) => {
// //   try {
// //     await AppointmentModel.findByIdAndDelete(req.params.id);

// //     res.json({
// //       success: true,
// //       message: "Appointment cancelled",
// //     });
// //   } catch (error) {
// //     console.log(error);

// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };






// import AppointmentModel from "../models/appointmentSchema.js";
// import userModel from "../models/userModel.js";


// // ================= BOOK APPOINTMENT =================
// // export const bookAppointment = async (req, res) => {
// //   try {
// //     const userId = req.userId;

// //     const {
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       slotDate,
// //       slotTime,
// //     } = req.body;

// //     const existing = await AppointmentModel.findOne({
// //       doctorId,
// //       slotDate,
// //       slotTime,
// //       status: { $in: ["pending", "accepted"] },
// //     });

// //     if (existing) {
// //       if (existing.status === "pending") {
// //         return res.json({
// //           success: false,
// //           message:
// //             "This slot is booked by another user. If cancelled, it will become available.",
// //         });
// //       }

// //       return res.json({
// //         success: false,
// //         message: "This slot is already booked.",
// //       });
// //     }

// //     const user = await userModel.findById(userId);

// //     const appointment = await AppointmentModel.create({
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,

// //       userId,
// //       userName: user.name,
// //       userEmail: user.email,
// //       userPhone: user.phone || "",
// //       userAddress: user.address || "",

// //       slotDate,
// //       slotTime,

// //       status: "pending",
// //     });

// //     res.json({
// //       success: true,
// //       message: "Appointment booked successfully",
// //       appointment,
// //     });
// //   } catch (error) {
// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const bookAppointment = async (req, res) => {
// //   try {
// //     const {
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       userId,
// //       userName,
// //       slotDate,
// //       slotTime,
// //       userPhone,
// //       userAddress,
// //       userEmail,
// //     } = req.body;

// //     // check conflict
// //     const existing = await AppointmentModel.findOne({
// //       doctorId,
// //       slotDate,
// //       slotTime,
// //       status: { $in: ["pending", "accepted"] },
// //     });

// //     if (existing) {
// //       return res.json({
// //         success: false,
// //         message:
// //           existing.status === "pending"
// //             ? "Slot is already booked and pending approval"
// //             : "Slot is already accepted by doctor",
// //       });
// //     }

// //     const appointment = await AppointmentModel.create({
// //       doctorId,
// //       doctorName,
// //       speciality,
// //       fees,
// //       userId,
// //       userName,
// //       userPhone,
// //       userEmail,
// //       userAddress,
// //       slotDate,
// //       slotTime,
// //       status: "pending",
// //     });

// //     res.json({ success: true, appointment });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };


// export const bookAppointment = async (req, res) => {
//   try {
//     const { doctorId, slotDate, slotTime } = req.body;

//     // check conflict
//     const existing = await AppointmentModel.findOne({
//       doctorId,
//       slotDate,
//       slotTime,
//       status: { $in: ["pending", "accepted"] },
//     });

//     if (existing) {
//       return res.json({
//         success: false,
//         message:
//           existing.status === "pending"
//             ? "Slot is already booked (pending approval)"
//             : "Slot already accepted by doctor",
//       });
//     }

//     const appointment = await AppointmentModel.create({
//       ...req.body,
//       status: "pending",
//     });

//     res.json({ success: true, appointment });
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };


// // ================= USER APPOINTMENTS =================
// export const getMyAppointments = async (req, res) => {
//   try {
//     const appointments = await AppointmentModel.find({
//       userId: req.userId,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       appointments,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= USER CANCEL =================
// export const cancelAppointment = async (req, res) => {
//   try {
//     const appointment = await AppointmentModel.findById(req.params.id);

//     if (!appointment) {
//       return res.json({
//         success: false,
//         message: "Appointment not found",
//       });
//     }

//     if (appointment.status === "accepted") {
//       return res.json({
//         success: false,
//         message: "Accepted appointment cannot be cancelled",
//       });
//     }

//     appointment.status = "cancelled_by_user";
//     await appointment.save();

//     res.json({
//       success: true,
//       message: "Cancelled",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= DOCTOR APPOINTMENTS =================
// export const getDoctorAppointments = async (req, res) => {
//   try {
//     const appointments = await AppointmentModel.find({
//       doctorId: req.doctorId,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       appointments,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= ACCEPT =================
// export const acceptAppointment = async (req, res) => {
//   try {
//     await AppointmentModel.findByIdAndUpdate(req.params.id, {
//       status: "accepted",
//     });

//     res.json({
//       success: true,
//       message: "Accepted",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= DOCTOR CANCEL =================
// export const doctorCancelAppointment = async (req, res) => {
//   try {
//     await AppointmentModel.findByIdAndUpdate(req.params.id, {
//       status: "cancelled_by_doctor",
//     });

//     res.json({
//       success: true,
//       message: "Cancelled by doctor",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// // GET AVAILABLE SLOTS
// export const getAvailableSlots = async (req, res) => {
//   try {
//     const { doctorId, date } = req.query;

//     const booked = await AppointmentModel.find({
//       doctorId,
//       slotDate: date,
//       status: { $ne: "cancelled" },
//     });

//     const bookedTimes = booked.map((a) => a.slotTime);

//     return res.json({
//       success: true,
//       availableSlots: bookedTimes, // frontend will compare
//     });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };







import AppointmentModel from "../models/appointmentSchema.js";
import User from "../models/userModel.js";
import Doctor from "../models/doctorsModel.js";


// ================= BOOK =================
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const { doctorId, slotDate, slotTime } = req.body;

    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    if (!user || !doctor) {
      return res.json({
        success: false,
        message: "User or doctor not found",
      });
    }

    const existing = await AppointmentModel.findOne({
      doctorId,
      slotDate,
      slotTime,
      status: { $in: ["pending", "accepted"] },
    });

    if (existing) {
      if (existing.status === "pending") {
        return res.json({
          success: false,
          message:
            "This slot is booked by another user. If cancelled, it will open again.",
        });
      }

      return res.json({
        success: false,
        message: "This slot is already booked",
      });
    }

    await AppointmentModel.create({
      doctorId,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      fees: doctor.fees,

      userId,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone || "",
      userAddress: user.address || "",

      slotDate,
      slotTime,
      status: "pending",
    });

    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= USER APPOINTMENTS =================
// export const getMyAppointments = async (req, res) => {
//   try {
//     const appointments = await AppointmentModel.find({
//       userId: req.userId,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       appointments,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    const doctorIds = appointments.map((item) => item.doctorId);

    const doctors = await Doctor.find({
      _id: { $in: doctorIds },
    }).select("name image speciality fees address");

    const doctorMap = {};

    doctors.forEach((doctor) => {
      doctorMap[doctor._id.toString()] = doctor;
    });

    const updatedAppointments = appointments.map((item) => ({
      ...item._doc,
      doctorId: doctorMap[item.doctorId] || null,
    }));

    res.json({
      success: true,
      appointments: updatedAppointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= USER CANCEL =================
export const cancelByUser = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.status === "accepted") {
      return res.json({
        success: false,
        message: "Doctor already accepted",
      });
    }

    appointment.status = "cancelled_by_user";
    await appointment.save();

    res.json({
      success: true,
      message: "Cancelled",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DOCTOR APPOINTMENTS =================
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({
      doctorId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= ACCEPT =================
export const acceptAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    appointment.status = "accepted";
    await appointment.save();

    res.json({
      success: true,
      message: "Accepted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// ================= CANCEL BY DOCTOR =================
export const cancelByDoctor = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);

    appointment.status = "cancelled_by_doctor";
    await appointment.save();

    res.json({
      success: true,
      message: "Cancelled by doctor",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};