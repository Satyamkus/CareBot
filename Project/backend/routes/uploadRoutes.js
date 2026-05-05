import express from "express";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadImage);

export default router;