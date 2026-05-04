import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
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

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (

    <div className="min-h-screen flex flex-col bg-slate-900">



      {!isAdminRoute && <Navbar />}

  

      <main className="grow pt-20">

        <Routes>

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

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />


          <Route
            path="/admin"
            element={<AdminLogin />}
          />


          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


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

      {!isAdminRoute && <Footer />}

    </div>

  );

}

export default App;