import {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  getProjectById
} from "../models/projectModel.js";

// ================= GET =================
export const fetchProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch projects"
    });
  }
};

// ================= CREATE =================
export const createProject = async (req, res) => {
  try {
    const { title, description, github, demo } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image upload is required"
      });
    }

    // ✅ IMPORTANT: multer-storage-cloudinary already uploaded it
    const imageUrl = req.file.path; // secure_url

    const project = {
      title: title.trim(),
      description: description.trim(),
      github: github || "",
      demo: demo || "",
      image: imageUrl
    };

    const dbResult = await addProject(project);

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      id: dbResult?.insertId || null
    });

  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({
      message: error.message || "Failed to add project"
    });
  }
};

// ================= UPDATE =================
export const updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, github, demo } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Project ID is required"
      });
    }

    let existingProject = await getProjectById(id);
    if (Array.isArray(existingProject)) {
      existingProject = existingProject[0];
    }

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    let imageUrl = existingProject.image;

    // ✅ only update if new image uploaded
    if (req.file) {
      imageUrl = req.file.path; // already cloudinary URL
    }

    const project = {
      title: title.trim(),
      description: description.trim(),
      github: github || "",
      demo: demo || "",
      image: imageUrl
    };

    await updateProject(id, project);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully"
    });

  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({
      message: error.message || "Failed to update project"
    });
  }
};

// ================= DELETE =================
export const removeProject = async (req, res) => {
  try {
    const { id } = req.params;

    let project = await getProjectById(id);
    if (Array.isArray(project)) {
      project = project[0];
    }

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    await deleteProject(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      message: error.message || "Failed to delete project"
    });
  }
};