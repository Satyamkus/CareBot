// // // middleware/doctorAuth.js
// // import jwt from "jsonwebtoken";

// // const doctorAuth = async (req, res, next) => {
// //   try {
// //     const token = req.headers.token;

// //     if (!token) {
// //       return res.json({ success: false, message: "Not authorized" });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.doctorId = decoded.id;

// //     next();
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // export default doctorAuth;


// import jwt from "jsonwebtoken";

// const authDoctor = (req, res, next) => {
//   try {
//     const token = req.headers.token;

//     if (!token) {
//       return res.json({ success: false, message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "doctor") {
//       return res.json({
//         success: false,
//         message: "Doctor access only",
//       });
//     }

//     req.doctorId = decoded.id;
//     next();
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authDoctor;



import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      return res.json({ success: false, message: "Doctor access only" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;