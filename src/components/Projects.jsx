/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import api from "../api/axios";
import Github from "./Github";
import { ExternalLink } from "lucide-react";

function Projects() {

  // ---------------- State ----------------

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------- Load Projects ----------------

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {

    try {

      setLoading(true);
      setError(null);

      const response = await api.get(
        "/projects"
      );

      if (!response || !response.data) {
        throw new Error(
          "Invalid response from server"
        );
      }

      setProjects(response.data);

      console.log("Projects loaded");

    } catch (err) {

      console.error(
        "Error fetching projects:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load projects"
      );

    } finally {

      setLoading(false);

    }

  };

  // ---------------- Helper ----------------

  const getImageUrl = (image) => {

    if (!image) return null;

    return `http://localhost:5000/uploads/${image}`;

  };

  // ---------------- UI ----------------

  return (

    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My Projects
        </h2>

        {/* Loading */}

        {loading && (
          <p className="text-center text-gray-400">
            Loading projects...
          </p>
        )}

        {/* Error */}

        {!loading && error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <p className="text-center text-gray-400">
              No projects found.
            </p>
          )}

        {/* Projects Grid */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {!loading &&
            !error &&
            projects.map((project) => (

              <div
                key={project.id}
                className="bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >

                {/* Title */}

                <h3 className="text-xl font-semibold mb-3">
                  {project.title}
                </h3>

                {/* Description */}

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Image */}

                {project.image && (

                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />

                )}

                {/* Buttons */}

                <div className="flex gap-3">

                  {project.github && (

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition"
                    >
                      <Github size={16} />
                      Code
                    </a>

                  )}

                  {project.demo && (

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-sky-500 rounded hover:bg-sky-500 transition"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>

                  )}

                </div>

              </div>

            ))}

        </div>

      </div>

    </section>

  );

}

export default Projects;