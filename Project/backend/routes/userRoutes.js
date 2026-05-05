// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getProfile,
//   updateProfile,
// } from "../controllers/userController.js";
// import authUser from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", authUser, getProfile);
// router.post("/update", authUser, updateProfile);

// export default router;



// import express from "express";
// import { registerUser, loginUser,getProfile,updateProfile } from "../controllers/userController.js";
// import authUser from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", authUser, getProfile);
// router.post("/update", authUser, updateProfile);



// export default router;



import express from "express";
import authUser from "../middlewares/authMiddleware.js";

import {
  registerUser,
  verifyUserOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

// AUTH FLOW
router.post("/register", registerUser);          // send OTP
router.post("/verify-otp", verifyUserOtp);      // verify OTP + create user
router.post("/login", loginUser);

// PASSWORD RESET
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// PROFILE
router.get("/profile", authUser, getProfile);
router.post("/update", authUser, updateProfile);

export default router;