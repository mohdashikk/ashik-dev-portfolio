import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Fixed-size container — absolute positioning inside prevents any layout shift */}
      <div className="hero-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className={`hero-stage-text ${step === 0 ? "text-cursive" : "text-block"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>

        {/* Bottom description */}
        <motion.p
          className="hero-bottom-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Front-End Developer and passionate full-stack learner. My journey in
          tech is driven by curiosity, creativity, and a constant desire to
          improve. Over the years, I’ve explored different technologies and
          grown into a developer who truly enjoys building smooth and intuitive
          digital experiences.
        </motion.p>
      </div>
    </section>
  );
}
