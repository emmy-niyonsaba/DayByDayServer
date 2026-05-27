import express from "express";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.get("/:id", getAttendanceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
