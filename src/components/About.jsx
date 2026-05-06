function About() {
  return (
    <section
      id="about"
      className="bg-slate-900 text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About{" "}
          <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center">
            <img
             src="/Profile.png"
              alt="Mayuresh Kasar"
              className="w-72 h-72 object-cover rounded-xl border-4 border-sky-500 shadow-lg"
            />
          </div>

          <div>

            <h3 className="text-2xl font-semibold mb-4">
              Full Stack Developer
            </h3>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionate Full Stack Developer dedicated to building modern, responsive, and scalable web applications. Skilled in developing intuitive frontend interfaces and robust backend systems using technologies like React, Node.js, Express, and MySQL.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              I enjoy solving real-world problems through clean architecture, efficient code, and user-focused design. Constantly exploring new tools, frameworks, and best practices to enhance my development skills and stay updated with modern web technologies.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Driven by continuous learning and innovation, my goal is to contribute to impactful software solutions while growing as a professional developer in the tech industry.
            </p>

            <div className="grid grid-cols-2 gap-6 text-sm">

              <div>
                <p className="text-gray-400">Name:</p>
                <p className="font-medium">Mayuresh Kasar</p>
              </div>

              <div>
                <p className="text-gray-400">Email:</p>
                <p className="font-medium">
                  kasarmayuresh99@gmail.com
                </p>
              </div>

              <div>
                <p className="text-gray-400">Location:</p>
                <p className="font-medium">Maharashtra,India</p>
              </div>

              <div>
                <p className="text-gray-400">Availability:</p>
                <p className="font-medium text-green-400">
                  Open to Work
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;