import {
  getAllProjects,
  addProject,
  deleteProject
} from "../models/projectModel.js";

// ---------------- GET ALL PROJECTS ----------------

export const fetchProjects = (req, res) => {

  try {

    getAllProjects((err, results) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Failed to fetch projects"
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

// ---------------- CREATE PROJECT ----------------

export const createProject = (req, res) => {

  try {

    const {
      title,
      description,
      github,
      demo
    } = req.body;

    // Validate input

    if (!title || !description) {

      return res.status(400).json({
        message: "Title and description are required"
      });

    }

    // Get uploaded image filename

    const project = {

      title,

      description,

      github,

      demo,

      image: req.file
        ? req.file.filename
        : null

    };

    addProject(project, (err) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to add project"
        });

      }

      res.status(201).json({
        message: "Project added successfully"
      });

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

// ---------------- DELETE PROJECT ----------------

export const removeProject = (req, res) => {

  try {

    const id = req.params.id;

    if (!id) {

      return res.status(400).json({
        message: "Project ID is required"
      });

    }

    deleteProject(id, (err) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to delete project"
        });

      }

      res.status(200).json({
        message: "Project deleted successfully"
      });

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};