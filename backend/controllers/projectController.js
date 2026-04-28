import {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject
} from "../models/projectModel.js";

/*
  PROJECT CONTROLLER
  Async / Await pattern
  Compatible with mysql2 promise
*/

// ---------------- GET ALL PROJECTS ----------------

export const fetchProjects = async (req, res) => {

  try {

    const projects =
      await getAllProjects();

    return res.status(200).json(
      projects
    );

  } catch (error) {

    console.error(
      "Fetch projects error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to fetch projects"
    });

  }

};

// ---------------- CREATE PROJECT ----------------

export const createProject = async (req, res) => {

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
        message:
          "Title and description are required"
      });

    }

    // Handle uploaded image

    const project = {

      title,
      description,
      github,
      demo,

      image: req.file
        ? req.file.filename
        : null

    };

    const result =
      await addProject(project);

    return res.status(201).json({

      message:
        "Project added successfully",

      id:
        result.insertId

    });

  } catch (error) {

    console.error(
      "Create project error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to add project"
    });

  }

};

// ---------------- UPDATE PROJECT ----------------

export const updateProjectById = async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      description,
      github,
      demo
    } = req.body;

    // Validate input

    if (!id) {

      return res.status(400).json({
        message:
          "Project ID is required"
      });

    }

    if (!title || !description) {

      return res.status(400).json({
        message:
          "Title and description are required"
      });

    }

    // Handle uploaded image

    const project = {

      title,
      description,
      github,
      demo,

      image: req.file
        ? req.file.filename
        : null

    };

    await updateProject(
      id,
      project
    );

    return res.status(200).json({

      message:
        "Project updated successfully"

    });

  } catch (error) {

    console.error(
      "Update project error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to update project"
    });

  }

};

// ---------------- DELETE PROJECT ----------------

export const removeProject = async (req, res) => {

  try {

    const { id } =
      req.params;

    if (!id) {

      return res.status(400).json({
        message:
          "Project ID is required"
      });

    }

    await deleteProject(id);

    return res.status(200).json({

      message:
        "Project deleted successfully"

    });

  } catch (error) {

    console.error(
      "Delete project error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to delete project"
    });

  }

};