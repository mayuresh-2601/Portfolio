import db from "../config/db.js";

// ---------------- GET ALL SKILLS ----------------

export const getAllSkills = async () => {

  const sql = `
    SELECT *
    FROM skills
    ORDER BY id DESC
  `;

  try {

    const [rows] =
      await db.query(sql);

    return rows;

  } catch (error) {

    console.error(
      "Error fetching skills:",
      error
    );

    throw error;

  }

};

// ---------------- ADD SKILL ----------------

export const addSkill = async (name) => {

  const sql = `
    INSERT INTO skills (name)
    VALUES (?)
  `;

  try {

    const [result] =
      await db.query(sql, [name]);

    return result;

  } catch (error) {

    console.error(
      "Error adding skill:",
      error
    );

    throw error;

  }

};

// ---------------- DELETE SKILL ----------------

export const deleteSkill = async (id) => {

  const sql = `
    DELETE FROM skills
    WHERE id = ?
  `;

  try {

    const [result] =
      await db.query(sql, [id]);

    return result;

  } catch (error) {

    console.error(
      "Error deleting skill:",
      error
    );

    throw error;

  }

};