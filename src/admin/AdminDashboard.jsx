/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import api from "../api/axios";
import { Trash2, Plus, Upload } from "lucide-react";

function AdminDashboard() {

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
    imageFile: null
  });

  const [skillName, setSkillName] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- LOGOUT ----------------

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  // ---------------- LOAD DATA ----------------

  const loadData = async () => {

    try {

      setInitialLoading(true);

      const [projectsRes, skillsRes] =
        await Promise.all([
          api.get("/api/projects"),
          api.get("/api/skills")
        ]);

      setProjects(projectsRes.data);
      setSkills(skillsRes.data);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to load data"
      );

    } finally {

      setInitialLoading(false);

    }

  };

  // ---------------- INPUT CHANGE ----------------

  const handleProjectChange = (e) => {

    const { name, value } = e.target;

    setProjectForm({
      ...projectForm,
      [name]: value
    });

  };

  // ---------------- FILE UPLOAD ----------------

  const handleFileUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setProjectForm({
      ...projectForm,
      imageFile: file
    });

  };

  // ---------------- ADD PROJECT ----------------

  const addProject = async () => {

    if (!projectForm.title.trim()) {

      alert("Enter project title");
      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", projectForm.title);
      formData.append("description", projectForm.description);
      formData.append("github", projectForm.github);
      formData.append("demo", projectForm.demo);

      if (projectForm.imageFile) {

        formData.append(
          "image",
          projectForm.imageFile
        );

      }

      await api.post(
        "/api/projects",
        formData
      );

      alert("Project added successfully");

      setProjectForm({
        title: "",
        description: "",
        github: "",
        demo: "",
        imageFile: null
      });

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Project failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // ---------------- DELETE PROJECT ----------------

  const deleteProject = async (id) => {

    if (!window.confirm("Delete project?"))
      return;

    try {

      await api.delete(
        `/api/projects/${id}`
      );

      alert("Project deleted");

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  // ---------------- ADD SKILL ----------------

  const addSkill = async () => {

    if (!skillName.trim()) {

      alert("Enter skill name");
      return;

    }

    try {

      await api.post(
        "/api/skills",
        {
          name: skillName
        }
      );

      alert("Skill added");

      setSkillName("");

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Skill failed"
      );

    }

  };

  // ---------------- DELETE SKILL ----------------

  const deleteSkill = async (id) => {

    if (!window.confirm("Delete skill?"))
      return;

    try {

      await api.delete(
        `/api/skills/${id}`
      );

      alert("Skill deleted");

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  return (

    <section className="bg-slate-900 text-white min-h-screen p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

        {initialLoading && (
          <p className="text-gray-400">
            Loading dashboard...
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-10">

          {/* PROJECT SECTION */}

          <div className="bg-slate-800 p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-semibold">
              Add Project
            </h2>

            <input
              type="text"
              name="title"
              value={projectForm.title}
              onChange={handleProjectChange}
              placeholder="Project Title"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleProjectChange}
              placeholder="Project Description"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
              type="text"
              name="github"
              value={projectForm.github}
              onChange={handleProjectChange}
              placeholder="GitHub Link"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
              type="text"
              name="demo"
              value={projectForm.demo}
              onChange={handleProjectChange}
              placeholder="Live Demo Link"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <label className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded cursor-pointer">

              <Upload size={18} />

              Upload Image

              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

            </label>

            <button
              onClick={addProject}
              disabled={loading}
              className="bg-green-500 px-4 py-2 rounded disabled:opacity-50"
            >
              <Plus size={18} />
              {loading ? "Adding..." : "Add Project"}
            </button>

            <div className="space-y-2 mt-4">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="flex justify-between bg-slate-700 p-3 rounded"
                >

                  <p className="font-medium">
                    {project.title}
                  </p>

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* SKILLS SECTION */}

          <div className="bg-slate-800 p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-semibold">
              Add Skill
            </h2>

            <input
              type="text"
              value={skillName}
              onChange={(e) =>
                setSkillName(e.target.value)
              }
              placeholder="Skill Name"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <button
              onClick={addSkill}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              <Plus size={18} />
              Add Skill
            </button>

            <div className="space-y-2 mt-4">

              {skills.map((skill) => (

                <div
                  key={skill.id}
                  className="flex justify-between bg-slate-700 p-3 rounded"
                >

                  <p>{skill.name}</p>

                  <button
                    onClick={() =>
                      deleteSkill(skill.id)
                    }
                    className="text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default AdminDashboard;