import User from "../models/user.js";
import Discipline from "../models/discipline.js";

const allowedFields = ["title", "description", "attachment", "user_id"];

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

export const getAllDisciplines = async (req, res) => {
  try {
    const disciplines = await Discipline.findAll({
      order: [["id", "ASC"]],
      include: includeUser,
    });
    res.status(200).json(disciplines);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch disciplines",
      error: error.message,
    });
  }
};

export const getDisciplineById = async (req, res) => {
  try {
    const discipline = await Discipline.findByPk(req.params.id, {
      include: includeUser,
    });
    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch discipline",
      error: error.message,
    });
  }
};

export const createDiscipline = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    if (!title || !description || !user_id) {
      return res.status(400).json({
        message: "title, description, and user_id are required",
      });
    }

    const payload = pickFields(req.body);
    const discipline = await Discipline.create(payload);
    const createdDiscipline = await Discipline.findByPk(discipline.id, {
      include: includeUser,
    });

    res.status(201).json(createdDiscipline ?? discipline);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create discipline",
      error: error.message,
    });
  }
};

export const updateDiscipline = async (req, res) => {
  try {
    const discipline = await Discipline.findByPk(req.params.id);
    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    const payload = pickFields(req.body);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided to update discipline",
      });
    }

    await discipline.update(payload);
    const updatedDiscipline = await Discipline.findByPk(discipline.id, {
      include: includeUser,
    });

    res.status(200).json(updatedDiscipline ?? discipline);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update discipline",
      error: error.message,
    });
  }
};

export const deleteDiscipline = async (req, res) => {
  try {
    const discipline = await Discipline.findByPk(req.params.id);
    if (!discipline) {
      return res.status(404).json({ message: "Discipline not found" });
    }

    await discipline.destroy();
    res.status(200).json({ message: "Discipline deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete discipline",
      error: error.message,
    });
  }
};
