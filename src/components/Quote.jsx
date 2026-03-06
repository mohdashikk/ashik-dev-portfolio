import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

export default function Quote() {
    return (
        <motion.section
            className="quote-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
        >
            <div className="quote-content">
                <div className="quote-box">
                    The only way to do great work is to love what you do.
                </div>
                <div className="quote-author">- Steve Jobs</div>
            </div>
        </motion.section>
    );
}
