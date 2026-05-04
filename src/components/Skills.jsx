/* eslint-disable react-hooks/immutability */

import { useState, useEffect } from "react";
import api from "../api/axios";

function Skills() {


  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {

    try {

      setLoading(true);
      setError(null);

      const response = await api.get(
        "/skills"
      );

      if (!response || !response.data) {
        throw new Error(
          "Invalid response from server"
        );
      }

      setSkills(response.data);

      console.log("Skills loaded");

    } catch (err) {

      console.error(
        "Error fetching skills:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load skills"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My Skills
        </h2>



        {loading && (
          <p className="text-center text-gray-400">
            Loading skills...
          </p>
        )}



        {!loading && error && (
          <p className="text-center text-red-400">
            {error}
          </p>
        )}



        {!loading &&
          !error &&
          skills.length === 0 && (
            <p className="text-center text-gray-400">
              No skills found.
            </p>
          )}



        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          {!loading &&
            !error &&
            skills.map((skill) => {

              const level =
                skill.level || 80;

              return (

                <div
                  key={skill.id}
                  className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition"
                >

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {skill.name}
                    </span>

                    <span className="text-sm text-gray-400">
                      {level}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-3">

                    <div
                      className="bg-sky-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${level}%`
                      }}
                    />

                  </div>

                </div>

              );

            })}

        </div>

      </div>

    </section>

  );

}

export default Skills;