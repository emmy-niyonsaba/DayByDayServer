import User from "../models/user.js";
import Loan from "../models/loan.js";

const allowedFields = ["user_id", "amount", "reason", "is_paid"];

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

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch loans",
      error: error.message,
    });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch loan",
      error: error.message,
    });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { user_id, amount, reason } = req.body;
    if (!user_id || !amount || !reason) {
      return res.status(400).json({
        message: "user_id, amount, and reason are required",
      });
    }

    const payload = pickFields(req.body);
    const loan = await Loan.create(payload);
    const createdLoan = await Loan.findByPk(loan.id, {
      include: includeUser,
    });

    res.status(201).json(createdLoan ?? loan);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create loan",
      error: error.message,
    });
  }
};

export const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update loan",
      });
    }

    await loan.update(payload);
    const updatedLoan = await Loan.findByPk(loan.id, {
      include: includeUser,
    });

    res.status(200).json(updatedLoan ?? loan);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update loan",
      error: error.message,
    });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    await loan.destroy();
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete loan",
      error: error.message,
    });
  }
};
