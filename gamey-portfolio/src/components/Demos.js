import React from 'react';
import '../css/demos.css';

// Import images
import courtsImage from '../assests/courts.jpg';
import sqlImage from '../assests/sql demo.jpg';

const demos = [
  {
    title: 'GraphQL Pair Project',
    description: 'Collaborative demo app highlighting schema design, backend logic, and teamwork.',
    link: 'https://www.youtube.com/watch?v=uivo-eX-a7Y',
    image: courtsImage,
  },
  {
    title: 'JWT Auth Pair Project',
    description: 'Tutorial project built with a peer, focusing on secure login flows and route protection.',
    link: 'http://youtube.com/watch?v=Bb5CUmfDqWs',
    image: courtsImage,
  },
  {
    title: 'Shopping Cart SQL Demo',
    description: 'SQL-powered shopping cart app demonstrating database design and queries.',
    link: 'https://www.youtube.com/watch?v=9mU0H_AuJ1k&list=PLZAqoTx2Kcfvlz9XfcH42xdfpS4vNV1dP',
    image: sqlImage,
  },
];

const Demos = () => (
  <section id="demos" className="demo-section">
    <h2>🎮 Interactive Demos</h2>
    <div className="demo-grid">
      {demos.map((demo, index) => (
        <div className="demo-card" key={index}>
          <div className="demo-image-wrapper">
            <img src={demo.image} alt={demo.title} className="demo-image" />
          </div>
          <div className="demo-info">
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
            <a href={demo.link} target="_blank" rel="noopener noreferrer" className="demo-link">
              Watch Demo →
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Demos;
