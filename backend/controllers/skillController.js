import {
  getAllSkills,
  addSkill,
  deleteSkill
} from "../models/skillModel.js";

// ---------------- GET ALL SKILLS ----------------

export const fetchSkills = (req, res) => {

  try {

    getAllSkills((err, results) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to fetch skills"
        });

      }

      res.status(200).json(results);

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

// ---------------- CREATE SKILL ----------------

export const createSkill = (req, res) => {

  try {

    const {
      name,
      level
    } = req.body;

    // Validate input

    if (!name || !name.trim()) {

      return res.status(400).json({
        message: "Skill name is required"
      });

    }

    // Default level if not provided

    const skillLevel = level || 80;

    addSkill(
      name,
      skillLevel,
      (err) => {

        if (err) {

          console.error(err);

          return res.status(500).json({
            message: "Failed to add skill"
          });

        }

        res.status(201).json({
          message: "Skill added successfully"
        });

      }
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

// ---------------- DELETE SKILL ----------------

export const removeSkill = (req, res) => {

  try {

    const id = req.params.id;

    if (!id) {

      return res.status(400).json({
        message: "Skill ID is required"
      });

    }

    deleteSkill(id, (err) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to delete skill"
        });

      }

      res.status(200).json({
        message: "Skill deleted successfully"
      });

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};