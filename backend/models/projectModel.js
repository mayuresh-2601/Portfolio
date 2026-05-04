/* eslint-disable preserve-caught-error */
import db from "../config/db.js";

export const getAllProjects = async () => {
  try {
    const sql = `
      SELECT *
      FROM projects
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(sql);

    return rows || [];

  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error(error.message || "Failed to fetch projects");
  }
};


export const getProjectById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const sql = `
      SELECT *
      FROM projects
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [id]);

    return rows && rows.length ? rows[0] : null;

  } catch (error) {
    console.error("Error fetching project by ID:", error);
    throw new Error(error.message || "Failed to fetch project");
  }
};

export const addProject = async (project) => {
  try {
    const sql = `
      INSERT INTO projects
      (
        title,
        description,
        github,
        demo,
        image
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      project.title || "",
      project.description || "",
      project.github || "",
      project.demo || "",
      project.image || null
    ];

    const [result] = await db.execute(sql, values);

    return result || null;

  } catch (error) {
    console.error("Error adding project:", error);
    throw new Error(error.message || "Failed to add project");
  }
};

export const updateProject = async (id, project) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const sql = `
      UPDATE projects
      SET
        title = ?,
        description = ?,
        github = ?,
        demo = ?,
        image = COALESCE(?, image)
      WHERE id = ?
    `;

    const values = [
      project.title || "",
      project.description || "",
      project.github || "",
      project.demo || "",
      project.image || null,
      id
    ];

    const [result] = await db.execute(sql, values);

    return result || null;

  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(error.message || "Failed to update project");
  }
};

export const deleteProject = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const sql = `
      DELETE FROM projects
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [id]);

    return result || null;

  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error(error.message || "Failed to delete project");
  }
};