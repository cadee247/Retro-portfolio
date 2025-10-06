import React, { useState } from 'react';
import { Intro } from './components/Intro.js';
import { About } from './components/About.js';
import Projects from './components/Projects.js';
import Skills from './components/Skills.js';
import Certificates from './components/Certificates.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import Demos from './components/Demos.js'; 

import { SplashScreen } from './components/SplashScreen.js'; // ✅ named import
 // ✅ Insert Coin Splash

import './css/global.css';
import './css/navbar.css';
import './css/splash.css'; // ✅ Splash screen CSS

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <div id="app">
      {/* Splash Screen */}
      {!hasEntered && <SplashScreen onEnter={handleEnter} />}

      {/* Main Content */}
      {hasEntered && (
        <>
          {/* Navbar */}
          <nav className="pixel-navbar">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#demos">Demos</a></li>
              <li><a href="#certificates">Certificates</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          {/* Page Sections */}
          <Intro />
          <About />
          <Skills />
          <Projects />
          <Demos />
          <Certificates />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
