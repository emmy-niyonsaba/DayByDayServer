import UserCategory from "../models/userCategory.js";

const allowedFields = ["category_name"];

const pickFields = (payload) =>
  allowedFields.reduce((selected, field) => {
    if (payload[field] !== undefined) {
      selected[field] = payload[field];
    }

    return selected;
  }, {});

export const getAllUserCategories = async (req, res) => {
  try {
    const userCategories = await UserCategory.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(userCategories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user categories",
      error: error.message,
    });
  }
};

export const getUserCategoryById = async (req, res) => {
  try {
    const userCategory = await UserCategory.findByPk(req.params.id);
    if (!userCategory) {
      return res.status(404).json({ message: "User category not found" });
    }

    res.status(200).json(userCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user category",
      error: error.message,
    });
  }
};

export const createUserCategory = async (req, res) => {
  try {
    if (!req.body.category_name) {
      return res.status(400).json({ message: "category_name is required" });
    }

    const payload = pickFields(req.body);
    const userCategory = await UserCategory.create(payload);
    const createdUserCategory = await UserCategory.findByPk(userCategory.id);

    res.status(201).json(createdUserCategory ?? userCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user category",
      error: error.message,
    });
  }
};

export const updateUserCategory = async (req, res) => {
  try {
    const userCategory = await UserCategory.findByPk(req.params.id);
    if (!userCategory) {
      return res.status(404).json({ message: "User category not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update user category",
      });
    }

    await userCategory.update(payload);
    const updatedUserCategory = await UserCategory.findByPk(userCategory.id);

    res.status(200).json(updatedUserCategory ?? userCategory);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user category",
      error: error.message,
    });
  }
};

export const deleteUserCategory = async (req, res) => {
  try {
    const userCategory = await UserCategory.findByPk(req.params.id);
    if (!userCategory) {
      return res.status(404).json({ message: "User category not found" });
    }

    await userCategory.destroy();
    res.status(200).json({ message: "User category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user category",
      error: error.message,
    });
  }
};
