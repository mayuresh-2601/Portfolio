import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Mail, Lock } from "lucide-react";

function AdminLogin() {

  const navigate = useNavigate();

  // ---------------- State ----------------

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  // ---------------- Handle Login ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log("Sending login request...");

      const response = await api.post(
        "/api/auth/login",
        formData
      );

      console.log("Login response:", response.data);

      // Save token

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      // Redirect

      navigate("/admin/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // ---------------- UI ----------------

  return (

    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}

          <div>

            <label className="text-gray-300 text-sm mb-2 block">
              Email
            </label>

            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3">

              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter admin email"
                className="w-full bg-transparent text-white p-3 outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-300 text-sm mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3">

              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full bg-transparent text-white p-3 outline-none"
              />

            </div>

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </section>

  );

}

export default AdminLogin;