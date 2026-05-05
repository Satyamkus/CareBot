// import PDFDocument from "pdfkit";
// import nodemailer from "nodemailer";
// import { checkupReportEmail } from "./emailTemplates.js";

// export const sendCheckupReportEmail = async (booking) => {
//   const doc = new PDFDocument({
//     margin: 50,
//     size: "A4",
//   });

//   const chunks = [];

//   doc.on("data", (chunk) => chunks.push(chunk));

//   // Header
//   doc
//     .fontSize(22)
//     .text("CareBot Diagnostic Centre", {
//       align: "center",
//     });

//   doc
//     .fontSize(11)
//     .text("Official Diagnostic Report", {
//       align: "center",
//     });

//   doc.moveDown(2);

//   // Patient details
//   doc.fontSize(13).text("Patient Information", {
//     underline: true,
//   });

//   doc.moveDown(0.5);

//   doc.fontSize(11);
//   doc.text(`Patient Name: ${booking.userName}`);
//   doc.text(`Email Address: ${booking.userEmail}`);
//   doc.text(`Booking Date: ${booking.slotDate}`);
//   doc.text(`Report Generated On: ${new Date().toLocaleString()}`);

//   doc.moveDown();

//   // Checkup details
//   doc.fontSize(13).text("Checkup Details", {
//     underline: true,
//   });

//   doc.moveDown(0.5);

//   doc.fontSize(11);
//   doc.text(`Checkup Name: ${booking.checkupName.replace("_", " ")}`);
//   doc.text(`Category: ${booking.category}`);
//   doc.text(`Assigned Doctor: ${booking.doctorName}`);
//   doc.text(`Fees Paid: ₹${booking.fees}`);
//   doc.text(`Slot Timing: ${booking.slotStart} - ${booking.slotEnd}`);

//   doc.moveDown();

//   // Findings
//   doc.fontSize(13).text("Diagnostic Summary", {
//     underline: true,
//   });

//   doc.moveDown(0.5);

//   doc.fontSize(11).text(
//     "The diagnostic procedure has been completed successfully. " +
//       "No critical abnormalities were detected during the preliminary evaluation. " +
//       "For detailed clinical interpretation, consult the assigned physician."
//   );

//   doc.moveDown(2);

//   doc.fontSize(10).text(
//     "This is a system-generated report issued by CareBot Diagnostic Centre.",
//     {
//       align: "center",
//     }
//   );

//   doc.end();

//   const pdfBuffer = await new Promise((resolve) => {
//     doc.on("end", () => resolve(Buffer.concat(chunks)));
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"CareBot Diagnostic Centre" <${process.env.EMAIL_USER}>`,
//     to: booking.userEmail,
//     subject: "Diagnostic Report for " + booking.checkupName.replace("_", " "),
//     html: checkupReportEmail(booking),
//     attachments: [
//       {
//         filename: `${booking.checkupName}-report.pdf`,
//         content: pdfBuffer,
//       },
//     ],
//   });
// };


import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

const getCheckupSpecificReport = (booking) => {
  switch (booking.checkupName) {
    case "blood_group":
      return {
        title: "Blood Group Analysis",
        lines: [
          "Blood Group: B+",
          "Rh Factor: Positive",
          "Observation: Normal blood grouping pattern detected.",
        ],
      };

    case "cbc":
      return {
        title: "Complete Blood Count (CBC)",
        lines: [
          "Hemoglobin: 13.8 g/dL",
          "WBC Count: 7,200 /µL",
          "RBC Count: 4.8 million /µL",
          "Platelets: 2.6 lakh /µL",
          "Observation: CBC parameters are within normal range.",
        ],
      };

    case "kft":
      return {
        title: "Kidney Function Test (KFT)",
        lines: [
          "Creatinine: 0.9 mg/dL",
          "Urea: 24 mg/dL",
          "Sodium: 139 mmol/L",
          "Potassium: 4.3 mmol/L",
          "Observation: Kidney function appears normal.",
        ],
      };

    case "xray":
      return {
        title: "X-Ray Report",
        lines: [
          "Area Examined: Chest PA View",
          "Findings: No focal consolidation seen.",
          "Cardiomediastinal silhouette is normal.",
          "Observation: No active cardiopulmonary abnormality detected.",
        ],
      };

    case "ultrasound":
      return {
        title: "Ultrasound Report",
        lines: [
          "Liver: Normal size and echotexture",
          "Gall Bladder: No calculi seen",
          "Kidneys: Normal size bilaterally",
          "Observation: No significant abnormality detected.",
        ],
      };

    case "ct_scan":
      return {
        title: "CT Scan Report",
        lines: [
          "Study: CT Brain Plain",
          "Findings: No acute intracranial hemorrhage.",
          "Ventricular system appears normal.",
          "Observation: No acute abnormality seen.",
        ],
      };

    case "mri":
      return {
        title: "MRI Report",
        lines: [
          "Study: MRI Lumbar Spine",
          "Disc spaces preserved.",
          "No focal cord compression seen.",
          "Observation: Mild degenerative changes only.",
        ],
      };

    default:
      return {
        title: "Diagnostic Report",
        lines: [
          "General diagnostic report generated successfully.",
          "No significant abnormality noted.",
        ],
      };
  }
};

export const sendCheckupReportEmail = async (booking) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  const chunks = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  const report = getCheckupSpecificReport(booking);

  // Header
  doc
    .fontSize(20)
    .text("CareBot Diagnostic Centre", {
      align: "center",
    });

  doc
    .fontSize(10)
    .text("Sector 62, Noida, Uttar Pradesh", {
      align: "center",
    });

  doc
    .text("support@carebot.com | +919120260312", {
      align: "center",
    });

  doc.moveDown();

  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown();

  // Report title
  doc
    .fontSize(16)
    .text(report.title, {
      align: "center",
    });

  doc.moveDown(1.5);

  // Patient details
  doc.fontSize(11);

  doc.text(`Patient Name: ${booking.userName}`);
  doc.text(`Patient Email: ${booking.userEmail}`);
  doc.text(`Checkup: ${booking.checkupName.replace("_", " ")}`);
  doc.text(`Category: ${booking.category}`);
  doc.text(`Consulting Doctor: ${booking.doctorName}`);
  doc.text(`Fees Paid: ₹${booking.fees}`);
  doc.text(`Booking Date: ${booking.slotDate}`);
  doc.text(`Time Slot: ${booking.slotStart} - ${booking.slotEnd}`);
  doc.text(
    `Report Generated On: ${new Date().toLocaleString()}`
  );

  doc.moveDown();

  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown();

  // Findings
  doc.fontSize(13).text("Clinical Findings", {
    underline: true,
  });

  doc.moveDown(0.7);

  doc.fontSize(11);

  report.lines.forEach((line) => {
    doc.text(`• ${line}`);
  });

  doc.moveDown(2);

  // Footer
  doc.text(
    "This is a computer-generated medical report issued by CareBot Diagnostic Centre."
  );

  doc.moveDown();

  doc.text("Authorized Signatory", {
    align: "right",
  });

  doc.end();

  const pdfBuffer = await new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CareBot Diagnostic Centre" <${process.env.SENDER_EMAIL}>`,
    to: booking.userEmail,
    subject: `Your ${booking.checkupName.replace("_", " ")} Report - CareBot`,
    html: `
      <div style="font-family:Arial;padding:20px;color:#333;">
        <h2 style="margin-bottom:8px;">CareBot Diagnostic Centre</h2>
        <p>Hello <b>${booking.userName}</b>,</p>

        <p>
          Your diagnostic report for
          <b>${booking.checkupName.replace("_", " ")}</b>
          has been generated successfully.
        </p>

        <p>
          Please find your report attached with this email.
        </p>

        <br/>

        <p><b>Checkup:</b> ${booking.checkupName.replace("_", " ")}</p>
        <p><b>Doctor:</b> ${booking.doctorName}</p>
        <p><b>Booking Date:</b> ${booking.slotDate}</p>
        <p><b>Slot:</b> ${booking.slotStart} - ${booking.slotEnd}</p>

        <br/>

        <p style="color:#666;">
          This is an automated email from CareBot Diagnostic Centre.
        </p>
      </div>
    `,
    attachments: [
      {
        filename: `${booking.checkupName}-report.pdf`,
        content: pdfBuffer,
      },
    ],
  });
};