import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function Projects() {
  const projects = [
    {
      img: "/proj_lifedrop.png",
      techs: ["React", "Express", "Node.js", "MySQL", "JWT"],
      name: "LifeDrop",
      desc: "Scalable full-stack app for managing blood donors with secure authentication and role-based access.",
      live: "https://bloodbank.ashikrahman.in/",
      github: "https://github.com/mohdashikk/bloodbank",
      accent: "#c778dd"
    },
    {
      img: "/proj_meal.png",
      techs: ["React", "OpenAI API", "Tailwind CSS"],
      name: "Mealify",
      desc: "AI-powered meal generator that creates personalized recipes in real-time using React, and AI API integration.",
      live: "https://aimeal.ashikrahman.in/",
      github: "https://github.com/mohdashikk/ai-meal-generator",
      accent: "#61afef"
    },
    {
      img: "/proj_ats.png",
      techs: ["React", "Express", "Node.js", "MySQL", "JWT", "Tailwind CSS"],
      name: "ATS",
      desc: "Built a scalable applicant tracking system using React, Node.js, and MySQL with role-based access control, candidate management, and workflow tracking.",
      live: "#",
      github: "#",
      accent: "#98c379"
    },
  ];

  return (
    <section className="section" id="works">
      {/* Background Decorations */}
      <div
        className="dots-pattern"
        style={{ top: 120, left: -20, opacity: 0.1, zIndex: 1 }}
      ></div>
      <div
        className="shape-square"
        style={{
          top: 300,
          right: -40,
          width: 100,
          height: 100,
          opacity: 0.05,
          zIndex: 1,
        }}
      ></div>

      <div className="projects-header" style={{ marginBottom: "60px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <span className="section-number" style={{ marginBottom: "5px" }}>01</span>
        </div>
        <div className="section-header-flex">
          <div className="header-column-left">
            <h2 className="section-title" style={{ marginBottom: 0, gap: "15px" }}>
              <span>#</span>projects
            </h2>
          </div>
          <div className="header-column-center">
            //WORKS
          </div>
          <div className="header-column-right">
            2019 — 2026
          </div>
        </div>
      </div>

      <motion.div
        className="premium-project-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {projects.map((p, idx) => (
          <motion.div
            className="premium-project-row"
            key={idx}
            variants={fadeInUp}
          >
            {/* Left Content Side */}
            <div className="project-content-side">
              <div className="project-index">0{idx + 1}</div>
              <div className="project-title-area">
                <h3 className="premium-project-name">
                  <span>#</span>{p.name.toLowerCase()}
                </h3>
              </div>
              
              <p className="premium-project-desc">{p.desc}</p>
              
              <div className="tag-container">
                {p.techs.map((tag, i) => (
                  <span key={i} className="tech-pill">{tag}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <a href={p.live}  target="_blank" className="premium-cta">
                  <span>Live Website</span>
                  <ExternalLink size={18} />
                  <div className="cta-underline"></div>
                </a>
                <a href={p.github} target="_blank" className="premium-cta">
                  <span>GitHub</span>
                  <Github size={18} />
                  <div className="cta-underline"></div>
                </a>
              </div>
            </div>

            {/* Right Image Side */}
            <div className="project-visual-side">
              <div className="image-wrapper">
                <img src={p.img} alt={p.name} className="premium-mockup" />
                <div className="image-overlay"></div>
                <div className="glass-glow"></div>
              </div>
            </div>
            
            <div className="row-divider"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

