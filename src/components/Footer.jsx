import React from "react";
import { motion } from "framer-motion";
import { Github, Figma, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div>
                    <div className="footer-logo-row">
                        <div className="logo-icon"></div>
                        <strong className="text-white" style={{ fontSize: "1.2rem" }}>
                            Elias
                        </strong>
                        <span className="footer-email" style={{ marginLeft: 15 }}>
                            elias@elias-dev.ml
                        </span>
                    </div>
                    <div className="footer-desc">
                        Web designer and front-end developer
                    </div>
                </div>
                <div>
                    <div className="footer-media-title">Media</div>
                    <div className="footer-social-links">
                        <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
                            <Github size={24} />
                        </motion.a>
                        <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
                            <Figma size={24} />
                        </motion.a>
                        <motion.a whileHover={{ y: -3, color: "#C778DD" }} href="#">
                            <Twitter size={24} />
                        </motion.a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">© Copyright 2026. Made by Elias</div>
        </footer>
    );
}
