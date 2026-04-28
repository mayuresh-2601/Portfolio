import db from "../config/db.js";

/*
  PROJECT MODEL
  Uses mysql2 promise pool
  Async / Await pattern
*/

// ---------------- GET ALL PROJECTS ----------------

export const getAllProjects = async () => {

  try {

    const sql = `
      SELECT *
      FROM projects
      ORDER BY id DESC
    `;

    const [rows] =
      await db.query(sql);

    return rows;

  } catch (error) {

    console.error(
      "Error fetching projects:",
      error
    );

    throw error;

  }

};

// ---------------- ADD PROJECT ----------------

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

    const [result] =
      await db.query(sql, values);

    return result;

  } catch (error) {

    console.error(
      "Error adding project:",
      error
    );

    throw error;

  }

};

// ---------------- UPDATE PROJECT ----------------

export const updateProject = async (id, project) => {

  try {

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

      project.title,
      project.description,
      project.github,
      project.demo,
      project.image || null,
      id

    ];

    const [result] =
      await db.query(sql, values);

    return result;

  } catch (error) {

    console.error(
      "Error updating project:",
      error
    );

    throw error;

  }

};

// ---------------- DELETE PROJECT ----------------

export const deleteProject = async (id) => {

  try {

    const sql = `
      DELETE FROM projects
      WHERE id = ?
    `;

    const [result] =
      await db.query(sql, [id]);

    return result;

  } catch (error) {

    console.error(
      "Error deleting project:",
      error
    );

    throw error;

  }

};