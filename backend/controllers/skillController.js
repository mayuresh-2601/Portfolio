import {
  getAllSkills,
  addSkill,
  deleteSkill
} from "../models/skillModel.js";

/*
  SKILL CONTROLLER
  Uses async/await
  Matches mysql2 promise model
*/

// ---------------- GET ALL SKILLS ----------------

export const fetchSkills = async (req, res) => {

  try {

    const skills =
      await getAllSkills();

    return res.status(200).json(
      skills
    );

  } catch (error) {

    console.error(
      "Fetch skills error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch skills"
    });

  }

};

// ---------------- CREATE SKILL ----------------

export const createSkill = async (req, res) => {

  try {

    const {
      name,
      level
    } = req.body;

    // Validate input

    if (!name || !name.trim()) {

      return res.status(400).json({
        message:
          "Skill name is required"
      });

    }

    const skillLevel =
      level || 80;

    const result =
      await addSkill(
        name,
        skillLevel
      );

    return res.status(201).json({
      message:
        "Skill added successfully",
      id:
        result.insertId
    });

  } catch (error) {

    console.error(
      "Create skill error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to add skill"
    });

  }

};

// ---------------- DELETE SKILL ----------------

export const removeSkill = async (req, res) => {

  try {

    const { id } =
      req.params;

    if (!id) {

      return res.status(400).json({
        message:
          "Skill ID is required"
      });

    }

    await deleteSkill(id);

    return res.status(200).json({
      message:
        "Skill deleted successfully"
    });

  } catch (error) {

    console.error(
      "Delete skill error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to delete skill"
    });

  }

};