import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectById
} from "../models/projectModel.js";

/*
========================================
RESOLVE DIRECTORY
========================================
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const uploadsPath =
  path.join(
    __dirname,
    "..",
    "uploads"
  );

/*
========================================
GET ALL PROJECTS
========================================
*/

export const fetchProjects = async (
  req,
  res
) => {

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

/*
========================================
CREATE PROJECT
========================================
*/

export const createProject = async (
  req,
  res
) => {

  try {

    console.log(
      "createProject called"
    );

    const {
      title,
      description,
      github,
      demo
    } = req.body;

    if (
      !title ||
      !description
    ) {

      return res.status(400).json({
        message:
          "Title and description are required"
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message:
          "Image upload is required"
      });

    }

    const project = {

      title:
        title.trim(),

      description:
        description.trim(),

      github:
        github || "",

      demo:
        demo || "",

      image:
        req.file.filename

    };

    const result =
      await addProject(project);

    console.log(
      "Project saved:",
      result.insertId
    );

    return res.status(201).json({

      success: true,
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

/*
========================================
UPDATE PROJECT
(Delete old image if new one uploaded)
========================================
*/

export const updateProjectById = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      description,
      github,
      demo
    } = req.body;

    if (!id) {

      return res.status(400).json({
        message:
          "Project ID is required"
      });

    }

    if (
      !title ||
      !description
    ) {

      return res.status(400).json({
        message:
          "Title and description are required"
      });

    }

    /*
    Get existing project
    */

    const existingProject =
      await getProjectById(id);

    if (!existingProject) {

      return res.status(404).json({
        message:
          "Project not found"
      });

    }

    /*
    Delete old image if new uploaded
    */

    if (
      req.file &&
      existingProject.image
    ) {

      const oldFilePath =
        path.join(
          uploadsPath,
          existingProject.image
        );

      if (
        fs.existsSync(oldFilePath)
      ) {

        fs.unlinkSync(
          oldFilePath
        );

        console.log(
          "Deleted old image:",
          existingProject.image
        );

      }

    }

    const project = {

      title:
        title.trim(),

      description:
        description.trim(),

      github:
        github || "",

      demo:
        demo || "",

      image:
        req.file
          ? req.file.filename
          : existingProject.image

    };

    await updateProject(
      id,
      project
    );

    return res.status(200).json({

      success: true,
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

/*
========================================
DELETE PROJECT
(Delete image from uploads folder)
========================================
*/

export const removeProject = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    if (!id) {

      return res.status(400).json({
        message:
          "Project ID is required"
      });

    }

    /*
    Get project first
    */

    const project =
      await getProjectById(id);

    if (!project) {

      return res.status(404).json({
        message:
          "Project not found"
      });

    }

    /*
    Delete image file
    */

    if (project.image) {

      const filePath =
        path.join(
          uploadsPath,
          project.image
        );

      if (
        fs.existsSync(filePath)
      ) {

        fs.unlinkSync(filePath);

        console.log(
          "Deleted project image:",
          project.image
        );

      }

    }

    /*
    Delete DB record
    */

    await deleteProject(id);

    return res.status(200).json({

      success: true,
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