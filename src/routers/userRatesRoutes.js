import express from "express";
import {
  createUserRate,
  deleteUserRate,
  getAllUserRates,
  getUserRateById,
  updateUserRate,
} from "../controllers/userRatesController.js";

const router = express.Router();

router.get("/", getAllUserRates);
router.post("/", createUserRate);
router.get("/:id", getUserRateById);
router.put("/:id", updateUserRate);
router.delete("/:id", deleteUserRate);

export default router;
