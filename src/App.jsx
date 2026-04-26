import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="grow pt-20">

        <Routes>

          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/skills" element={<Skills />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/contact" element={<Contact />} />

          {/* Admin Login */}

          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          {/* Protected Admin Dashboard */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}

          <Route
            path="*"
            element={
              <div className="text-center text-white mt-20">
                <h1 className="text-4xl font-bold">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />

        </Routes>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;