import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Layers, Link, Terminal } from "lucide-react";
import {
    SiJavascript, SiTypescript, SiPython, SiLua, SiReact, SiVuedotjs,
    SiExpress, SiFlask, SiHtml5, SiCss, SiSass, SiJinja, SiTailwindcss,
    SiPostgresql, SiMongodb, SiSqlite, SiNodedotjs, SiArchlinux,
    SiNeovim, SiGit, SiFigma
} from "react-icons/si";
import { staggerContainer, scaleUp } from "../utils/animations";

export default function Skills() {
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
