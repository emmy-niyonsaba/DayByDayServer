import User from "../models/user.js";
import Salary from "../models/salary.js";

const allowedFields = [
  "user_id",
  "month",
  "year",
  "total_amount",
  "total_loans",
  "final_amount",
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

export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch salaries",
      error: error.message,
    });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch salary",
      error: error.message,
    });
  }
};

export const createSalary = async (req, res) => {
  try {
    const { user_id, month, year, total_amount, final_amount } = req.body;
    if (!user_id || !month || !year || !total_amount || !final_amount) {
      return res.status(400).json({
        message:
          "user_id, month, year, total_amount, and final_amount are required",
      });
    }

    const payload = pickFields(req.body);
    const salary = await Salary.create(payload);
    const createdSalary = await Salary.findByPk(salary.id, {
      include: includeUser,
    });

    res.status(201).json(createdSalary ?? salary);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create salary",
      error: error.message,
    });
  }
};

export const updateSalary = async (req, res) => {
  try {
    const salary = await Salary.findByPk(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update salary",
      });
    }

    await salary.update(payload);
    const updatedSalary = await Salary.findByPk(salary.id, {
      include: includeUser,
    });

    res.status(200).json(updatedSalary ?? salary);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update salary",
      error: error.message,
    });
  }
};

export const deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByPk(req.params.id);
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    await salary.destroy();
    res.status(200).json({ message: "Salary deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete salary",
      error: error.message,
    });
  }
};
