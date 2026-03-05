import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail } from "lucide-react";
import { fadeInUp } from "../utils/animations";

export default function Contacts() {
    return (
        <section className="section" id="contacts">
            <h2 className="section-title">
                <span>#</span>contacts
            </h2>
            <div className="contacts-container">
                <motion.div
                    className="contacts-text"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <p>
                        I'm interested in freelance opportunities. However, if you have
                        other request or question, don't hesitate to contact me
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
                    <a href="#" className="contact-item">
                        <MessageSquare size={18} /> !Elias#3519
                    </a>
                    <a href="#" className="contact-item">
                        <Mail size={18} /> elias@elias.me
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
