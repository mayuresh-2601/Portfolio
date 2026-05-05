/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import api from "../api/axios";
import Github from "./Github";
import { ExternalLink } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");

      console.log("PROJECT DATA:", res.data);

      setProjects(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

const getImageUrl = (image) => {
  if (!image) return null;

  const clean = image.trim();

  // 🔥 REMOVE WRONG PREFIX IF EXISTS
  if (clean.includes("/uploads/http")) {
    return clean.replace("/uploads/", "");
  }

  // ✅ ALWAYS return Cloudinary directly
  if (clean.startsWith("http")) {
    return clean;
  }

  return null;
};
  return (
    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          My Projects
        </h2>

        {loading && (
          <p className="text-center text-gray-400">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => {
            const imageUrl = getImageUrl(project.image);

            console.log("FINAL IMAGE URL:", imageUrl);

            return (
              <div
                key={project.id}
                className="bg-slate-800 p-6 rounded-2xl shadow-lg"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-700 rounded mb-4 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <h3 className="text-xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-blue-400"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-green-400"
                    >
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Projects;