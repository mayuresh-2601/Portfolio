/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import api from "../api/axios";
import { ExternalLink } from "lucide-react";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/certificates");

      if (!response || !response.data) {
        throw new Error("Invalid response");
      }

      setCertificates(response.data);
    } catch (err) {
      console.error("Error fetching certificates:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load certificates"
      );
    } finally {
      setLoading(false);
    }
  };


  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) return image;

    return null; 
  };

  return (
    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My Certificates
        </h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading certificates...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {!loading &&
            !error &&
            certificates.map((certificate) => {

              const imageUrl = getImageUrl(certificate.image);

              return (
                <div
                  key={certificate.id}
                  className="bg-slate-800 p-6 rounded-2xl shadow-lg"
                >

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={certificate.title}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  )}

                  <h3 className="text-xl font-semibold mb-2">
                    {certificate.title}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {certificate.issuer}
                  </p>

                  {certificate.link && (
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-sky-500 rounded hover:bg-sky-500"
                    >
                      <ExternalLink size={16} />
                      View Certificate
                    </a>
                  )}

                </div>
              );
            })}

        </div>
      </div>
    </section>
  );
}

export default Certificates;