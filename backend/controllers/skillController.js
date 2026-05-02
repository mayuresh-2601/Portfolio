import {
  getSkills,
  addSkill,
  deleteSkill
} from "../models/skillModel.js";

/*
  SKILL CONTROLLER
  Handles:
  - Fetch skills
  - Create skill with level
  - Delete skill
*/

/* ---------------- GET ALL SKILLS ---------------- */

export const fetchSkills = async (req, res) => {

  try {

    console.log("fetchSkills called");

    const skills =
      await getSkills();

    return res
      .status(200)
      .json(skills);

  } catch (error) {

    console.error(
      "Fetch skills error:",
      error
    );

    return res
      .status(500)
      .json({
        message:
          "Failed to fetch skills"
      });

  }

};

/* ---------------- CREATE SKILL ---------------- */

export const createSkill = async (req, res) => {

  try {

    console.log("createSkill called");

    const {
      name,
      level
    } = req.body;

    /* Validate name */

    if (!name || !name.trim()) {

      return res
        .status(400)
        .json({
          message:
            "Skill name is required"
        });

    }

    /* Validate level */

    let skillLevel =
      parseInt(level);

    if (isNaN(skillLevel)) {

      skillLevel = 80;

    }

    if (skillLevel < 0) {

      skillLevel = 0;

    }

    if (skillLevel > 100) {

      skillLevel = 100;

    }

    /* Save to database */

    const result =
      await addSkill(
        name.trim(),
        skillLevel
      );

    console.log(
      "Skill saved:",
      name,
      skillLevel
    );

    return res
      .status(201)
      .json({

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

    return res
      .status(500)
      .json({
        message:
          "Failed to add skill"
      });

  }

};

/* ---------------- DELETE SKILL ---------------- */

export const removeSkill = async (req, res) => {

  try {

    console.log("removeSkill called");

    const { id } =
      req.params;

    if (!id) {

      return res
        .status(400)
        .json({
          message:
            "Skill ID is required"
        });

    }

    await deleteSkill(id);

    console.log(
      "Skill deleted:",
      id
    );

    return res
      .status(200)
      .json({

        message:
          "Skill deleted successfully"

      });

  } catch (error) {

    console.error(
      "Delete skill error:",
      error
    );

    return res
      .status(500)
      .json({
        message:
          "Failed to delete skill"
      });

  }

};