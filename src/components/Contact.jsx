import { useState } from "react";
import api from "../api/axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function Contact() {

  // ---------------- State ----------------

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ---------------- Handle Input ----------------

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  // ---------------- Submit Form ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/api/messages",
        formData
      );

      alert("Message sent successfully!");

      // Reset form

      setFormData({
        name: "",
        email: "",
        message: "",
      });

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

  // ---------------- UI ----------------

  return (

    <section className="bg-slate-900 text-white py-20 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto">

        {/* Title */}

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">

          Contact{" "}

          <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">

            Me

          </span>

        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}

          <div className="space-y-6">

            <h3 className="text-2xl font-semibold">

              Get In Touch

            </h3>

            <p className="text-gray-400 leading-relaxed">

              I am available for internships, freelance work, and full-time opportunities. Feel free to contact me anytime.

            </p>

            {/* Email */}

            <div className="flex items-center gap-4">

              <div className="p-3 bg-slate-800 rounded-full">

                <Mail size={20} />

              </div>

              <div>

                <p className="text-gray-400 text-sm">

                  Email

                </p>

                <p className="font-medium">

                  kasarmayuresh99@gmail.com

                </p>

              </div>

            </div>

            {/* Phone */}

            <div className="flex items-center gap-4">

              <div className="p-3 bg-slate-800 rounded-full">

                <Phone size={20} />

              </div>

              <div>

                <p className="text-gray-400 text-sm">

                  Phone

                </p>

                <p className="font-medium">

                  +91 9082475445

                </p>

              </div>

            </div>

            {/* Location */}

            <div className="flex items-center gap-4">

              <div className="p-3 bg-slate-800 rounded-full">

                <MapPin size={20} />

              </div>

              <div>

                <p className="text-gray-400 text-sm">

                  Location

                </p>

                <p className="font-medium">

                  Dombivali, India

                </p>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <form

            onSubmit={handleSubmit}

            className="bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6"

          >

            {/* Name */}

            <div>

              <label className="block text-sm mb-2">

                Name

              </label>

              <input

                type="text"

                name="name"

                value={formData.name}

                onChange={handleChange}

                required

                placeholder="Enter your name"

                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-sky-500 transition"

              />

            </div>

            {/* Email */}

            <div>

              <label className="block text-sm mb-2">

                Email

              </label>

              <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                required

                placeholder="Enter your email"

                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-sky-500 transition"

              />

            </div>

            {/* Message */}

            <div>

              <label className="block text-sm mb-2">

                Message

              </label>

              <textarea

                name="message"

                rows="5"

                value={formData.message}

                onChange={handleChange}

                required

                placeholder="Write your message"

                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-sky-500 transition"

              />

            </div>

            {/* Button */}

            <button

              type="submit"

              disabled={loading}

              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-medium transition duration-300 disabled:opacity-50"

            >

              <Send size={18} />

              {loading ? "Sending..." : "Send Message"}

            </button>

          </form>

        </div>

      </div>

    </section>

  );

}

export default Contact;