import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  X,
  Home,
  User,
  Code,
  Folder,
  Mail,
  Shield,
  Award
} from "lucide-react";

function Navbar() {

  const [isOpen, setIsOpen] =
    useState(false);

  // Get token safely

  const token =
    localStorage.getItem("token");

  return (

    <nav className="sticky top-0 bg-slate-900/90 backdrop-blur-md text-white shadow-lg w-full z-50 border-b border-slate-700">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          MyPortfolio
        </Link>

        {/* DESKTOP MENU */}

        <ul className="hidden md:flex items-center space-x-8 font-medium">

          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Home size={18} />
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <User size={18} />
              About
            </Link>
          </li>

          <li>
            <Link
              to="/skills"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Code size={18} />
              Skills
            </Link>
          </li>

          <li>
            <Link
              to="/projects"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Folder size={18} />
              Projects
            </Link>
          </li>

          {/* NEW — CERTIFICATES */}

          <li>
            <Link
              to="/certificates"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Award size={18} />
              Certificates
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="flex items-center gap-2 hover:text-sky-400 transition"
            >
              <Mail size={18} />
              Contact
            </Link>
          </li>

          {/* ADMIN LINK */}

          {token && (

            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
              >
                <Shield size={18} />
                Admin
              </Link>
            </li>

          )}

        </ul>

        {/* MOBILE BUTTON */}

        <div className="md:hidden">

          <button
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className="p-2 rounded-lg hover:bg-slate-700 transition"
          >

            {isOpen
              ? <X size={28} />
              : <Menu size={28} />}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {isOpen && (

        <div className="md:hidden bg-slate-900 border-t border-slate-700">

          <ul className="flex flex-col items-center py-6 space-y-6 font-medium">

            <li>
              <Link
                to="/"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/skills"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Skills
              </Link>
            </li>

            <li>
              <Link
                to="/projects"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Projects
              </Link>
            </li>

            {/* NEW — CERTIFICATES */}

            <li>
              <Link
                to="/certificates"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Certificates
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Contact
              </Link>
            </li>

            {/* ADMIN MOBILE */}

            {token && (

              <li>
                <Link
                  to="/admin/dashboard"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="text-yellow-400"
                >
                  Admin
                </Link>
              </li>

            )}

          </ul>

        </div>

      )}

    </nav>

  );

}

export default Navbar;