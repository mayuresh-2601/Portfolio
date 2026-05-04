/* eslint-disable preserve-caught-error */
import db from "../config/db.js";


export const addSkill = async (name, level = 80) => {
  try {
    if (!name || !name.trim()) {
      throw new Error("Skill name is required");
    }

    let skillLevel = parseInt(level);

    if (isNaN(skillLevel)) skillLevel = 80;
    if (skillLevel < 0) skillLevel = 0;
    if (skillLevel > 100) skillLevel = 100;

    const query = `
      INSERT INTO skills
      (name, level)
      VALUES (?, ?)
    `;

    const values = [name.trim(), skillLevel];

    const [result] = await db.execute(query, values);

    return result || null;

  } catch (error) {
    console.error("Add Skill Error:", error);
    throw new Error(error.message || "Failed to add skill");
  }
};

export const getSkills = async () => {
  try {
    const query = `
      SELECT *
      FROM skills
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(query);

    return rows || [];

  } catch (error) {
    console.error("Get Skills Error:", error);
    throw new Error(error.message || "Failed to fetch skills");
  }
};


export const deleteSkill = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const query =
      "DELETE FROM skills WHERE id = ?";

    const [result] = await db.execute(query, [id]);

    return result || null;

  } catch (error) {
    console.error("Delete Skill Error:", error);
    throw new Error(error.message || "Failed to delete skill");
  }
};