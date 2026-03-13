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
         Added a dedicated, fixed-size zone for snake avoidance. 
         This ensures the snake stays clear of the area regardless of whether the word is short (Ashik) or long (Developer).
      */}
      <div 
        className="hero-collision-zone" 
        data-snake-obstacle="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(95vw, 1100px)', // Prereserve space for longest words
          height: '35vh',            // Taller to fully cover the vertical movement
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -1
        }} 
      />

      <div className="hero-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className={`hero-stage-text ${step === 0 ? "text-cursive" : "text-block"}`}
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
        Front-End Developer and passionate full-stack learner. My journey in
        tech is driven by curiosity, creativity, and a constant desire to
        improve. Over the years, I’ve explored different technologies and
        grown into a developer who truly enjoys building smooth and intuitive
        digital experiences.
      </motion.p>
    </section>
  );
}
