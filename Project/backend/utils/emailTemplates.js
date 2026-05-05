export const welcomeEmail = (name) => `
  <div style="font-family:Arial;padding:20px">
    <h2>Welcome to CareBot 🏥</h2>
    <p>Hi <b>${name}</b>,</p>
    <p>Thank you for joining CareBot Health System.</p>
    <p>We are here to help you manage appointments easily.</p>
    <br/>
    <p style="color:gray">– CareBot Team</p>
  </div>
`;


export const otpEmail = (otp) => `
  <div style="font-family:Arial;padding:20px">
    <h2>Your OTP Code</h2>
    <p>Your OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP is valid for 10 minutes.</p>
  </div>
`;


export const resetPasswordEmail = (otp) => `
  <div style="font-family:Arial;padding:20px">
    <h2>Password Reset Request</h2>
    <p>Your reset OTP:</p>
    <h1>${otp}</h1>
    <p>Valid for 10 minutes.</p>
  </div>
`;

import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";

export const checkupReportEmail = (booking) => `
  <div style="font-family:Arial,sans-serif;background:#f7f9fc;padding:30px;">
    <div style="max-width:650px;margin:auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

      <div style="background:#1d4ed8;padding:20px 30px;color:white;">
        <h2 style="margin:0;">CareBot Diagnostic Report</h2>
        <p style="margin-top:6px;font-size:14px;opacity:.9;">
          Automated diagnostic report notification
        </p>
      </div>

      <div style="padding:30px;">
        <p style="font-size:15px;">Hello <b>${booking.userName}</b>,</p>

        <p style="font-size:14px;color:#374151;line-height:1.7;">
          Your diagnostic test report for 
          <b>${booking.checkupName.replace("_", " ")}</b> 
          has been generated successfully.
        </p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-top:20px;">
          <p style="margin:6px 0;"><b>Checkup:</b> ${booking.checkupName.replace("_", " ")}</p>
          <p style="margin:6px 0;"><b>Doctor:</b> ${booking.doctorName}</p>
          <p style="margin:6px 0;"><b>Booking Date:</b> ${booking.slotDate}</p>
          <p style="margin:6px 0;"><b>Slot:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
          <p style="margin:6px 0;"><b>Fees:</b> ₹${booking.fees}</p>
        </div>

        <p style="margin-top:22px;font-size:14px;color:#374151;">
          Please find the attached PDF report for your records.
        </p>

        <p style="margin-top:30px;font-size:13px;color:#6b7280;">
          Regards,<br/>
          <b>CareBot Diagnostic Centre</b>
        </p>
      </div>
    </div>
  </div>
`;