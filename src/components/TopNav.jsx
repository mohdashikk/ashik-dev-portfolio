import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function TopNav() {
    const [activeNav, setActiveNav] = useState("#home");
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navs = [
        { id: "home",       label: "home" },
        { id: "works",      label: "works" },
        { id: "skills",     label: "skills" },
        { id: "about-me",   label: "about-me" },
        { id: "career",     label: "career" },
        { id: "contacts",   label: "contacts" },
    ];

    // Scroll-based active section detection & scrolled state
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

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

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observers.forEach(o => o.disconnect());
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <div className={`top-nav-container ${scrolled ? "scrolled" : ""}`}>
                {/* Desktop Nav */}
                <nav className="top-nav desktop-only" data-snake-obstacle="true">
                    {navs.map((nav, idx) => (
                        <a
                            key={idx}
                            href={`#${nav.id}`}
                            className={`nav-item ${activeNav === `#${nav.id}` ? "active" : ""}`}
                        >
                            <span>#</span>{nav.label}
                        </a>
                    ))}
                </nav>

                {/* Mobile Hamburger Button */}
                <button className="mobile-menu-btn mobile-only" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div 
                            className="mobile-menu-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                        />
                        <motion.div 
                            className="mobile-menu-sidebar"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="mobile-menu-header">
                                <span className="logo-text"><span>#</span>ashik</span>
                                <button className="close-btn" onClick={closeMenu}><X size={24} /></button>
                            </div>
                            <nav className="mobile-nav-links">
                                {navs.map((nav, idx) => (
                                    <a
                                        key={idx}
                                        href={`#${nav.id}`}
                                        className={`mobile-nav-item ${activeNav === `#${nav.id}` ? "active" : ""}`}
                                        onClick={closeMenu}
                                    >
                                        <span>#</span>{nav.label}
                                    </a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
