import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Layers, Link, Terminal, Server } from "lucide-react";
import {
    SiJavascript, SiTypescript, SiReact, SiPhp,
    SiExpress, SiHtml5, SiCss, SiSass, SiLess, SiTailwindcss,
    SiPostgresql, SiSqlite, SiNodedotjs, SiNextdotjs,
    SiGit, SiFigma,
    SiDocker, SiStrapi, SiClerk, SiN8N, SiShadcnui, SiGithubactions
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
                { name: "PHP", icon: <SiPhp /> },
            ],
        },
        {
            title: "Databases",
            icon: <Database size={18} />,
            list: [
                { name: "PostgreSQL", icon: <SiPostgresql /> },
                { name: "Neon", icon: <Server size={14} /> },
                { name: "SQLite", icon: <SiSqlite /> },
            ],
        },
        {
            title: "Frameworks & Libs",
            icon: <Layers size={18} />,
            list: [
                { name: "React", icon: <SiReact /> },
                { name: "Next.js", icon: <SiNextdotjs /> },
                { name: "Express.js", icon: <SiExpress /> },
                { name: "Node.js", icon: <SiNodedotjs /> },
                { name: "Strapi", icon: <SiStrapi /> },
                { name: "shadcn/ui", icon: <SiShadcnui /> },
            ],
        },
        {
            title: "Other",
            icon: <Link size={18} />,
            list: [
                { name: "HTML5", icon: <SiHtml5 /> },
                { name: "CSS3", icon: <SiCss /> },
                { name: "SCSS", icon: <SiSass /> },
                { name: "Less", icon: <SiLess /> },
                { name: "Tailwind", icon: <SiTailwindcss /> },
                { name: "Clerk", icon: <SiClerk /> },
            ],
        },
        {
            title: "Tools & OS",
            icon: <Terminal size={18} />,
            list: [
                { name: "Git", icon: <SiGit /> },
                { name: "Figma", icon: <SiFigma /> },
                { name: "Docker", icon: <SiDocker /> },
                { name: "CI/CD", icon: <SiGithubactions /> },
                { name: "n8n", icon: <SiN8N /> },
            ],
        },
    ];

    return (
        <section className="section" id="skills">
            <div>
                <span className="section-number">02</span>
                <h2 className="section-title">
                    <span>#</span>skills
                </h2>
            </div>
            <div className="skills-container">
                <div className="skills-left">
                    <motion.div
                        className="terminal-window"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ y: -5, boxShadow: "0px 15px 40px rgba(199, 120, 221, 0.25)" }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span className="terminal-btn red"></span>
                                <span className="terminal-btn yellow"></span>
                                <span className="terminal-btn green"></span>
                            </div>
                            <span className="terminal-title">bash — ashik@portfolio:~</span>
                        </div>
                        <div className="terminal-body">
                            <p><span className="keyword">const</span> <span className="variable">developer</span> = {"{"}</p>
                            <p>&nbsp;&nbsp;name: <span className="string">"Ashik"</span>,</p>
                            <p>&nbsp;&nbsp;role: <span className="string">"Full-Stack Developer"</span>,</p>
                            <p>&nbsp;&nbsp;skills: [<span className="string">"React"</span>, <span className="string">"Node"</span>, <span className="string">"Express"</span>, <span className="string">"Figma"</span>],</p>
                            <p>&nbsp;&nbsp;hobby: <span className="string">"Crafting Software"</span>,</p>
                            <p>{"}"}</p>
                            <br />
                            <p className="command"><span className="keyword">&gt;</span> ./execute_skills.sh<span className="cursor">_</span></p>
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
                            className="skill-card-modern"
                            key={idx}
                            variants={scaleUp}
                        >
                            <div className="skill-card-header">
                                {cat.icon}
                                {cat.title}
                            </div>
                            <div className="skill-card-body">
                                {cat.list.map((skill, sIdx) => (
                                    <div key={sIdx} className="skill-tag">
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
