import express from "express";
import {
  createDiscipline,
  deleteDiscipline,
  getAllDisciplines,
  getDisciplineById,
  updateDiscipline,
} from "../controllers/disciplineController.js";

const router = express.Router();

router.get("/", getAllDisciplines);
router.post("/", createDiscipline);
router.get("/:id", getDisciplineById);
router.put("/:id", updateDiscipline);
router.delete("/:id", deleteDiscipline);

export default router;
