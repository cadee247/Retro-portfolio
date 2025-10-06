import React from 'react';
import '../css/certificate.css';

// Local certificate imports
import NodeCert from '../certificates/Cadee Rousseau  Node.js.pdf';
import SkillsBuildCert from '../certificates/Completion Certificate _ SkillsBuild.pdf';
import HtmxCert from '../certificates/htmx cert.pdf';
import IntroCert from '../certificates/intro.pdf';
import PythonCert from '../certificates/python cert.pdf';
import MernCert from '../certificates/Cadee Rousseau  MERN Stack.pdf';
import ReactCert from '../certificates/Cadee Rousseau  React.pdf';
import SqlCert from '../certificates/Cadee Rousseau  SQL.pdf';

// Fallback image import
import FallbackImage from '../assests/certificate.jpg';

const certificates = [
  {
    title: 'Intro to Programming',
    provider: 'Code College',
    link: IntroCert,
  },
  {
    title: 'Python Certificate',
    provider: 'Code College',
    link: PythonCert,
  },
  {
    title: 'HTMX Certificate',
    provider: 'Code College',
    link: HtmxCert,
  },
  {
    title: 'Node.js Certificate',
    provider: 'Code College',
    link: NodeCert,
  },
  {
    title: 'React Certificate',
    provider: 'Code College',
    link: ReactCert,
  },
  {
    title: 'MERN Stack Certificate',
    provider: 'Code College',
    link: MernCert,
  },
  {
    title: 'SQL Certificate',
    provider: 'Code College',
    link: SqlCert,
  },
  {
    title: 'Introduction to Artificial Intelligence',
    provider: 'IBM SkillsBuild',
    link: SkillsBuildCert,
  },
];

const Certificates = () => (
  <section id="certificates" className="certificates-section">
    <h2>Certifications</h2>
    <div className="cert-grid">
      {certificates.map((cert, index) => (
        <div className="cert-card" key={index}>
          <img
            src={FallbackImage}
            alt={cert.title}
          />
          <h3>{cert.title}</h3>
          <p>{cert.provider}</p>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-link"
          >
            View Certificate
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Certificates;