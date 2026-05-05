import PDFDocument from "pdfkit";
import checkupModel from "../models/checkupModel.js";
import userModel from "../models/userModel.js";
import { sendCheckupReportEmail } from "../utils/sendCheckupReportEmail.js";

const CHECKUPS = {
  xray: {
    category: "Radiology",
    duration: 30,
    fees: 500,
    doctorName: "Dr. Arvind Sharma",
  },

  ultrasound: {
    category: "Radiology",
    duration: 40,
    fees: 900,
    doctorName: "Dr. Meera Gupta",
  },

  cbc: {
    category: "Pathology",
    duration: 80,
    fees: 400,
    doctorName: "Dr. Pooja Singh",
  },

  kft: {
    category: "Pathology",
    duration: 50,
    fees: 750,
    doctorName: "Dr. Rajesh Verma",
  },

  ct_scan: {
    category: "Radiology",
    duration: 150,
    fees: 3500,
    doctorName: "Dr. Vikram Sinha",
  },

  mri: {
    category: "Radiology",
    duration: 240,
    fees: 9500,
    doctorName: "Dr. Neha Kapoor",
  },

  blood_group: {
    category: "Pathology",
    duration: 1,
    fees: 250,
    doctorName: "Dr. Kavita Jain",
  },
};

const HOSPITAL_START = 8;
const HOSPITAL_END = 20;

const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

// const generateNextSlot = async (checkupName, duration) => {
//   const bookings = await checkupModel
//     .find({ checkupName })
//     .sort({ startDateTime: 1 });

//   let slotStart;

//   if (!bookings.length) {
//     slotStart = new Date();
//     slotStart.setHours(HOSPITAL_START, 0, 0, 0);

//     if (new Date() > slotStart) {
//       slotStart = new Date();
//     }
//   } else {
//     slotStart = new Date(bookings[bookings.length - 1].endDateTime);
//   }

//   while (true) {
//     const dayStart = new Date(slotStart);
//     dayStart.setHours(HOSPITAL_START, 0, 0, 0);

//     const dayEnd = new Date(slotStart);
//     dayEnd.setHours(HOSPITAL_END, 0, 0, 0);

//     const end = new Date(slotStart);
//     end.setMinutes(end.getMinutes() + duration);

//     if (end <= dayEnd) {
//       return {
//         slotStart,
//         slotEnd: end,
//         queueNumber: bookings.length + 1,
//       };
//     }

//     slotStart.setDate(slotStart.getDate() + 1);
//     slotStart.setHours(HOSPITAL_START, 0, 0, 0);
//   }
// };

const generateNextSlot = async (checkupName, duration) => {
  const bookings = await checkupModel
    .find({
      checkupName,
      status: { $in: ["booked", "checkup_done"] },
    })
    .sort({ startDateTime: 1 });

  let slotStart;

  // no active queue
  if (!bookings.length) {
    slotStart = new Date();
    slotStart.setMinutes(slotStart.getMinutes() + 20);

    const hospitalStart = new Date(slotStart);
    hospitalStart.setHours(HOSPITAL_START, 0, 0, 0);

    const hospitalEnd = new Date(slotStart);
    hospitalEnd.setHours(HOSPITAL_END, 0, 0, 0);

    // before hospital opens
    if (slotStart < hospitalStart) {
      slotStart = hospitalStart;
    }

    // after hospital closes → next day 8 AM
    if (slotStart >= hospitalEnd) {
      slotStart.setDate(slotStart.getDate() + 1);
      slotStart.setHours(HOSPITAL_START, 0, 0, 0);
    }
  } else {
    // active queue exists → next slot after last booking
    slotStart = new Date(bookings[bookings.length - 1].endDateTime);
  }

  while (true) {
    const dayEnd = new Date(slotStart);
    dayEnd.setHours(HOSPITAL_END, 0, 0, 0);

    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + duration);

    if (slotEnd <= dayEnd) {
      return {
        slotStart,
        slotEnd,
        queueNumber: bookings.length + 1,
      };
    }

    // move to next day
    slotStart.setDate(slotStart.getDate() + 1);
    slotStart.setHours(HOSPITAL_START, 0, 0, 0);
  }
};

export const getAllCheckups = async (req, res) => {
  try {
    const list = Object.entries(CHECKUPS).map(([key, value]) => ({
      key,
      ...value,
    }));

    res.json({
      success: true,
      checkups: list,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const bookCheckup = async (req, res) => {
  try {
    const { checkupName } = req.body;

    if (!CHECKUPS[checkupName]) {
      return res.json({
        success: false,
        message: "Invalid checkup",
      });
    }
    const activeBooking = await checkupModel.findOne({
      userId: req.userId,
      status: { $in: ["booked", "checkup_done"] },
    });
    
    if (activeBooking) {
      return res.json({
        success: false,
        message:
          "You already have an active checkup. Please wait until your report is generated.",
        activeBooking,
      });
    }
    const user = await userModel.findById(req.userId);

    const checkup = CHECKUPS[checkupName];

    const slot = await generateNextSlot(
      checkupName,
      checkup.duration
    );

    const reportDate = new Date(slot.slotEnd);
    reportDate.setMinutes(reportDate.getMinutes() + 30);
    
    //   let reportDate;
    // if (checkupName === "blood_group") {
    //   const reportDate = new Date();
    //   reportDate.setMinutes(reportDate.getMinutes() + 1);
    //   slotDate.setMinutes(slotDate.getMinutes() + 1);
    // } else {
    //   const reportDate = new Date(slot.slotEnd);
    //   reportDate.setMinutes(reportDate.getMinutes() + 30);
    // }

    
    const booking = await checkupModel.create({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,

      category: checkup.category,
      checkupName,

      doctorName: checkup.doctorName,
      fees: checkup.fees,
      duration: checkup.duration,

      queueNumber: slot.queueNumber,

      slotDate: slot.slotStart.toISOString().split("T")[0],
      slotStart: formatTime(slot.slotStart),
      slotEnd: formatTime(slot.slotEnd),

      startDateTime: slot.slotStart,
      endDateTime: slot.slotEnd,
      reportDateTime: reportDate,
    });
    if (checkupName === "blood_group") {
      await sendCheckupReportEmail(booking);
    
      booking.status = "report_generated";
      booking.reportSent = true;
      await booking.save();
    }
    res.json({
      success: true,
      message: "Checkup booked",
      booking,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserCheckups = async (req, res) => {
  try {
    const checkups = await checkupModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      checkups,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getCheckupQueue = async (req, res) => {
  try {
    const { checkupName } = req.params;

    const queue = await checkupModel
      .find({
        checkupName,
        status: "booked",
      })
      .sort({ startDateTime: 1 });

    const liveQueue = queue.map((item, index) => ({
      ...item._doc,
      liveQueueNumber: index + 1,
    }));

    res.json({
      success: true,
      queueCount: liveQueue.length,
      queue: liveQueue,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateCheckupStatuses = async () => {
//   const now = new Date();

//   const booked = await checkupModel.find({
//     status: "booked",
//   });

//   for (const item of booked) {
//     if (now >= item.endDateTime) {
//       item.status = "checkup_done";
//       await item.save();
//     }
//   }

//   const done = await checkupModel.find({
//     status: "checkup_done",
//   });

//   // for (const item of done) {
//   //   if (now >= item.reportDateTime) {
//   //     item.status = "report_generated";
//   //     await item.save();
//   //   }
//   // }

//   const reports = await checkupModel.find({
//     status: "report_generated",
//     reportSent: false,
//   });
  
//   for (const item of reports) {
//     await sendCheckupReportEmail(item);
//     item.reportSent = true;
//     await item.save();
//   }
// };

export const updateCheckupStatuses = async () => {
  try {
    const now = new Date();

    // 1. booked -> checkup_done
    const booked = await checkupModel.find({
      status: "booked",
    });

    for (const item of booked) {
      if (now >= item.endDateTime) {
        item.status = "checkup_done";
        await item.save();
      }
    }
    const pendingReports = await checkupModel.find({
      status: { $in: ["booked", "checkup_done"] },
    });
    
    for (const item of pendingReports) {
      if (now >= item.reportDateTime) {
        item.status = "report_generated";
        await item.save();
      }
    }
    
    // 2. checkup_done -> report_generated
    // Uses reportDateTime already saved during booking
    // blood_group can have 2 min report time
    // other tests can have 30 min (or whatever you saved)
    const done = await checkupModel.find({
      status: "checkup_done",
    });

    for (const item of done) {
      if (now >= item.reportDateTime) {
        item.status = "report_generated";
        await item.save();
      }
    }

    // 3. Send report mail only once
    const reports = await checkupModel.find({
      status: "report_generated",
      reportSent: false,
    });

    for (const item of reports) {
      await sendCheckupReportEmail(item);
      item.reportSent = true;
      await item.save();
    }
  } catch (error) {
    console.log("updateCheckupStatuses error:", error.message);
  }
};


export const getCheckupPreview = async (req, res) => {
  try {
    const { checkupName } = req.params;

    if (!CHECKUPS[checkupName]) {
      return res.json({
        success: false,
        message: "Invalid checkup",
      });
    }

    const checkup = CHECKUPS[checkupName];

    const queue = await checkupModel
      .find({
        checkupName,
        status: "booked",
      })
      .sort({ startDateTime: 1 });

    const slot = await generateNextSlot(
      checkupName,
      checkup.duration
    );

    const reportTime = new Date(slot.slotEnd);
    reportTime.setMinutes(reportTime.getMinutes() + 30);

    res.json({
      success: true,
      queueCount: queue.length,
      nextSlotDate: slot.slotStart.toISOString().split("T")[0],
      nextSlotStart: formatTime(slot.slotStart),
      nextSlotEnd: formatTime(slot.slotEnd),
      expectedReportTime: formatTime(reportTime),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};