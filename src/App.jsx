import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

/* NEW — CERTIFICATES */

import Certificates from "./components/Certificates";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

function App() {

  const location = useLocation();

  // Hide Navbar & Footer on admin pages

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (

    <div className="min-h-screen flex flex-col bg-slate-900">

      {/* Show Navbar only on public pages */}

      {!isAdminRoute && <Navbar />}

      {/* Main Content */}

      <main className="grow pt-20">

        <Routes>

          {/* ---------------- PUBLIC ROUTES ---------------- */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/skills"
            element={<Skills />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          {/* NEW — CERTIFICATES ROUTE */}

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* ---------------- ADMIN LOGIN ---------------- */}

          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          {/* ---------------- PROTECTED ADMIN DASHBOARD ---------------- */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------------- 404 PAGE ---------------- */}

          <Route
            path="*"
            element={
              <div className="text-center text-white mt-20">

                <h1 className="text-4xl font-bold">
                  404 - Page Not Found
                </h1>

                <p className="mt-4 text-gray-400">
                  The page you are looking for does not exist.
                </p>

              </div>
            }
          />

        </Routes>

      </main>

      {/* Show Footer only on public pages */}

      {!isAdminRoute && <Footer />}

    </div>

  );

}

export default App;