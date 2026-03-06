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
        <div>
          <span className="section-number">03</span>
          <h2 className="section-title">
            <span>#</span>about-me
          </h2>
        </div>
        <motion.p variants={fadeInUp}>Hello, i'm Ashik!</motion.p>
        <motion.p variants={fadeInUp}>
          I'm Muhammed Ashik A, a self-taught Front-End Engineer and UI/UX
          Designer from Trivandrum, Kerala. I build responsive and modern web
          applications, focusing on clean user interfaces and seamless user
          experiences.
        </motion.p>
        <motion.p variants={fadeInUp}>
          I enjoy turning ideas into scalable digital products using
          technologies like React, Node.js, and modern JavaScript frameworks. My
          journey started with front-end development and UI/UX design, and over
          time I expanded into full-stack development, learning how to build
          complete applications from interface to backend.
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
