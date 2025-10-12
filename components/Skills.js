import React, { useState, useEffect } from 'react';
import '../css/skills.css';

// Import icons
import htmlIcon from "../assests/techstack_icons/icons8-html-100.png";
import cssIcon from "../assests/techstack_icons/icons8-css-100.png";
import jsIcon from "../assests/techstack_icons/icons8-javascript-100.png";
import reactIcon from "../assests/techstack_icons/icons8-react-100.png";
import nodeIcon from "../assests/techstack_icons/icons8-nodejs-100.png";
import expressIcon from "../assests/techstack_icons/icons8-express-js-100.png";
import mongoIcon from "../assests/techstack_icons/icons8-mongodb-100.png";
import postgresIcon from "../assests/techstack_icons/icons8-postgresql-100.png";
import firebaseIcon from "../assests/techstack_icons/icons8-firebase-100.png";
import graphqlIcon from "../assests/techstack_icons/icons8-graphql-100.png";
import djangoIcon from "../assests/techstack_icons/icons8-django-100.png";
import pythonIcon from "../assests/techstack_icons/icons8-python-100.png";
import htmxIcon from "../assests/techstack_icons/icons8-html-100.png"; 
import chromeIcon from "../assests/techstack_icons/icons8-chrome-100.png";
import vscodeIcon from "../assests/techstack_icons/icons8-vs-code-100.png";
import githubIcon from "../assests/techstack_icons/icons8-github-100.png";
import netlifyIcon from "../assests/techstack_icons/icons8-netlify-100.png";

// Skill categories
const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "HTML", icon: htmlIcon },
      { name: "CSS", icon: cssIcon },
      { name: "JavaScript", icon: jsIcon },
      { name: "Python", icon: pythonIcon },
    ],
  },
  {
    category: "Frameworks / Libraries",
    skills: [
      { name: "React", icon: reactIcon },
      { name: "Node.js", icon: nodeIcon },
      { name: "Express.js", icon: expressIcon },
      { name: "Django", icon: djangoIcon },
      { name: "HTMX", icon: htmxIcon },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: mongoIcon },
      { name: "PostgreSQL", icon: postgresIcon },
      { name: "Firebase", icon: firebaseIcon },
      { name: "GraphQL", icon: graphqlIcon },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Chrome DevTools", icon: chromeIcon },
      { name: "VS Code", icon: vscodeIcon },
      { name: "GitHub", icon: githubIcon },
      { name: "Netlify", icon: netlifyIcon },
    ],
  },
];

// Memory game icons (subset of skills)
const memoryIcons = [htmlIcon, cssIcon, jsIcon, reactIcon, nodeIcon, expressIcon, mongoIcon, pythonIcon];

const Skills = () => {
  // Memory Game state
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Initialize game cards
  const shuffleCards = () => {
    const shuffled = [...memoryIcons, ...memoryIcons]
      .map(value => ({ value, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setDisableClicks(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleFlip = (index) => {
    if (disableClicks || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisableClicks(true);
      setAttempts(prev => prev + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.value === second.value) {
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setTimeout(() => setFlipped([]), 400);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }

      setTimeout(() => setDisableClicks(false), 1000);
    }
  };

  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-heading">Skills & Tools</h2>
      <div className="skills-table">
        {skillCategories.map((group, index) => (
          <div className="skills-category" key={index}>
            <h3>{group.category}</h3>
            <div className="skills-grid">
              {group.skills.map((skill, i) => (
                <div className="skill-card" key={i}>
                  <img src={skill.icon} alt={skill.name} title={skill.name} />
                  <span className="skill-label">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Memory Game */}
      <section className="memory-game-section">
        <h2>🎴 Tech Memory Game</h2>
        <p>Flip cards to match pairs of tech icons! Attempts: {attempts}</p>
        <button className="restart-button" onClick={shuffleCards}>🔄 Restart</button>
        <div className="memory-grid">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <div
                key={card.id}
                className={`memory-card ${isFlipped ? 'flipped' : ''} ${matched.includes(index) ? 'matched' : ''}`}
                onClick={() => handleFlip(index)}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front"></div>
                  <div className="memory-card-back">
                    <img src={card.value} alt="tech icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {matched.length === cards.length && <p className="win-text">🎉 Perfect! You matched all pairs in {attempts} attempts!</p>}
      </section>
    </section>
  );
};

export default Skills;
