import User from "../models/user.js";
import UserCategory from "../models/userCategory.js";

const userInclude = [
  {
    model: UserCategory,
    attributes: ["id", "category_name"],
  },
];

const allowedFields = [
  "username",
  "name",
  "email",
  "password",
  "telephone",
  "category_id",
  "is_active",
];

const pickUserFields = (payload) =>
  allowedFields.reduce((selected, field) => {
    if (payload[field] !== undefined) {
      selected[field] = payload[field];
    }

    return selected;
  }, {});

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "ASC"]],
      include: userInclude,
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: userInclude,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, name, email, password, telephone, category_id } =
      req.body;

    if (
      !username ||
      !name ||
      !email ||
      !password ||
      !telephone ||
      !category_id
    ) {
      return res.status(400).json({
        message:
          "username, name, email, password, telephone, and category_id are required",
      });
    }

    const user = await User.create({
      username,
      name,
      email,
      password,
      telephone,
      category_id,
      is_active: req.body.is_active ?? true,
    });

    res.status(201).json("user created successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = pickUserFields(req.body);
    await user.update(payload);

    const updatedUser = await User.findByPk(user.id, {
      include: userInclude,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.update({
      is_active: false,
    });

    const updatedUser = await User.findByPk(user.id, {
      include: userInclude,
    });

    res.status(200).json("User deactivated successfully");
  } catch (error) {
    res.status(500).json({
      message: "Failed to deactivate user",
      error: error.message,
    });
  }
};
