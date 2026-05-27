import User from "../models/user.js";
import Attendance from "../models/attendance.js";

const allowedFields = ["user_id", "attendance"];

const pickFields = (payload) =>
  allowedFields.reduce((selected, field) => {
    if (payload[field] !== undefined) {
      selected[field] = payload[field];
    }

    return selected;
  }, {});

const includeUser = [
  {
    model: User,
    attributes: ["id", "username", "name", "email"],
  },
];

export const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
};

export const getAttendanceById = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance record",
      error: error.message,
    });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const { user_id, attendance } = req.body;
    if (!user_id || !attendance) {
      return res.status(400).json({
        message: "user_id and attendance are required",
      });
    }

    const payload = pickFields(req.body);
    const attendanceRecord = await Attendance.create(payload);
    const createdAttendance = await Attendance.findByPk(attendanceRecord.id, {
      include: includeUser,
    });

    res.status(201).json(createdAttendance ?? attendanceRecord);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findByPk(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update attendance",
      });
    }

    await attendanceRecord.update(payload);
    const updatedAttendance = await Attendance.findByPk(attendanceRecord.id, {
      include: includeUser,
    });

    res.status(200).json(updatedAttendance ?? attendanceRecord);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const attendanceRecord = await Attendance.findByPk(req.params.id);
    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    await attendanceRecord.destroy();
    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};
