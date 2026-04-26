import GithubIcon from "./Github";
import LinkedinIcon from "./Linkedin";
import { Link } from "react-router-dom";


function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE - TEXT */}
        <div className="text-center md:text-left">

          {/* Greeting */}
          <p className="text-sky-400 font-medium mb-2">
            Hello, Welcome to my Portfolio
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Mayuresh Kasar
            </span>
          </h1>

          {/* Role */}
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Full Stack Developer | React | Node.js | MySQL
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-8">
            I am a passionate Full Stack Developer who loves building
            responsive and scalable web applications. I enjoy solving
            real-world problems using modern technologies and continuously
            improving my skills in frontend and backend development.
          </p>

          {/* Skills Highlights */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start">

            <span className="bg-slate-800 px-4 py-2 rounded-full text-sm">
              React
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full text-sm">
              Node.js
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full text-sm">
              JavaScript
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full text-sm">
              MySQL
            </span>

            <span className="bg-slate-800 px-4 py-2 rounded-full text-sm">
              Tailwind CSS
            </span>

          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">

            <Link
              to="/contact"
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition"
            >
              Contact Me
            </Link>

            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 border border-sky-500 hover:bg-sky-500 rounded-lg font-medium transition"
            >
              Download Resume
            </a>

          </div>

          {/* Social Icons */}
          <div className="flex gap-5 justify-center md:justify-start">

            <a
              href="https://github.com/mayuresh-2601"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-sky-500 transition"
            >
              <GithubIcon size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/mayuresh2601/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-sky-500 transition"
            >
              <LinkedinIcon size={20} />
            </a>

          </div>

        </div>

        {/* RIGHT SIDE - PROFILE IMAGE */}
        <div className="flex justify-center">

          <div className="relative">

            <img
              src="/Profile.png"
              alt="Mayuresh Kasar"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-sky-500 shadow-lg"
            />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-sky-500 blur-3xl opacity-20"></div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;