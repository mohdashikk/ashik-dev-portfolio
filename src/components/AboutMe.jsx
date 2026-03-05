import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function AboutMe() {
    return (
        <section className="section about-container" id="about-me">
            <motion.div
                className="about-text"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <h2 className="section-title">
                    <span>#</span>about-me
                </h2>
                <motion.p variants={fadeInUp}>Hello, i'm Elias!</motion.p>
                <motion.p variants={fadeInUp}>
                    I'm a self-taught front-end developer based in Kyiv, Ukraine. I can
                    develop responsive websites from scratch and raise them into modern
                    user-friendly web experiences.
                </motion.p>
                <motion.p variants={fadeInUp}>
                    Transforming my creativity and knowledge into websites has been my
                    passion for over a year. I have been helping various clients to
                    establish their presence online. I always strive to learn about the
                    newest technologies and frameworks.
                </motion.p>
                <motion.div variants={fadeInUp} style={{ marginTop: 25 }}>
                    <motion.button whileHover={{ scale: 1.05 }} className="btn-primary">
                        Read more{" "}
                        <ArrowRight
                            size={16}
                            style={{ verticalAlign: "middle", marginLeft: 8 }}
                        />
                    </motion.button>
                </motion.div>
            </motion.div>
            <motion.div
                className="about-image-wrapper"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <div
                    className="dots-pattern"
                    style={{ top: 50, left: 10, zIndex: 3 }}
                ></div>
                <div
                    className="dots-pattern"
                    style={{ bottom: 20, right: 30, zIndex: 1 }}
                ></div>
                <img src="/dark_about.png" alt="Elias" />
            </motion.div>
        </section>
    );
}
