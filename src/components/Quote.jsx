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
                    With great power comes great electricity bill
                </div>
                <div className="quote-author">- Dr. Who</div>
            </div>
        </motion.section>
    );
}
