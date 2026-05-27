import express from "express";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
} from "../controllers/permissionController.js";

const router = express.Router();

router.get("/", getAllPermissions);
router.post("/", createPermission);
router.get("/:id", getPermissionById);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;
