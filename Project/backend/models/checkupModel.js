import mongoose from "mongoose";

const checkupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    userName: String,
    userEmail: String,

    category: String,
    checkupName: String,

    doctorName: String,
    fees: Number,
    duration: Number,

    queueNumber: Number,

    slotDate: String,
    slotStart: String,
    slotEnd: String,

    startDateTime: Date,
    endDateTime: Date,
    reportDateTime: Date,

    status: {
      type: String,
      enum: [
        "booked",
        "checkup_done",
        "report_generated",
      ],
      default: "booked",
    },

    remarks: {
      type: String,
      default: "",
    },

    reportSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const checkupModel =
  mongoose.models.checkup ||
  mongoose.model("checkup", checkupSchema);

export default checkupModel;