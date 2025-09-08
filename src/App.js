import React from 'react';

function Header() {
  return React.createElement(
    'header',
    { style: { backgroundColor: '#0a0a0a', padding: '1rem' } },
    React.createElement(
      'h1',
      { style: { color: '#b084f7', fontFamily: 'Orbitron, sans-serif' } },
      'Cadee’s Gamey Portfolio'
    )
  );
}

export default Header;