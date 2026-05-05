// // // controllers/doctorController.js
// // import Appointment from "../models/appointmentModel.js";

// // // GET all appointments for doctor
// // export const getDoctorAppointments = async (req, res) => {
// //   try {
// //     const doctorId = req.doctorId;

// //     const appointments = await Appointment.find({ doctorId });

// //     res.json({ success: true, appointments });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ACCEPT appointment
// // export const acceptAppointment = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const appt = await Appointment.findById(id);

// //     if (!appt) return res.json({ success: false, message: "Not found" });

// //     if (appt.status !== "pending") {
// //       return res.json({ success: false, message: "Already processed" });
// //     }

// //     appt.status = "accepted";
// //     await appt.save();

// //     res.json({ success: true, message: "Appointment accepted" });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // CANCEL by doctor
// // export const cancelAppointmentByDoctor = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const appt = await Appointment.findById(id);

// //     if (!appt) return res.json({ success: false, message: "Not found" });

// //     appt.status = "rejected_by_doctor";
// //     await appt.save();

// //     res.json({ success: true, message: "Cancelled by doctor" });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };


// import Appointment from "../models/appointmentModel.js";

// // GET DOCTOR APPOINTMENTS
// export const getDoctorAppointments = async (req, res) => {
//   try {
//     const doctorId = req.user.id;

//     const appointments = await Appointment.find({ doctorId });

//     res.json({ success: true, appointments });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // ACCEPT APPOINTMENT
// export const acceptAppointment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const appt = await Appointment.findById(id);

//     if (!appt) {
//       return res.json({ success: false, message: "Not found" });
//     }

//     if (appt.status !== "pending") {
//       return res.json({ success: false, message: "Already processed" });
//     }

//     appt.status = "accepted";
//     await appt.save();

//     res.json({ success: true, message: "Accepted" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // CANCEL BY DOCTOR
// export const cancelAppointmentByDoctor = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const appt = await Appointment.findById(id);

//     if (!appt) {
//       return res.json({ success: false, message: "Not found" });
//     }

//     appt.status = "cancelled_by_doctor";
//     await appt.save();

//     res.json({ success: true, message: "Cancelled by doctor" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// import Doctor from "../models/doctorsModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const createToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET);
// };


// // ================= REGISTER DOCTOR =================
// export const registerDoctor = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await Doctor.findOne({ email });

//     if (exists) {
//       return res.json({
//         success: false,
//         message: "Doctor already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const doctor = await Doctor.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "doctor",
//     });

//     const token = createToken(doctor._id, "doctor");

//     res.json({
//       success: true,
//       token,
//       role: "doctor",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // ================= LOGIN DOCTOR =================
// export const loginDoctor = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const doctor = await Doctor.findOne({ email });

//     if (!doctor) {
//       return res.json({
//         success: false,
//         message: "Doctor not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, doctor.password);

//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const token = createToken(doctor._id, "doctor");

//     res.json({
//       success: true,
//       token,
//       role: "doctor",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// GET DOCTOR PROFILE
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.userId).select("-password");

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE DOCTOR PROFILE
export const updateDoctorProfile = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      doctor: updatedDoctor,
      message: "Doctor profile updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



import Doctor from "../models/doctorsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { welcomeEmail, otpEmail, resetPasswordEmail } from "../utils/emailTemplates.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// temp OTP store (use Redis in production)
const otpStore = {};

// ================= REGISTER DOCTOR =================
export const registerDoctor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Doctor.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "Doctor already exists",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      data: { name, email, password },
    };

    await sendEmail(email, "Doctor OTP Verification", otpEmail(otp));

    res.json({
      success: true,
      message: "OTP sent to doctor email",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= VERIFY DOCTOR OTP =================
export const verifyDoctorOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];

    if (!record) {
      return res.json({ success: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > record.expires) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const hashed = await bcrypt.hash(record.data.password, 10);

    const doctor = await Doctor.create({
      name: record.data.name,
      email,
      password: hashed,
      role: "doctor",
    });

    delete otpStore[email];

    await sendEmail(email, "Welcome to CareBot", welcomeEmail(doctor.name));

    const token = createToken(doctor._id, "doctor");

    res.json({
      success: true,
      token,
      role: "doctor",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LOGIN DOCTOR =================
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(doctor._id, "doctor");

    res.json({
      success: true,
      token,
      role: "doctor",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotDoctorPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      reset: true,
    };

    await sendEmail(email, "Reset Password OTP", resetPasswordEmail(otp));

    res.json({
      success: true,
      message: "OTP sent for password reset",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetDoctorPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = otpStore[email];

    if (!record || record.otp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await Doctor.findOneAndUpdate({ email }, { password: hashed });

    delete otpStore[email];

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
