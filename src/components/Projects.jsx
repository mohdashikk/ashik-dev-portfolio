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

            <div className="projects-header" style={{ marginBottom: "30px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                    <span className="section-number">01</span>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>
                        <span>#</span>projects
                    </h2>
                </div>
                
                <div style={{ flex: 1, textAlign: "center", color: 'var(--text-primary)', fontSize: '14.4px', fontWeight: 600, letterSpacing: '0.05em', paddingBottom: '10px' }}>
                    //WORKS
                </div>

                <div style={{ flex: 1, textAlign: "right", color: 'var(--text-primary)', fontSize: '14.4px', fontWeight: 500, letterSpacing: '0.05em', paddingBottom: '10px' }}>
                    2019 — 2026
                </div>
            </div>
            <motion.div
                className="project-list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={staggerContainer}
            >
                {projects.map((p, idx) => (
                    <motion.div
                        className="project-row"
                        key={idx}
                        variants={fadeInUp}
                    >
                        {/* Area 1: Actions / Button */}
                        <div className="project-actions">
                            {idx === 0 && (
                                <a href="#" className="view-all" style={{ textDecoration: 'none', padding: 0 }}>
                                    View all <ArrowRight size={18} />
                                </a>
                            )}
                        </div>

                        {/* Area 2: Info (Title, Desc, Techs) */}
                        <div className="project-info">
                            <div className="project-title-wrapper">
                                <h3 className="experience-heading" style={{ fontSize: "1.8rem" }}>
                                    <span>#</span>{p.name.toLowerCase()}
                                </h3>
                                <ArrowRight className="project-arrow" size={24} />
                            </div>
                            <p className="project-description">{p.desc}</p>
                            <div className="project-tech-label">
                                {p.techs.join(" / ")}
                            </div>
                        </div>

                        {/* Area 3: Image / Mockup showcase */}
                        <div className="project-showcase">
                            <img src={p.img} alt={p.name} className="project-mockup" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
