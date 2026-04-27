import db from "../config/db.js";

/*
  SKILL MODEL
  Uses mysql2 promise pool
  Returns clean async results
*/

// ---------------- GET ALL SKILLS ----------------

export const getAllSkills = async () => {

  try {

    const sql = `
      SELECT *
      FROM skills
      ORDER BY id DESC
    `;

    const [rows] = await db.query(sql);

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

  try {

    const sql = `
      INSERT INTO skills (name)
      VALUES (?)
    `;

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

  try {

    const sql = `
      DELETE FROM skills
      WHERE id = ?
    `;

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