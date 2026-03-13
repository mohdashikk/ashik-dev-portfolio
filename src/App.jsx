import React from "react";
import "./App.css";

import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Quote from "./components/Quote";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="app-container">
      <TopNav />

      <div className="main-content">
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
