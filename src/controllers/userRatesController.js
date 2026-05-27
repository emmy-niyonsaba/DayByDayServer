import User from "../models/user.js";
import UserRate from "../models/userRates.js";

const allowedFields = ["user_id", "rate", "payment_type"];

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

export const getAllUserRates = async (req, res) => {
  try {
    const userRates = await UserRate.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(userRates);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user rates",
      error: error.message,
    });
  }
};

export const getUserRateById = async (req, res) => {
  try {
    const userRate = await UserRate.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!userRate) {
      return res.status(404).json({ message: "User rate not found" });
    }

    res.status(200).json(userRate);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user rate",
      error: error.message,
    });
  }
};

export const createUserRate = async (req, res) => {
  try {
    const { user_id, rate, payment_type } = req.body;
    if (!user_id || !rate || !payment_type) {
      return res.status(400).json({
        message: "user_id, rate, and payment_type are required",
      });
    }

    const payload = pickFields(req.body);
    const userRate = await UserRate.create(payload);
    const createdUserRate = await UserRate.findByPk(userRate.id, {
      include: includeUser,
    });

    res.status(201).json(createdUserRate ?? userRate);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user rate",
      error: error.message,
    });
  }
};

export const updateUserRate = async (req, res) => {
  try {
    const userRate = await UserRate.findByPk(req.params.id);
    if (!userRate) {
      return res.status(404).json({ message: "User rate not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update user rate",
      });
    }

    await userRate.update(payload);
    const updatedUserRate = await UserRate.findByPk(userRate.id, {
      include: includeUser,
    });

    res.status(200).json(updatedUserRate ?? userRate);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user rate",
      error: error.message,
    });
  }
};

export const deleteUserRate = async (req, res) => {
  try {
    const userRate = await UserRate.findByPk(req.params.id);
    if (!userRate) {
      return res.status(404).json({ message: "User rate not found" });
    }

    await userRate.destroy();
    res.status(200).json({ message: "User rate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user rate",
      error: error.message,
    });
  }
};
