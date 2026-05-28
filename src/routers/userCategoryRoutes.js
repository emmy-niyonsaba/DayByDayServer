import express from "express";
import {
  createUserCategory,
  getAllUserCategories,
  getUserCategoryById,
  updateUserCategory,
} from "../controllers/userCategoryController.js";

const router = express.Router();

router.get("/", getAllUserCategories);
router.post("/", createUserCategory);
router.get("/:id", getUserCategoryById);
router.put("/:id", updateUserCategory);

export default router;
