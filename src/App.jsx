import React, { useState, useEffect } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Figma,
  Mail,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Terminal,
  Database,
  Link,
  Code,
  Layers,
  ExternalLink,
  Server,
} from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiLua,
  SiReact,
  SiVuedotjs,
  SiExpress,
  SiFlask,
  SiVite,
  SiHtml5,
  SiCss,
  SiSass,
  SiJinja,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiNodedotjs,
  SiArchlinux,
  SiNeovim,
  SiGit,
  SiFigma,
} from "react-icons/si";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

function Sidebar({ isOpen, toggleSidebar }) {
  const [activeNav, setActiveNav] = useState("#home");

  const navs = [
    { id: "#home", label: "home" },
    { id: "#works", label: "works" },
    { id: "#skills", label: "skills" },
    { id: "#about-me", label: "about-me" },
    { id: "#contacts", label: "contacts" },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <motion.div
        className={`sidebar ${isOpen ? "open" : ""}`}
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : window.innerWidth <= 1024 ? -280 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className="sidebar-logo"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <div className="logo-icon"></div>
          <span>Elias</span>
        </div>

        <nav className="sidebar-nav">
          {navs.map((nav, idx) => (
            <motion.a
              key={idx}
              href={nav.id}
              className={`nav-item ${activeNav === nav.id ? "active" : ""}`}
              onClick={(e) => {
                setActiveNav(nav.id);
                if (window.innerWidth <= 1024) toggleSidebar();
              }}
              whileHover={{ x: 10, color: "#FFFFFF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>#</span>
              {nav.label}
            </motion.a>
          ))}
        </nav>

        <div className="sidebar-socials">
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#">
            <Github size={22} />
          </motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#">
            <Figma size={22} />
          </motion.a>
          <motion.a whileHover={{ y: -5, scale: 1.1 }} href="#">
            <Twitter size={22} />
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}

function MobileHeader({ toggleSidebar }) {
  return (
    <div className="mobile-header">
      <div className="sidebar-logo" style={{ marginBottom: 0 }}>
        <div className="logo-icon" style={{ backgroundColor: "#fff" }}></div>
        <span
          style={{
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.2rem",
            marginLeft: "10px",
          }}
        >
          Elias
        </span>
      </div>
      <button
        onClick={toggleSidebar}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <Menu size={28} />
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="section hero-section" id="home">
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 className="hero-title" variants={fadeInUp}>
          Elias is a <span className="highlight">web designer</span> and{" "}
          <span className="highlight">front-end developer</span>
        </motion.h1>
        <motion.p className="hero-desc" variants={fadeInUp}>
          He crafts responsive websites where technologies meet creativity
        </motion.p>
        <motion.div variants={fadeInUp}>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact me!!
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-image-box"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/dark_hero.png"
          alt="Hero Illustration"
          className="hero-image"
        />
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="status-dot"></div>
          <div className="status-text">
            Currently working on <b>Portfolio</b>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Quote() {
  return (
    <motion.section
      className="quote-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeInUp}
    >
      <div className="quote-content">
        <div className="quote-box">
          With great power comes great electricity bill
        </div>
        <div className="quote-author">- Dr. Who</div>
      </div>
    </motion.section>
  );
}

function Projects() {
  const projects = [
    {
      img: "/proj_chert.png",
      techs: ["HTML", "SCSS", "Python", "Flask"],
      name: "ChertNodes",
      desc: "Minecraft servers hosting",
      live: true,
      cached: true,
    },
    {
      img: "/proj_protect.png",
      techs: ["React", "Express", "Discord.js", "Node.js"],
      name: "ProtectX",
      desc: "Discord anti-crash bot",
      live: true,
      cached: false,
    },
    {
      img: "/proj_kahoot.png",
      techs: ["CSS", "Express", "Node.js"],
      name: "Kahoot Answers Viewer",
      desc: "Get answers to your kahoot quiz",
      live: true,
      cached: false,
    },
  ];

  return (
    <section className="section" id="works">
      <div className="projects-header">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          <span>#</span>projects
        </h2>
        <a href="#" className="view-all">
          View all <ArrowRight size={18} />
        </a>
      </div>
      <motion.div
        className="project-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {projects.map((p, idx) => (
          <motion.div
            className="project-card"
            key={idx}
            variants={fadeInUp}
          >
            <div className="project-img-container">
              <img src={p.img} alt={p.name} className="project-img" />
              <div className="project-img-overlay">
                <span className="overlay-text">🚀 View Project</span>
              </div>
            </div>
            <div className="project-techs">
              {p.techs.map((tech, tIdx) => (
                <span key={tIdx} className="tech-badge">{tech}</span>
              ))}
            </div>
            <div className="project-body">
              <h3 className="project-name text-white">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-links">
                {p.live && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    Live <ExternalLink size={16} />
                  </motion.button>
                )}
                {p.cached && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#ABB2BF",
                      borderColor: "#ABB2BF",
                    }}
                  >
                    Cached <Server size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code size={18} />,
      list: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Python", icon: <SiPython /> },
        { name: "Lua", icon: <SiLua /> },
      ],
    },
    {
      title: "Databases",
      icon: <Database size={18} />,
      list: [
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "SQLite", icon: <SiSqlite /> },
      ],
    },
    {
      title: "Frameworks & Libs",
      icon: <Layers size={18} />,
      list: [
        { name: "React", icon: <SiReact /> },
        { name: "Vue.js", icon: <SiVuedotjs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Flask", icon: <SiFlask /> },
        { name: "Node.js", icon: <SiNodedotjs /> },
      ],
    },
    {
      title: "Other",
      icon: <Link size={18} />,
      list: [
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "CSS3", icon: <SiCss /> },
        { name: "SCSS", icon: <SiSass /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Jinja", icon: <SiJinja /> },
      ],
    },
    {
      title: "Tools & OS",
      icon: <Terminal size={18} />,
      list: [
        { name: "Git", icon: <SiGit /> },
        // { name: "VS Code", icon: <SiVisualstudiocode /> },
        { name: "Neovim", icon: <SiNeovim /> },
        { name: "Figma", icon: <SiFigma /> },
        { name: "Arch Linux", icon: <SiArchlinux /> },
      ],
    },
  ];

  return (
    <section className="section" id="skills">
      <h2 className="section-title">
        <span>#</span>skills
      </h2>
      <div className="skills-container">
        <div className="skills-left">
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(199, 120, 221, 0.2)" }}
          >
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn red"></span>
                <span className="terminal-btn yellow"></span>
                <span className="terminal-btn green"></span>
              </div>
              <span className="terminal-title">~/elias/skills</span>
            </div>
            <div className="terminal-body">
              <p><span className="keyword">const</span> <span className="variable">developer</span> = {"{"}</p>
              <p>&nbsp;&nbsp;name: <span className="string">"Elias"</span>,</p>
              <p>&nbsp;&nbsp;role: <span className="string">"Frontend"</span>,</p>
              <p>&nbsp;&nbsp;skills: [<span className="string">"React"</span>, <span className="string">"TypeScript"</span>, <span className="string">"Figma"</span>],</p>
              <p>&nbsp;&nbsp;hobby: <span className="string">"Crafting UI"</span>,</p>
              <p>{"};"}</p>
              <br />
              <p className="command"><span className="keyword">&gt;</span> developer.execute()<span className="cursor">_</span></p>
            </div>
          </motion.div>

          <div className="dots-pattern" style={{ top: -20, right: 30 }}></div>
          <div
            className="shape-square"
            style={{ bottom: 20, left: 10, width: 60, height: 60, opacity: 0.3 }}
          ></div>
        </div>
        <motion.div
          className="skills-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              className="skill-box"
              key={idx}
              variants={scaleUp}
              whileHover={{ scale: 1.03, borderColor: "#C778DD" }}
            >
              <div className="skill-title">
                {cat.icon}
                {cat.title}
              </div>
              <div className="skill-list">
                {cat.list.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    {skill.icon}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutMe() {
  return (
    <section className="section about-container" id="about-me">
      <motion.div
        className="about-text"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <h2 className="section-title">
          <span>#</span>about-me
        </h2>
        <motion.p variants={fadeInUp}>Hello, i'm Elias!</motion.p>
        <motion.p variants={fadeInUp}>
          I'm a self-taught front-end developer based in Kyiv, Ukraine. I can
          develop responsive websites from scratch and raise them into modern
          user-friendly web experiences.
        </motion.p>
        <motion.p variants={fadeInUp}>
          Transforming my creativity and knowledge into websites has been my
          passion for over a year. I have been helping various clients to
          establish their presence online. I always strive to learn about the
          newest technologies and frameworks.
        </motion.p>
        <motion.div variants={fadeInUp} style={{ marginTop: 25 }}>
          <motion.button whileHover={{ scale: 1.05 }} className="btn-primary">
            Read more{" "}
            <ArrowRight
              size={16}
              style={{ verticalAlign: "middle", marginLeft: 8 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="about-image-wrapper"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="dots-pattern"
          style={{ top: 50, left: 10, zIndex: 3 }}
        ></div>
        <div
          className="dots-pattern"
          style={{ bottom: 20, right: 30, zIndex: 1 }}
        ></div>
        <img src="/dark_about.png" alt="Elias" />
      </motion.div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="section" id="contacts">
      <h2 className="section-title">
        <span>#</span>contacts
      </h2>
      <div className="contacts-container">
        <motion.div
          className="contacts-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p>
            I'm interested in freelance opportunities. However, if you have
            other request or question, don't hesitate to contact me
          </p>
        </motion.div>

        <motion.div
          className="contacts-box"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ borderColor: "#C778DD" }}
        >
          <div className="contacts-box-title">Message me here</div>
          <a href="#" className="contact-item">
            <MessageSquare size={18} /> !Elias#3519
          </a>
          <a href="#" className="contact-item">
            <Mail size={18} /> elias@elias.me
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo-row">
            <div className="logo-icon"></div>
            <strong className="text-white" style={{ fontSize: "1.2rem" }}>
              Elias
            </strong>
            <span className="footer-email" style={{ marginLeft: 15 }}>
              elias@elias-dev.ml
            </span>
          </div>
          <div className="footer-desc">
            Web designer and front-end developer
          </div>
        </div>
        <div>
          <div className="footer-media-title">Media</div>
          <div className="footer-social-links">
            <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
              <Github size={24} />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
              <Figma size={24} />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
              <Twitter size={24} />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© Copyright 2026. Made by Elias</div>
    </footer>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on window resize to > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="main-content">
        <MobileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Hero />
          <Quote />
          <Projects />
          <Skills />
          <AboutMe />
          <Contacts />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
