import React, { useState, useEffect } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on window resize to > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="main-content">
        <MobileHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Hero />
          <Quote />
          <Projects />
          <Skills />
          <AboutMe />
          <Experience />
          <Contacts />
          <Footer />
        </div>
      </div>
    </div>
  );
}
