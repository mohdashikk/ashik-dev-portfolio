import React, { useState, useEffect } from "react";

export default function TopNav() {
    const [activeNav, setActiveNav] = useState("#home");
    const [scrolled, setScrolled] = useState(false);

    const navs = [
        { id: "home",       label: "home" },
        { id: "works",      label: "works" },
        { id: "skills",     label: "skills" },
        { id: "about-me",   label: "about-me" },
        { id: "experience", label: "experience" },
        { id: "contacts",   label: "contacts" },
    ];

    // Scroll-based active section detection & scrolled state
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
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

    return (
        <div className={`top-nav-container ${scrolled ? "scrolled" : ""}`}>
            <nav className="top-nav">
                {navs.map((nav, idx) => (
                    <a
                        key={idx}
                        href={`#${nav.id}`}
                        className={`nav-item ${activeNav === `#${nav.id}` ? "active" : ""}`}
                        onClick={() => setActiveNav(`#${nav.id}`)}
                    >
                        <span>#</span>{nav.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}

