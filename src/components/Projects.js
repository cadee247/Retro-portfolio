import React from 'react';
import '../css/projects.css';

// Import images
import skineticImg from '../assests/skinetic.jpg';
import guessingImg from '../assests/guessinggame.jpg';
import expenseImg from '../assests/expense tracker.jpg';
import todoImg from '../assests/todolist.jpg';
import nodeImage from '../assests/node.jpg'; // correct relative path from Projects.js



const clientProjects = [
  {
    title: 'Sweet Sprinkled Bakery',
    description:
      'Whimsical site for a local baker—crafted with joyful UI, pastel palettes, and sprinkle-powered navigation.',
    link: 'https://sweet-sprinkled.onrender.com',
  },
];

const personalProjects = [
  {
    title: 'to-do list (HTMX)',
    description: 'Task board that lets users create, move, and organize tasks between columns like "To Do," "In Progress," and "Done." Tasks update live without reloading the page, using HTMX.',
    link: 'https://imaginative-alpaca-3f6649.netlify.app/',
    github: 'https://github.com/cadee247/HTMX-PROJECT',
    image: todoImg,
  },
  {
    title: 'Guessing Game (Python)',
    description: 'Fun number guessing game built with Python + Flask.',
    link: 'https://guessing-gamer.onrender.com/',
    github: 'https://github.com/cadee247/python-project-2',
    image: guessingImg,
  },
{
  title: 'Blog Platform (Node.js)',
  description: 'Minimal blog engine powered by Node.js and Express.',
  link: 'https://blog-post-9dik.onrender.com/',
  github: 'https://github.com/cadee247/python-project-2',
  image: nodeImage
},

  {
    title: 'Expense Tracker (React + Firebase)',
    description: 'Built with React and Firebase. Tracks personal expenses in real-time with authentication and Firestore sync.',
    link: 'https://golden-queijadas-554e24.netlify.app/dashboard',
    github: 'https://github.com/cadee247/Expense-Tracker',
    image: expenseImg,
  },
  {
    title: 'Skinetic App (MERN)',
    description: 'Full-stack MERN application Skinetic builds your perfect routine in seconds. Just pick your product, skin type, and time of the day, and it reveals exactly how the product benefits your skin.',
    link: 'https://skinetic-1-duza.onrender.com/',
    github: 'https://github.com/cadee247/SKINETIC',
    image: skineticImg,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="project-section">
      <h2>Featured Projects</h2>

      {/* Client Work */}
      <div className="project-category">
        <h3>🧑‍💼 Client Work</h3>
        <div className="project-grid">
          {clientProjects.map((project, index) => (
            <div className="project-card" key={`client-${index}`}>
              {project.image && (
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
              )}
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Visit Site →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personal Experiments */}
      <div className="project-category">
        <h3>🎨 Personal Experiments</h3>
        <div className="project-grid">
          {personalProjects.map((project, index) => (
            <div className="project-card" key={`personal-${index}`}>
              {project.image && (
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                </div>
              )}
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Visit Site →
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
