import {
  getSkills,
  addSkill,
  deleteSkill
} from "../models/skillModel.js";

/*
========================================
GET ALL SKILLS
========================================
*/

export const fetchSkills = async (req, res) => {
  try {
    console.log("fetchSkills called");

    const skills = await getSkills();

    return res.status(200).json(skills || []);

  } catch (error) {
    console.error("Fetch skills error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch skills"
    });
  }
};

/*
========================================
CREATE SKILL
========================================
*/

export const createSkill = async (req, res) => {
  try {
    console.log("createSkill called");

    const { name, level } = req.body;

    /*
    VALIDATE NAME
    */

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    /*
    VALIDATE LEVEL
    */

    let skillLevel = parseInt(level);

    if (isNaN(skillLevel)) skillLevel = 80;
    if (skillLevel < 0) skillLevel = 0;
    if (skillLevel > 100) skillLevel = 100;

    /*
    SAVE TO DATABASE
    */

    const result = await addSkill(name.trim(), skillLevel);

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      id: result?.insertId || null
    });

  } catch (error) {
    console.error("Create skill error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add skill"
    });
  }
};

/*
========================================
DELETE SKILL
========================================
*/

export const removeSkill = async (req, res) => {
  try {
    console.log("removeSkill called");

    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid Skill ID is required"
      });
    }

    await deleteSkill(id);

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully"
    });

  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete skill"
    });
  }
};