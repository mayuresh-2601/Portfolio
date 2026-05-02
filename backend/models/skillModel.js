import db from "../config/db.js";

/*
  ADD SKILL
  name: string
  level: number (0–100)
*/

export const addSkill = async (
  name,
  level = 80
) => {

  try {

    /* Ensure level is valid */

    if (!level || level < 0) {
      level = 0;
    }

    if (level > 100) {
      level = 100;
    }

    const query = `
      INSERT INTO skills
      (name, level)
      VALUES (?, ?)
    `;

    const values = [
      name,
      level
    ];

    const [result] =
      await db.execute(
        query,
        values
      );

    return result;

  } catch (error) {

    console.error(
      "Add Skill Error:",
      error
    );

    throw error;

  }

};

/*
  GET ALL SKILLS
*/

export const getSkills =
  async () => {

    try {

      const query = `
        SELECT *
        FROM skills
        ORDER BY id DESC
      `;

      const [rows] =
        await db.execute(
          query
        );

      return rows;

    } catch (error) {

      console.error(
        "Get Skills Error:",
        error
      );

      throw error;

    }

  };

/*
  DELETE SKILL
*/

export const deleteSkill =
  async (id) => {

    try {

      const query =
        "DELETE FROM skills WHERE id = ?";

      const [result] =
        await db.execute(
          query,
          [id]
        );

      return result;

    } catch (error) {

      console.error(
        "Delete Skill Error:",
        error
      );

      throw error;

    }

  };