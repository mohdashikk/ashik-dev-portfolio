import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Server } from "lucide-react";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function Projects() {
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
            {/* Background Decorations */}
            <div
                className="dots-pattern"
                style={{ top: 120, left: -20, opacity: 0.3, zIndex: 1 }}
            ></div>
            <div
                className="shape-square"
                style={{ top: 300, right: -40, width: 100, height: 100, opacity: 0.2, zIndex: 1 }}
            ></div>
            <div
                className="dots-pattern"
                style={{ bottom: 50, right: 100, opacity: 0.2, zIndex: 1 }}
            ></div>
            <div
                className="shape-square"
                style={{ bottom: 150, left: 30, width: 60, height: 60, opacity: 0.3, zIndex: 1 }}
            ></div>

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
                        <div className="project-top-bar">
                            <span className="window-dots">
                                <i></i><i></i><i></i>
                            </span>
                            <span className="window-title">~/{p.name.toLowerCase()}</span>
                        </div>
                        <div className="project-img-container">
                            <img src={p.img} alt={p.name} className="project-img" />
                            <div className="project-img-overlay">
                                <span className="overlay-text">
                                    <ExternalLink size={18} style={{ marginRight: 8, verticalAlign: "bottom" }} />
                                    View Project
                                </span>
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
