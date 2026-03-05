import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fadeInUp } from "../utils/animations";

export default function Experience() {
    const experiences = [
        {
            title: "Front-End Developer",
            company: "EGlobe IT Solution",
            date: "Jul 2023 — Present",
            location: "Trivandrum",
            points: [
                "Developing and maintaining scalable SaaS-based web applications using React.js and modern JavaScript (ES6+).",
                "Building reusable, modular, and maintainable front-end architectures for long-term product scalability.",
                "Converting complex Figma UI/UX designs into responsive, pixel-perfect interfaces.",
                "Implementing UI using Sass, Less, and Tailwind CSS following best design practices.",
                "Integrating RESTful APIs developed with Node.js and Express.",
                "Implementing authentication flows and role-based UI access.",
                "Optimizing application performance, accessibility, and cross-browser compatibility.",
                "Collaborating closely with backend developers, designers, and product teams.",
                "Participating in feature planning, UI enhancements, and continuous product improvements.",
                "Crafted responsive web designs that boosted user engagement by 30%."
            ]
        },
        {
            title: "Front-End Developer",
            company: "DataGuard NXT",
            date: "Sep 2022 — May 2023",
            location: "Kochi",
            points: [
                "Developed modern, responsive web applications using React.js.",
                "Integrated backend APIs and handled dynamic data rendering.",
                "Built reusable React components using React Hooks.",
                "Improved UI consistency and usability across multiple application modules.",
                "Collaborated with senior developers to follow best coding practices.",
                "Enhanced understanding of component-based architecture and state management."
            ]
        },
        {
            title: "UI/UX Designer & Developer",
            company: "Code9 Tech",
            date: "Dec 2020 — Sep 2022",
            location: "Kochi",
            points: [
                "Designed and developed complete websites from concept to deployment.",
                "Created wireframes, UI layouts, and interactive prototypes.",
                "Converted UI designs into pixel-perfect, responsive web pages using HTML, CSS, and JavaScript.",
                "Worked on branding, visual design, and website layouts.",
                "Collaborated with development teams to ensure design feasibility and usability.",
                "Ensured consistent design systems and user-centered experiences across projects."
            ]
        },
        {
            title: "UI/UX Designer",
            company: "Hashwide Pvt Ltd",
            date: "Jun 2019 — Mar 2020",
            location: "Kochi",
            points: [
                "Worked on branding, UI designs, and website layouts. Collaborated with development teams to ensure design feasibility."
            ]
        }
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExperience = (idx) => {
        if (expandedIndex === idx) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(idx);
        }
    };

    return (
        <section className="section" id="experience">
            <h2 className="section-title">
                <span>#</span>experience
            </h2>

            <div className="experience-wrapper">
                <div className="experience-timeline">
                    {experiences.map((exp, idx) => {
                        const isItemExpanded = expandedIndex === idx;

                        return (
                            <motion.div
                                className={`experience-item ${isItemExpanded ? "expanded" : ""}`}
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInUp}
                            >
                                <div className="experience-dot"></div>
                                <div
                                    className="experience-content"
                                    onClick={() => toggleExperience(idx)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="experience-header" style={{ marginBottom: isItemExpanded ? "25px" : "0" }}>
                                        <div>
                                            <h3 className="experience-title">{exp.title}</h3>
                                            <span className="experience-company">@ {exp.company}</span>
                                        </div>
                                        <div className="experience-meta">
                                            <span className="experience-date">{exp.date}</span>
                                            <span
                                                className="experience-location"
                                                style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}
                                            >
                                                {exp.location}
                                                {isItemExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`experience-details ${isItemExpanded ? "show" : ""}`}>
                                        <ul className="experience-points">
                                            {exp.points.map((pt, pIdx) => (
                                                <li key={pIdx}>{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
