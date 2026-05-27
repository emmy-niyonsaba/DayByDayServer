import express from "express";
import {
  createSalary,
  deleteSalary,
  getAllSalaries,
  getSalaryById,
  updateSalary,
} from "../controllers/salaryController.js";

const router = express.Router();

router.get("/", getAllSalaries);
router.post("/", createSalary);
router.get("/:id", getSalaryById);
router.put("/:id", updateSalary);
router.delete("/:id", deleteSalary);

export default router;
