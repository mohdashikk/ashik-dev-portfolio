import React from "react";

const Career = () => {
    const careerData = [
        {
            year: "2009",
            title: "First Spark with Code",
            description: "My programming journey began during school when I recreated the Google homepage using HTML and CSS. I also built small experimental applications out of curiosity—without realizing this simple curiosity would later shape my entire career."
        },
        {
            year: "2010 — 2018",
            title: "A Long Pause, But Not the End",
            description: "Like many journeys, mine had a pause. I stepped away from programming for a while, but the interest never fully disappeared—it stayed quietly in the background."
        },
        {
            year: "2019",
            title: "Discovering Design",
            description: "I started my professional journey as a UI/UX Designer at Hashwide, Kochi. This phase helped me understand user experience, visual hierarchy, and design thinking—building a strong creative foundation."
        },
        {
            year: "2020 — 2022",
            title: "Bridging Design & Development",
            description: "At Code9 Tech, I evolved into a UI/UX Developer. Here, I started connecting design with code—working with HTML, CSS, and JavaScript to build real interfaces and interactive experiences."
        },
        {
            year: "2022 — 2023",
            title: "Everything Clicked",
            description: "After returning seriously to programming, everything finally made sense. What once started as curiosity turned into passion.\nAt DataGuard NXT, I stepped into modern frontend development with React.js—learning component-based architecture and leveling up my JavaScript skills."
        },
        {
            year: "2023 — Present",
            title: "Building Real-World Products",
            description: "Currently working at eGlobe as a Front-End Engineer, I focus on building scalable, production-ready UI systems. I work on improving performance, usability, and creating seamless user experiences."
        },
        {
            year: "2024",
            title: "Expanding into Full-Stack Development",
            description: "Driven by passion, I moved beyond frontend and started building full-stack applications using Node.js, Express, and MySQL. I now design APIs, manage databases, and build complete end-to-end systems."
        },
        
        {
            year: "2025",
            title: "Building with Passion & Purpose",
            description: "I’m currently focused on building AI-powered applications, exploring how intelligent systems can enhance real-world user experiences. My goal is to create scalable, meaningful products that combine modern development with practical AI use cases."
        },
        {
            year: "Today",
            title: "More Than Just a Profession",
            description: "Today, I work as a Front-End Engineer with strong UI/UX expertise, while continuously growing as a full-stack developer.",
            subtext: "For me, full-stack development isn’t just a job—it’s something I genuinely love. I build not only for work, but for my own ideas, experiments, and curiosity."
        }
    ];

    return (
        <section className="section career-section" id="career">
            <div className="career-container">
                <div className="career-left">
                    <div className="career-sticky">
                        <span className="section-number">04</span>
                        <h2 className="career-heading"><span>#</span>career</h2>
                    </div>
                </div>

                <div className="career-right">
                    <div className="career-header-top">
                        <span className="career-slant">//CAREER</span>
                        <span className="career-overall-date">2009 — PRESENT</span>
                    </div>
                    <div className="career-timeline">
                        {careerData.map((item, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-date">
                                    <span>{item.year}</span>
                                </div>
                                <div className="timeline-line-container">
                                    <div className="timeline-dot"></div>
                                    {index !== careerData.length - 1 && <div className="timeline-line"></div>}
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-description">{item.description}</p>
                                    
                                    {item.projects && (
                                        <ul className="timeline-project-list">
                                            {item.projects.map((project, pIdx) => (
                                                <li key={pIdx}>{project}</li>
                                            ))}
                                        </ul>
                                    )}
                                    
                                    {item.footer && <p className="timeline-footer-text">{item.footer}</p>}
                                    {item.subtext && <p className="timeline-subtext">{item.subtext}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Career;
