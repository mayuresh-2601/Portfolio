import db from "../config/db.js";

// GET ALL PROJECTS

export const getAllProjects = async () => {

  const sql = `
    SELECT *
    FROM projects
    ORDER BY id DESC
  `;

  try {

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

// ADD PROJECT

export const addProject = async (project) => {

  const sql = `
    INSERT INTO projects
    (title, description, github, demo, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [

    project.title,
    project.description,
    project.github,
    project.demo,
    project.image

  ];

  try {

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

// DELETE PROJECT

export const deleteProject = async (id) => {

  const sql = `
    DELETE FROM projects
    WHERE id = ?
  `;

  try {

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