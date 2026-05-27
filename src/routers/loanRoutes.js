import express from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
} from "../controllers/loanController.js";

const router = express.Router();

router.get("/", getAllLoans);
router.post("/", createLoan);
router.get("/:id", getLoanById);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;
