// // // import jwt from "jsonwebtoken";

// // // const authUser = (req, res, next) => {
// // //   try {
// // //     const token = req.headers.token;

// // //     if (!token) {
// // //       return res.status(401).json({ success: false, message: "Not authorized" });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     req.userId = decoded.id;

// // //     next();
// // //   } catch (error) {
// // //     res.status(401).json({ success: false, message: "Invalid token" });
// // //   }
// // // };

// // // export default authUser;
// // // import jwt from "jsonwebtoken";

// // // const authUser = (req, res, next) => {
// // //   try {
// // //     const token = req.headers.token;

// // //     if (!token) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "Please login first"
// // //       });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     req.userId = decoded.id;

// // //     next();

// // //   } catch (error) {
// // //     res.status(401).json({
// // //       success: false,
// // //       message: "Invalid token"
// // //     });
// // //   }
// // // };

// // // export default authUser;



// // import jwt from "jsonwebtoken";

// // const authUser = (req, res, next) => {
// //   try {
// //     const token = req.headers.token;

// //     if (!token) {
// //       return res.json({ success: false, message: "Not authenticated" });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     req.user = {
// //       id: decoded.id,
// //       role: decoded.role,
// //     };

// //     next();
// //   } catch (error) {
// //     res.json({ success: false, message: error.message });
// //   }
// // };

// // export default authUser;




// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//   try {
//     const token = req.headers.token;

//     if (!token) {
//       return res.json({ success: false, message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser;


import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authUser;