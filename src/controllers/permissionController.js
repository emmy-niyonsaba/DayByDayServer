import User from "../models/user.js";
import Permission from "../models/permissions.js";

const allowedFields = [
  "leave_time",
  "return_time",
  "title",
  "status",
  "description",
  "user_id",
];

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

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch permissions",
      error: error.message,
    });
  }
};

export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch permission",
      error: error.message,
    });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { leave_time, return_time, title, description, user_id } = req.body;
    if (!leave_time || !return_time || !title || !description || !user_id) {
      return res.status(400).json({
        message:
          "leave_time, return_time, title, description, and user_id are required",
      });
    }

    const payload = pickFields(req.body);
    const permission = await Permission.create(payload);
    const createdPermission = await Permission.findByPk(permission.id, {
      include: includeUser,
    });

    res.status(201).json(createdPermission ?? permission);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create permission",
      error: error.message,
    });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update permission",
      });
    }

    await permission.update(payload);
    const updatedPermission = await Permission.findByPk(permission.id, {
      include: includeUser,
    });

    res.status(200).json(updatedPermission ?? permission);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update permission",
      error: error.message,
    });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);

    if (!permission) {
      return res.status(404).json({
        message: "Permission not found",
      });
    }

    await permission.update({
      status: "canceled",
    });

    const updatedPermission = await Permission.findByPk(permission.id, {
      include: includeUser,
    });

    res.status(200).json(updatedPermission);

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete permission",
      error: error.message,
    });
  }
};
