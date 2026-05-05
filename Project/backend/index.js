import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import adminRouter from './routes/adminRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import checkupRouter from "./routes/checkupRoutes.js";
import { updateCheckupStatuses } from "./controllers/checkupController.js";
const app = express();
const port = 4000;

// DB Connections
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.1.26:5173"
  ]
}));

// Routes
app.use('/api/admin', adminRouter);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api", uploadRoutes);
app.use("/api/checkups", checkupRouter);







setInterval(async () => {
  await updateCheckupStatuses();
}, 6000);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Server Start
app.listen(port,'0.0.0.0' ,() => {
  console.log(`Server is running on port ${port}`);
});