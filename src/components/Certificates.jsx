/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import api from "../api/axios";
import { ExternalLink } from "lucide-react";

function Certificates() {

  // ---------------- STATE ----------------

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  // ---------------- LOAD CERTIFICATES ----------------

  useEffect(() => {

    loadCertificates();

  }, []);

  const loadCertificates =
    async () => {

      try {

        setLoading(true);
        setError(null);

        const response =
          await api.get(
            "/api/certificates"
          );

        if (
          !response ||
          !response.data
        ) {

          throw new Error(
            "Invalid response"
          );

        }

        setCertificates(
          response.data
        );

      } catch (err) {

        console.error(
          "Error fetching certificates:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Failed to load certificates"
        );

      } finally {

        setLoading(false);

      }

    };

  // ---------------- IMAGE URL HELPER ----------------

  const getImageUrl = (image) => {

    if (!image) return null;

    if (image.startsWith("http")) {

      return image;

    }

    if (image.startsWith("/uploads")) {

      return `http://localhost:5000${image}`;

    }

    return `http://localhost:5000/uploads/${image}`;

  };

  // ---------------- UI ----------------

  return (

    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">

          My Certificates

        </h2>

        {/* LOADING */}

        {loading && (

          <p className="text-center text-gray-400">

            Loading certificates...

          </p>

        )}

        {/* ERROR */}

        {!loading && error && (

          <p className="text-center text-red-400">

            {error}

          </p>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          certificates.length === 0 && (

            <p className="text-center text-gray-400">

              No certificates found.

            </p>

          )}

        {/* GRID */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {!loading &&
            !error &&
            certificates.map(
              (certificate) => {

                const imageUrl =
                  getImageUrl(
                    certificate.image
                  );

                return (

                  <div
                    key={certificate.id}
                    className="bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
                  >

                    {/* IMAGE — CLICK TO OPEN */}

                    {imageUrl && (

                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <img
                          src={imageUrl}
                          alt={
                            certificate.title
                          }
                          className="w-full h-40 object-cover rounded mb-4 cursor-pointer hover:opacity-90 transition"
                        />

                      </a>

                    )}

                    {/* TITLE */}

                    <h3 className="text-xl font-semibold mb-2">

                      {certificate.title}

                    </h3>

                    {/* ISSUER */}

                    {certificate.issuer && (

                      <p className="text-gray-400 mb-4">

                        {certificate.issuer}

                      </p>

                    )}

                    {/* LINK */}

                    {certificate.link && (

                      <a
                        href={
                          certificate.link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-sky-500 rounded hover:bg-sky-500 transition"
                      >

                        <ExternalLink size={16} />

                        View Certificate

                      </a>

                    )}

                  </div>

                );

              }

            )}

        </div>

      </div>

    </section>

  );

}

export default Certificates;