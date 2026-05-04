import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADD SKILL
router.post("/", async (req, res) => {
  try {
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Skill name is required" });
    }

    const query = "INSERT INTO skills (name, level) VALUES (?, ?)";
    const values = [name, level || 80];

    await db.execute(query, values);

    res.json({ message: "Skill added successfully" });
  } catch (error) {
    console.error("Add Skill Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET SKILLS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM skills ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Fetch Skills Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE SKILL
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute("DELETE FROM skills WHERE id = ?", [id]);

    res.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("Delete Skill Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;