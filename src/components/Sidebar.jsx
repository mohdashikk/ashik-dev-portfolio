import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Figma } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [activeNav, setActiveNav] = useState("#home");

    const navs = [
        { id: "home",       label: "home" },
        { id: "works",      label: "works" },
        { id: "skills",     label: "skills" },
        { id: "about-me",   label: "about-me" },
        { id: "experience", label: "experience" },
        { id: "contacts",   label: "contacts" },
    ];

    // Scroll-based active section detection
    useEffect(() => {
        const observers = [];

        navs.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveNav(`#${id}`);
                    }
                },
                { threshold: 0.15 }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

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
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <div className="logo-icon"></div>
                    <span>Ashik</span>
                </div>

                <nav className="sidebar-nav">
                    {navs.map((nav, idx) => (
                        <motion.a
                            key={idx}
                            href={`#${nav.id}`}
                            className={`nav-item ${activeNav === `#${nav.id}` ? "active" : ""}`}
                            onClick={() => {
                                setActiveNav(`#${nav.id}`);
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

