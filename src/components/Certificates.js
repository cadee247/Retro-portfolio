import React, { useState } from 'react';
import Modal from 'react-modal';
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

Modal.setAppElement('#root');

const certificates = [
  { title: 'Intro to Programming', provider: 'Code College', link: IntroCert },
  { title: 'Python Certificate', provider: 'Code College', link: PythonCert },
  { title: 'HTMX Certificate', provider: 'Code College', link: HtmxCert },
  { title: 'Node.js Certificate', provider: 'Code College', link: NodeCert },
  { title: 'React Certificate', provider: 'Code College', link: ReactCert },
  { title: 'MERN Stack Certificate', provider: 'Code College', link: MernCert },
  { title: 'SQL Certificate', provider: 'Code College', link: SqlCert },
  { title: 'Introduction to Artificial Intelligence', provider: 'IBM SkillsBuild', link: SkillsBuildCert },
];

const Certificates = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const openModal = (cert) => {
    setActiveCert(cert);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveCert(null);
  };

  return (
    <section id="certificates">
      <h2>Certifications</h2>
      <div>
        {certificates.map((cert, index) => (
          <div key={index}>
            <img src={FallbackImage} alt={cert.title} />
            <h3>{cert.title}</h3>
            <p>{cert.provider}</p>
            <button onClick={() => openModal(cert)}>View Certificate</button>
          </div>
        ))}
      </div>

      {activeCert && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Certificate Viewer"
        >
          <h2>{activeCert.title}</h2>
          <object
            data={activeCert.link}
            type="application/pdf"
            width="100%"
            height="600px"
          >
            <p>
              Your browser can't display this PDF. You can{' '}
              <a href={activeCert.link} target="_blank" rel="noopener noreferrer">
                download it here
              </a>.
            </p>
          </object>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </section>
  );
};

export default Certificates;
