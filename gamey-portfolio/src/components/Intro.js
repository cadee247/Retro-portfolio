import React, { useState, useEffect, useRef } from 'react';
import '../css/intro.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

export function Intro() {
  const handlePhoneClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("+27791983027");
    alert("Phone number copied to clipboard!");
  };

  const [moles, setMoles] = useState(Array(9).fill(null));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [combo, setCombo] = useState(0);
  const timeoutRefs = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const showMoles = () => {
    const newMoles = Array(9).fill(null);
    const moleCount = Math.random() < 0.7 ? 1 : 2; // mostly 1, sometimes 2
    const indices = [];

    for (let i = 0; i < moleCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * 9);
      } while (indices.includes(randomIndex));
      indices.push(randomIndex);

      const isFake = Math.random() < 0.15; // 15% bomb chance
      newMoles[randomIndex] = isFake ? 'fake' : 'real';
    }

    setMoles(newMoles);

    // Hide after 1.5 seconds
    const hideTimeout = setTimeout(() => {
      setMoles(Array(9).fill(null));
    }, 1500);

    timeoutRefs.current.push(hideTimeout);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setGameActive(true);
    setMoles(Array(9).fill(null));
    clearAllTimeouts();
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      clearAllTimeouts();
    }
  }, [timeLeft, gameActive]);

  // Random appearance every 1–2 seconds
  useEffect(() => {
    if (gameActive) {
      const spawnLoop = () => {
        showMoles();
        const delay = Math.random() * 1000 + 1000; // 1–2s between spawns
        const id = setTimeout(spawnLoop, delay);
        timeoutRefs.current.push(id);
      };
      spawnLoop();
      return clearAllTimeouts;
    }
  }, [gameActive]);

  const whackMole = (index) => {
    const type = moles[index];
    if (!type || !gameActive) return;

    if (type === 'real') {
      setScore(s => s + 1);
      setCombo(c => {
        const newCombo = c + 1;
        if (newCombo >= 3) {
          setScore(s => s + 2); // combo bonus
          return 0;
        }
        return newCombo;
      });
    } else {
      setScore(s => Math.max(0, s - 2));
      setCombo(0);
    }

    setMoles(prev => {
      const newMoles = [...prev];
      newMoles[index] = null;
      return newMoles;
    });
  };

  return (
    <section className="intro">
      <h1>Hi there 👋, my name is Cadee Rousseau.</h1>
      <p>
        <strong>Full-Stack Developer & Software Engineer:</strong><br />
        Skilled in MERN-Stack and Java, with experience in Python and Htmx.<br />
        <em>Johannesburg, Gauteng</em>
      </p>

      <div className="contact-links">
        <a href="https://www.linkedin.com/in/cadee-rousseau-bb59bb382" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} /> LinkedIn
        </a>
        <a href="https://github.com/cadee247" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} /> GitHub
        </a>
        <a href="mailto:cadee.dev@outlook.com">
          <FaEnvelope size={20} /> Email Me
        </a>
        <a href="tel:+27791983027" onClick={handlePhoneClick}>
          <FaPhone size={20} /> Call Me
        </a>
      </div>

      {/* Whack-a-Mole Game */}
      <div className="whack-game">
        <div className="game-info">
          <div className="score">Score: {score}</div>
          <div className="timer">Time: {timeLeft}s</div>
        </div>

        {!gameActive && (
          <button className="start-btn" onClick={startGame}>
            {timeLeft === 0 ? 'Play Again' : 'Start Game'}
          </button>
        )}

        {timeLeft === 0 && (
          <div className="game-over">
            <h3>{score >= 18 ? '🎉 You Win!' : 'Game Over!'}</h3>
            <p>Final Score: {score}</p>
          </div>
        )}

        <div className="mole-grid">
          {moles.map((type, index) => (
            <div
              key={index}
              className={`mole-hole ${type ? 'active' : ''}`}
              onClick={() => whackMole(index)}
            >
              {type === 'real' && <div className="mole">🦫</div>}
              {type === 'fake' && <div className="mole fake">🧨</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
