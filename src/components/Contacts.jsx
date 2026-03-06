import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { fadeInUp } from "../utils/animations";

export default function Contacts() {
    return (
        <section className="section" id="contacts">
            <div>
                <span className="section-number">05</span>
                <h2 className="section-title">
                    <span>#</span>contacts
                </h2>
            </div>
            <div className="contacts-container">
                <motion.div
                    className="contacts-text"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <p>
                       I'm open to discussing new opportunities, collaborations, or interesting projects. If you have a question or would like to work together, feel free to reach out.

                    </p>
                </motion.div>

                <motion.div
                    className="contacts-box"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ borderColor: "#C778DD" }}
                >
                    <div className="contacts-box-title">Message me here</div>
                    <a href="https://discord.com/users/ashikrahman8333" target="_blank" rel="noreferrer" className="contact-item">
                        <SiDiscord size={18} /> ashikrahman8333
                    </a>
                    <a href="mailto:mail4ashh@gmail.com" className="contact-item">
                        <Mail size={18} /> mail4ashh@gmail.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
