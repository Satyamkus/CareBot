import express from "express";
import authUser from "../middlewares/authMiddleware.js";
import {
  getAllCheckups,
  bookCheckup,
  getUserCheckups,
  getCheckupPreview,
   updateCheckupStatuses
} from "../controllers/checkupController.js";

const checkupRouter = express.Router();

checkupRouter.get("/list", getAllCheckups);
checkupRouter.post("/book", authUser, bookCheckup);
checkupRouter.get("/my", authUser, getUserCheckups);
checkupRouter.get("/preview/:checkupName", getCheckupPreview);
export default checkupRouter;