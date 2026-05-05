// // import mongoose from "mongoose"
// // const appointmentSchema = new mongoose.Schema({
// //   doctorId: String,
// //   doctorName: String,
// //   speciality: String,
// //   fees: Number,

// //   userId: String,
// //   userName: String,

// //   slotDate: Date,
// //   slotTime: String,

// //   bookedAt: Date
// // })

// // export default mongoose.model("Appointment", appointmentSchema)



import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
    },

    doctorName: String,
    speciality: String,
    fees: Number,

    userId: {
      type: String,
      required: true,
    },

    userName: String,
    userEmail: String,
    userPhone: String,
    userAddress: String,

    slotDate: {
      type: String,
      required: true,
    },

    slotTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "cancelled_by_user",
        "cancelled_by_doctor",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const AppointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default AppointmentModel;


// models/appointmentModel.js



// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema(
//   {
//     doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     userName: String,
//     userEmail: String,
//     userPhone: String,
//     userAddress: String,

//     slotDate: String,
//     slotTime: String,

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "accepted",
//         "rejected_by_doctor",
//         "cancelled_by_user",
//       ],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Appointment", appointmentSchema);