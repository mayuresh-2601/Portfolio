/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import api from "../api/axios";
import { Trash2, Plus, Upload } from "lucide-react";

function AdminDashboard() {

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
    imageFile: null
  });

  const [certificateForm, setCertificateForm] = useState({
    title: "",
    issuer: "",
    link: "",
    imageFile: null
  });

  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(80);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  /*
  ================= LOAD DATA
  */

  const loadData = async () => {

    try {

      const [
        projectsRes,
        skillsRes,
        certificatesRes
      ] = await Promise.all([
        api.get("/projects"),
        api.get("/skills"),
        api.get("/certificates")
      ]);

      setProjects(projectsRes.data);
      setSkills(skillsRes.data);
      setCertificates(certificatesRes.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load data");

    }

  };

  /*
  ================= PROJECT
  */

  const handleProjectChange = (e) => {

    const { name, value } = e.target;

    setProjectForm({
      ...projectForm,
      [name]: value
    });

  };

  const handleFileUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setProjectForm({
      ...projectForm,
      imageFile: file
    });

  };

  const addProject = async () => {

    if (!projectForm.title.trim())
      return alert("Enter project title");

    if (!projectForm.imageFile)
      return alert("Please upload image");

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        projectForm.title
      );

      formData.append(
        "description",
        projectForm.description
      );

      formData.append(
        "github",
        projectForm.github
      );

      formData.append(
        "demo",
        projectForm.demo
      );

      formData.append(
        "image",
        projectForm.imageFile
      );

      console.log(
        "Uploading project image:",
        projectForm.imageFile
      );

      await api.post(
        "/projects",
        formData
      );

      alert("Project added");

      setProjectForm({
        title: "",
        description: "",
        github: "",
        demo: "",
        imageFile: null
      });

      loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const deleteProject = async (id) => {

    if (!window.confirm("Delete project?"))
      return;

    await api.delete(`/projects/${id}`);

    loadData();

  };

  /*
  ================= SKILL
  */

  const addSkill = async () => {

    if (!skillName.trim())
      return alert("Enter skill name");

    await api.post("/skills", {
      name: skillName,
      level: skillLevel
    });

    setSkillName("");
    setSkillLevel(80);

    loadData();

  };

  const deleteSkill = async (id) => {

    if (!window.confirm("Delete skill?"))
      return;

    await api.delete(`/skills/${id}`);

    loadData();

  };

  /*
  ================= CERTIFICATE
  */

  const handleCertificateChange = (e) => {

    const { name, value } = e.target;

    setCertificateForm({
      ...certificateForm,
      [name]: value
    });

  };

  const handleCertificateFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setCertificateForm({
      ...certificateForm,
      imageFile: file
    });

  };

  const addCertificate = async () => {

    if (!certificateForm.title.trim())
      return alert(
        "Enter certificate title"
      );

    if (!certificateForm.imageFile)
      return alert(
        "Please upload certificate image"
      );

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        certificateForm.title
      );

      formData.append(
        "issuer",
        certificateForm.issuer
      );

      formData.append(
        "link",
        certificateForm.link
      );

      formData.append(
        "image",
        certificateForm.imageFile
      );

      console.log(
        "Uploading certificate image:",
        certificateForm.imageFile
      );

      await api.post(
        "/certificates",
        formData
      );

      alert("Certificate added");

      setCertificateForm({
        title: "",
        issuer: "",
        link: "",
        imageFile: null
      });

      loadData();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );

    }

  };

  const deleteCertificate = async (id) => {

    if (!window.confirm("Delete certificate?"))
      return;

    await api.delete(`/certificates/${id}`);

    loadData();

  };

  return (

    <section className="bg-slate-900 text-white min-h-screen p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* 3 COLUMN GRID */}

        <div className="grid md:grid-cols-3 gap-10">

          {/* PROJECT */}

          <div className="bg-slate-800 p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-semibold">
              Add Project
            </h2>

            <input
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
              name="github"
              value={projectForm.github}
              onChange={handleProjectChange}
              placeholder="GitHub Link"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
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

            {/* SHOW SELECTED FILE */}

            {projectForm.imageFile && (

              <p className="text-green-400 text-sm">
                Selected:
                {" "}
                {projectForm.imageFile.name}
              </p>

            )}

            <button
              onClick={addProject}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Add Project
            </button>

            <div className="space-y-2">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="flex justify-between bg-slate-700 p-3 rounded"
                >

                  {project.title}

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* SKILL */}

          <div className="bg-slate-800 p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-semibold">
              Add Skill
            </h2>

            <input
              value={skillName}
              onChange={(e) =>
                setSkillName(e.target.value)
              }
              placeholder="Skill Name"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
              type="number"
              value={skillLevel}
              onChange={(e) =>
                setSkillLevel(e.target.value)
              }
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <button
              onClick={addSkill}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Add Skill
            </button>

            <div className="space-y-2">

              {skills.map((skill) => (

                <div
                  key={skill.id}
                  className="flex justify-between bg-slate-700 p-3 rounded"
                >

                  {skill.name} {skill.level}%

                  <button
                    onClick={() =>
                      deleteSkill(skill.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* CERTIFICATE */}

          <div className="bg-slate-800 p-6 rounded-xl space-y-4">

            <h2 className="text-xl font-semibold">
              Add Certificate
            </h2>

            <input
              name="title"
              value={certificateForm.title}
              onChange={handleCertificateChange}
              placeholder="Certificate Title"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
              name="issuer"
              value={certificateForm.issuer}
              onChange={handleCertificateChange}
              placeholder="Issuer"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <input
              name="link"
              value={certificateForm.link}
              onChange={handleCertificateChange}
              placeholder="Certificate Link"
              className="w-full p-3 bg-slate-900 border rounded"
            />

            <label className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded cursor-pointer">

              <Upload size={18} />

              Upload Certificate Image

              <input
                type="file"
                accept="image/*"
                onChange={handleCertificateFile}
                className="hidden"
              />

            </label>

            {certificateForm.imageFile && (

              <p className="text-green-400 text-sm">
                Selected:
                {" "}
                {certificateForm.imageFile.name}
              </p>

            )}

            <button
              onClick={addCertificate}
              className="bg-purple-500 px-4 py-2 rounded"
            >
              Add Certificate
            </button>

            <div className="space-y-2">

              {certificates.map((certificate) => (

                <div
                  key={certificate.id}
                  className="flex justify-between bg-slate-700 p-3 rounded"
                >

                  {certificate.title}

                  <button
                    onClick={() =>
                      deleteCertificate(
                        certificate.id
                      )
                    }
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