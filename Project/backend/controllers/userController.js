// // // // import User from "../models/userModel.js";
// // // // import bcrypt from "bcrypt";
// // // // import jwt from "jsonwebtoken";

// // // // const createToken = (id) => {
// // // //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// // // // };

// // // // // SIGNUP
// // // // // export const registerUser = async (req, res) => {
// // // // //   try {
// // // // //     const { name, email, password } = req.body;

// // // // //     const exist = await User.findOne({ email });
// // // // //     if (exist) return res.json({ success: false, message: "User exists" });

// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     const user = await User.create({ name, email, password: hashedPassword });

// // // // //     const token = createToken(user._id);

// // // // //     res.json({ success: true, token });
// // // // //   } catch (error) {
// // // // //     res.json({ success: false, message: error.message });
// // // // //   }
// // // // // };



// // // // // LOGIN
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });
// // // //     if (!user) return res.json({ success: false, message: "User not found" });

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch) return res.json({ success: false, message: "Invalid password" });

// // // //     const token = createToken(user._id);

// // // //     res.json({ success: true, token });
// // // //   } catch (error) {
// // // //     res.json({ success: false, message: error.message });
// // // //   }
// // // // };

// // // // // GET PROFILE
// // // // export const getProfile = async (req, res) => {
// // // //   const user = await User.findById(req.userId).select("-password");
// // // //   res.json({ success: true, user });
// // // // };

// // // // // UPDATE PROFILE
// // // // export const updateProfile = async (req, res) => {
// // // //   const updated = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
// // // //   res.json({ success: true, user: updated });
// // // // };


// // // // import User from "../models/userModel.js";
// // // // import bcrypt from "bcrypt";
// // // // import jwt from "jsonwebtoken";

// // // // // 🔹 create token
// // // // const createToken = (id) => {
// // // //   return jwt.sign({ id }, process.env.JWT_SECRET, {
// // // //     expiresIn: "7d",
// // // //   });
// // // // };

// // // // // 🔹 SIGNUP
// // // // export const registerUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password } = req.body;

// // // //     const exist = await User.findOne({ email });
// // // //     if (exist) {
// // // //       return res.json({ success: false, message: "User already exists" });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     const user = await User.create({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //     });

// // // //     const token = createToken(user._id);

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //     });

// // // //   } catch (error) {
// // // //     res.json({
// // // //       success: false,
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };

// // // // // 🔹 LOGIN
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });

// // // //     if (!user) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "User not found",
// // // //       });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);

// // // //     if (!isMatch) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Invalid password",
// // // //       });
// // // //     }

// // // //     const token = createToken(user._id);

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //     });

// // // //   } catch (error) {
// // // //     res.json({
// // // //       success: false,
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };

// // // // // 🔹 GET PROFILE
// // // // export const getProfile = async (req, res) => {
// // // //   const user = await User.findById(req.userId).select("-password");
// // // //   res.json({ success: true, user });
// // // // };

// // // // // 🔹 UPDATE PROFILE
// // // // export const updateProfile = async (req, res) => {
// // // //   const updated = await User.findByIdAndUpdate(
// // // //     req.userId,
// // // //     req.body,
// // // //     { new: true }
// // // //   );
// // // //   res.json({ success: true, user: updated });
// // // // };



// // // // import User from "../models/userModel.js";
// // // // import bcrypt from "bcrypt";
// // // // import jwt from "jsonwebtoken";

// // // // // token
// // // // const createToken = (id, role) => {
// // // //   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
// // // //     expiresIn: "7d",
// // // //   });
// // // // };



// // // // // ===================== REGISTER PATIENT =====================
// // // // export const registerUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password } = req.body;

// // // //     const exist = await User.findOne({ email });
// // // //     if (exist) {
// // // //       return res.json({ success: false, message: "User already exists" });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     const user = await User.create({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //     });

// // // //     const token = createToken(user._id, "patient");

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //       role: "patient",
// // // //       user,
// // // //     });
// // // //   } catch (error) {
// // // //     res.json({ success: false, message: error.message });
// // // //   }
// // // // };





// // // // // ===================== LOGIN PATIENT =====================
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });

// // // //     if (!user) {
// // // //       return res.json({ success: false, message: "User not found" });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);

// // // //     if (!isMatch) {
// // // //       return res.json({ success: false, message: "Invalid password" });
// // // //     }

// // // //     const token = createToken(user._id, "patient");

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //       role: "patient",
// // // //       user,
// // // //     });
// // // //   } catch (error) {
// // // //     res.json({ success: false, message: error.message });
// // // //   }
// // // // };



// // // // // ===================== PROFILE =====================
// // // // export const getProfile = async (req, res) => {
// // // //   const user = await User.findById(req.user.id).select("-password");

// // // //   res.json({
// // // //     success: true,
// // // //     user,
// // // //     role: req.user.role,
// // // //   });
// // // // };



// // // // // ===================== UPDATE =====================
// // // // export const updateProfile = async (req, res) => {
// // // //   const updated = await User.findByIdAndUpdate(
// // // //     req.user.id,
// // // //     req.body,
// // // //     { new: true }
// // // //   );

// // // //   res.json({ success: true, user: updated });
// // // // };


// // // import User from "../models/userModel.js";
// // // import bcrypt from "bcrypt";
// // // import jwt from "jsonwebtoken";
// // // import Doctor from "../models/doctorsModel.js";

// // // // TOKEN
// // // const createToken = (id, role) => {
// // //   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
// // //     expiresIn: "7d",
// // //   });
// // // };

// // // // ================= REGISTER PATIENT =================
// // // // export const registerUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password } = req.body;

// // // //     const exist = await User.findOne({ email });
// // // //     if (exist) {
// // // //       return res.json({ success: false, message: "User already exists" });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     const user = await User.create({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //     });

// // // //     const token = createToken(user._id, "patient");

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //       role: "patient",
// // // //       user,
// // // //     });
// // // //   } catch (error) {
// // // //     res.json({ success: false, message: error.message });
// // // //   }
// // // // };




// // // // ================= REGISTER =================
// // // export const registerUser = async (req, res) => {
// // //   try {
// // //     const { name, email, password, role } = req.body;

// // //     // 🔴 DOCTOR REGISTRATION
// // //     if (role === "doctor") {
// // //       const existDoctor = await Doctor.findOne({ email });
// // //       if (existDoctor) {
// // //         return res.json({ success: false, message: "Doctor already exists" });
// // //       }

// // //       const hashed = await bcrypt.hash(password, 10);

// // //       const doctor = await doctor.create({
// // //         name,
// // //         email,
// // //         password: hashed,
// // //         speciality: "General",
// // //         degree: "",
// // //         experience: "",
// // //         about: "",
// // //         fees: 0,
// // //         address: {},
// // //         image: "",
// // //         date: Date.now()
// // //       });

// // //       const token = createToken(doctor._id, "doctor");

// // //       return res.json({
// // //         success: true,
// // //         token,
// // //         role: "doctor",
// // //         user: doctor
// // //       });
// // //     }

// // //     // 🔵 PATIENT REGISTRATION
// // //     const existUser = await User.findOne({ email });
// // //     if (existUser) {
// // //       return res.json({ success: false, message: "User already exists" });
// // //     }

// // //     const hashed = await bcrypt.hash(password, 10);

// // //     const user = await User.create({
// // //       name,
// // //       email,
// // //       password: hashed,
// // //     });

// // //     const token = createToken(user._id, "patient");

// // //     res.json({
// // //       success: true,
// // //       token,
// // //       role: "patient",
// // //       user
// // //     });

// // //   } catch (error) {
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // ================= LOGIN PATIENT =================
// // // // export const loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });

// // // //     if (!user) {
// // // //       return res.json({ success: false, message: "User not found" });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);

// // // //     if (!isMatch) {
// // // //       return res.json({ success: false, message: "Invalid password" });
// // // //     }

// // // //     const token = createToken(user._id, "patient");

// // // //     res.json({
// // // //       success: true,
// // // //       token,
// // // //       role: "patient",
// // // //       user,
// // // //     });
// // // //   } catch (error) {
// // // //     res.json({ success: false, message: error.message });
// // // //   }
// // // // };


// // // export const loginUser = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     let user = await User.findOne({ email });
// // //     let role = "patient";

// // //     if (!user) {
// // //       user = await Doctor.findOne({ email });
// // //       role = "doctor";
// // //     }

// // //     if (!user) {
// // //       return res.json({ success: false, message: "User not found" });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, user.password);

// // //     if (!isMatch) {
// // //       return res.json({ success: false, message: "Invalid password" });
// // //     }

// // //     const token = createToken(user._id, role);

// // //     res.json({
// // //       success: true,
// // //       token,
// // //       role,
// // //       user
// // //     });

// // //   } catch (error) {
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // ================= PROFILE =================
// // // export const getProfile = async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.user.id).select("-password");

// // //     res.json({
// // //       success: true,
// // //       user,
// // //       role: req.user.role,
// // //     });
// // //   } catch (error) {
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // // ================= UPDATE =================
// // // export const updateProfile = async (req, res) => {
// // //   try {
// // //     const updated = await User.findByIdAndUpdate(
// // //       req.user.id,
// // //       req.body,
// // //       { new: true }
// // //     );

// // //     res.json({ success: true, user: updated });
// // //   } catch (error) {
// // //     res.json({ success: false, message: error.message });
// // //   }
// // // };



// // import User from "../models/userModel.js";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";

// // const createToken = (id, role) => {
// //   return jwt.sign({ id, role }, process.env.JWT_SECRET);
// // };


// // // ================= REGISTER PATIENT =================
// // export const registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     const exists = await User.findOne({ email });

// //     if (exists) {
// //       return res.json({
// //         success: false,
// //         message: "User already exists",
// //       });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: "patient",
// //     });

// //     const token = createToken(user._id, "patient");

// //     res.json({
// //       success: true,
// //       token,
// //       role: "patient",
// //     });
// //   } catch (error) {
// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// // // ================= LOGIN PATIENT =================
// // export const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.json({
// //         success: false,
// //         message: "Invalid credentials",
// //       });
// //     }

// //     const token = createToken(user._id, "patient");

// //     res.json({
// //       success: true,
// //       token,
// //       role: "patient",
// //     });
// //   } catch (error) {
// //     res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= PROFILE =================
// // export const getProfile = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select("-password");

// //     res.json({
// //       success: true,
// //       user,
// //       // role: req.user.role,
// //     });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // // ================= UPDATE =================
// // export const updateProfile = async (req, res) => {
// //   try {
// //     const updated = await User.findByIdAndUpdate(
// //       req.user.id,
// //       req.body,
// //       { new: true }
// //     );

// //     res.json({ success: true, user: updated });
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };


// import User from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const createToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ================= REGISTER PATIENT =================
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });

//     if (exists) {
//       return res.json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "patient",
//     });

//     const token = createToken(user._id, "patient");

//     res.json({
//       success: true,
//       token,
//       role: "patient",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= LOGIN PATIENT =================
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const token = createToken(user._id, "patient");

//     res.json({
//       success: true,
//       token,
//       role: "patient",
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// ================= PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user: updated,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { welcomeEmail, otpEmail, resetPasswordEmail } from "../utils/emailTemplates.js";

const createToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// TEMP OTP STORE (use Redis in production)
const otpStore = {};

// ================= SIGNUP =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      data: { name, email, password },
    };

    await sendEmail(email, "Verify OTP - CareBot", otpEmail(otp));

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ================= VERIFY OTP =================
export const verifyUserOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore[email];
    if (!record)
      return res.json({ success: false, message: "OTP expired" });

    if (record.otp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    if (Date.now() > record.expires)
      return res.json({ success: false, message: "OTP expired" });

    const hashed = await bcrypt.hash(record.data.password, 10);

    const user = await User.create({
      name: record.data.name,
      email,
      password: hashed,
      role: "patient",
    });

    delete otpStore[email];

    await sendEmail(email, "Welcome to CareBot", welcomeEmail(user.name));

    const token = createToken(user._id, "patient");

    res.json({ success: true, token, role: "patient" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.json({ success: false, message: "Wrong password" });

    const token = createToken(user._id, "patient");

    res.json({ success: true, token, role: "patient" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      reset: true,
    };

    await sendEmail(email, "Reset Password OTP", resetPasswordEmail(otp));

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = otpStore[email];

    if (!record || record.otp !== otp)
      return res.json({ success: false, message: "Invalid OTP" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hashed });

    delete otpStore[email];

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

