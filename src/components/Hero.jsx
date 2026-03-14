import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SnakeBackground from "./SnakeBackground";

// Step 0 = "Ashik Is", Step 1 = "Developer", Step 2 = "Designer"
const steps = ["Ashik", "Developer", "Designer"];

export default function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section hero-section" id="home">
      <SnakeBackground />
      {/* 
         Removed the dedicated fixed-size zone for snake avoidance 
         to allow for tighter collision matching the animated letters.
      */}

      <div className="hero-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className={`hero-stage-text ${step === 0 ? "text-cursive" : "text-block"}`}
            data-snake-obstacle="true"
            initial={{ opacity: 0, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, x: "-50%", y: "-60%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        className="hero-bottom-desc"
        data-snake-obstacle="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <span className="glitch-text">
          Front-End Developer and passionate full-stack learner. My journey in
          tech is driven by curiosity, creativity, and a constant desire to
          improve. Over the years, I’ve explored different technologies and
          grown into a developer who truly enjoys building smooth and intuitive
          digital experiences.
        </span>
      </motion.p>
    </section>
  );
}
