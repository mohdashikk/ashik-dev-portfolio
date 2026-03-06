import React from "react";

export default function Experience() {

    const experiences = [
        {
            title: "Front-End Developer",
            company: "EGlobe IT Solution",
            date: "Jul 2023 — Present",
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
                "Crafted responsive web designs that boosted user engagement by 30%.",
            ],
        },
        {
            title: "Front-End Developer",
            company: "DataGuard NXT",
            date: "Sep 2022 — May 2023",
            points: [
                "Developed modern, responsive web applications using React.js.",
                "Integrated backend APIs and handled dynamic data rendering.",
                "Built reusable React components using React Hooks.",
                "Improved UI consistency and usability across multiple application modules.",
                "Collaborated with senior developers to follow best coding practices.",
                "Enhanced understanding of component-based architecture and state management.",
            ],
        },
        {
            title: "UI/UX Designer & Developer",
            company: "Code9 Tech",
            date: "Dec 2020 — Sep 2022",
            points: [
                "Designed and developed complete websites from concept to deployment.",
                "Created wireframes, UI layouts, and interactive prototypes.",
                "Converted UI designs into pixel-perfect, responsive web pages using HTML, CSS, and JavaScript.",
                "Worked on branding, visual design, and website layouts.",
                "Collaborated with development teams to ensure design feasibility and usability.",
                "Ensured consistent design systems and user-centered experiences across projects.",
            ],
        },
        {
            title: "UI/UX Designer",
            company: "Hashwide Pvt Ltd",
            date: "Jun 2019 — Mar 2020",
            points: [
                "Worked on branding, UI designs, and website layouts. Collaborated with development teams to ensure design feasibility.",
            ],
        },
    ];

    return (
        <section className="section experience-section" id="experience">
            <div className="experience-container">
                {/* Left Side: Sticky Title */}
                <div className="experience-left">
                    <div className="experience-sticky">
                        <span className="section-number">04</span>
                        <h2 className="experience-heading"><span>#</span>experience</h2>
                    </div>
                </div>

                {/* Right Side: Scrolling Content */}
                <div className="experience-right">
                    <div className="experience-header-top">
                        <span className="experience-slant">//EXPERIENCE</span>
                        <span className="experience-overall-date">2019 - PRESENT</span>
                    </div>

                    <div className="experience-list">
                        {experiences.map((exp, idx) => (
                            <div className="experience-block" key={idx}>
                                <div className="experience-block-header">
                                    <h3 className="experience-company-title">
                                        <span style={{ color: "var(--accent-color)" }}>#</span>
                                        {exp.company.toLowerCase()}
                                    </h3>
                                    <h4 className="experience-role">{exp.title.toLowerCase()}</h4>
                                </div>
                                <div className="experience-block-meta">
                                    <span className="experience-block-date">{exp.date}</span>
                                </div>
                                <div className="experience-block-content">
                                    {exp.points.map((pt, pIdx) => (
                                        <p key={pIdx} className="experience-paragraph">{pt}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
