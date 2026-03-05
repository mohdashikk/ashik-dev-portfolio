import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function Hero() {
    return (
        <section className="section hero-section" id="home">
            <motion.div
                className="hero-content"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.h1 className="hero-title" variants={fadeInUp}>
                    Elias is a <span className="highlight">web designer</span> and{" "}
                    <span className="highlight">front-end developer</span>
                </motion.h1>
                <motion.p className="hero-desc" variants={fadeInUp}>
                    He crafts responsive websites where technologies meet creativity
                </motion.p>
                <motion.div variants={fadeInUp}>
                    <motion.button
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact me!!
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-image-box"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <img
                    src="/dark_hero.png"
                    alt="Hero Illustration"
                    className="hero-image"
                />
                <motion.div
                    className="hero-status"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className="status-dot"></div>
                    <div className="status-text">
                        Currently working on <b>Portfolio</b>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
