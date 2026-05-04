import { useState } from "react";
import api from "../api/axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ---------------- HANDLE FILE ---------------- */

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  /* ---------------- SUBMIT FORM ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);

      // ✅ FIX: MUST MATCH BACKEND ("file")
      if (file) {
        formData.append("file", file);
      }

      await api.post("/messages", formData);

      alert("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        message: ""
      });

      setFile(null);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="min-h-screen bg-[#0a1a33] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#0f2a4a] p-8 rounded-xl shadow-xl border border-gray-700">

        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          Contact Me
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Send message or upload document
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0a1a33] border border-gray-600 text-white"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0a1a33] border border-gray-600 text-white"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 rounded-lg bg-[#0a1a33] border border-gray-600 text-white"
          />

          {/* File Upload */}
          <div>
            <label className="block text-gray-300 mb-2">
              Upload Files (PDF / DOC / DOCX / Image — Max 10MB)
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              className="w-full text-gray-300 border border-gray-600 rounded-lg bg-[#0a1a33]"
            />

            {file && (
              <p className="text-green-400 text-sm mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 rounded-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default Contact;