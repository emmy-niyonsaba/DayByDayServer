import express from "express";
import {
  createUserRate,
  getAllUserRates,
  getUserRateById,
  updateUserRate,
} from "../controllers/userRatesController.js";

const router = express.Router();

router.get("/", getAllUserRates);
router.post("/", createUserRate);
router.get("/:id", getUserRateById);
router.put("/:id", updateUserRate);

export default router;
