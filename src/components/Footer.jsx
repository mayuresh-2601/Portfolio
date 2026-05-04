import { Mail, Heart } from "lucide-react";
import GithubIcon from "./Github";
import LinkedinIcon from "./Linkedin";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-700">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Mayuresh Kasar
            </h2>

            <p className="text-sm mt-2 text-gray-400">
              Full Stack Developer | React | Node.js | MySQL
            </p>
          </div>

          <div className="flex gap-5">

            <a
              href="https://github.com/mayuresh-2601"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-sky-500 transition duration-300"
            >
              <GithubIcon size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/mayuresh2601/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 rounded-full hover:bg-sky-500 transition duration-300"
            >
              <LinkedinIcon size={20} />
            </a>

            <a
              href="mailto:kasarmayuresh99@gmail.com"
              className="p-3 bg-slate-800 rounded-full hover:bg-sky-500 transition duration-300"
            >
              <Mail size={20} />
            </a>

          </div>

        </div>

        <div className="border-t border-slate-700 my-6"></div>

        <div className="text-center text-sm text-gray-400 flex justify-center items-center gap-2">

          © {new Date().getFullYear()} Mayuresh Kasar Portfolio

          <span className="flex items-center gap-1">
            Made with <Heart size={16} className="text-red-500" />
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;