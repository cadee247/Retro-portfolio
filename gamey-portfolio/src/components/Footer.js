import React, { useEffect, useRef } from 'react';
import '../css/footer.css';

const Footer = () => {
  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const footer = footerRef.current;

    const colors = [
      '#ff69b4', '#00d4ff', '#ff1744', '#ffd700',
      '#7a4ccf', '#00ff00', '#ffcc00', '#ff00ff',
      '#00ffff', '#ff4500', '#ff6ec7', '#8a2be2',
      '#00fa9a', '#ff8c00', '#dc143c', '#1e90ff',
      '#adff2f', '#ff1493', '#00ced1', '#ff6347',
      '#ffb6c1', '#32cd32', '#ff00aa', '#ffa500',
      '#00ffcc', '#ff007f', '#66ff66', '#ff3300',
      '#cc00ff', '#33ccff'
    ];

    // ✅ Check if footer is visible
    const isFooterInView = () => {
      const rect = footer.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    // 🎆 Firework launch
    const launchFirework = (startX, startY) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const targetY = Math.random() * -300 - 150;

      const rocket = document.createElement('div');
      rocket.className = 'rocket';
      rocket.style.left = `${startX}px`;
      rocket.style.top = `${startY}px`;
      rocket.style.setProperty('--color', color);
      rocket.style.setProperty('--launch-distance', `${targetY}px`);
      container.appendChild(rocket);

      setTimeout(() => {
        createExplosion(startX, startY + targetY, color);
        rocket.remove();
      }, 1000);
    };

    // 💥 Explosion effect
    const createExplosion = (x, y, color) => {
      const flash = document.createElement('div');
      flash.className = 'explosion-flash';
      flash.style.left = `${x}px`;
      flash.style.top = `${y}px`;
      flash.style.setProperty('--color', color);
      container.appendChild(flash);
      setTimeout(() => flash.remove(), 300);

      // Rings
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ring = document.createElement('div');
          ring.className = 'ring';
          ring.style.left = `${x}px`;
          ring.style.top = `${y}px`;
          ring.style.setProperty('--color', color);
          container.appendChild(ring);
          setTimeout(() => ring.remove(), 1000);
        }, i * 100);
      }

      // Particles
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 80 + Math.random() * 70;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const duration = 1.5 + Math.random() * 0.5;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--color', color);
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--duration', `${duration}s`);
        container.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
      }
    };

    // 🎇 Manual click celebration
    const handleFooterClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const offsetX = x + Math.random() * 60 - 30;
          const offsetY = y + Math.random() * 60 - 30;
          launchFirework(offsetX, offsetY);
        }, i * 200);
      }
    };

    footer.addEventListener('click', handleFooterClick);

    // 🧠 Controlled fireworks only when visible
    let interval = null;

    const startFireworks = () => {
      if (interval) return; // don’t double start
      interval = setInterval(() => {
        if (isFooterInView()) {
          const x = Math.random() * window.innerWidth;
          const y = window.innerHeight - 50;
          launchFirework(x, y);
        }
      }, 1200); // one firework every 1.2 seconds
    };

    const stopFireworks = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    // Use IntersectionObserver for smooth control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startFireworks();
          else stopFireworks();
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => {
      footer.removeEventListener('click', handleFooterClick);
      stopFireworks();
      observer.disconnect();
    };
  }, []);

  return (
    <footer className="pixel-footer" ref={footerRef}>
      <div id="firework-container" className="firework-container" ref={containerRef}></div>
      <div className="footer-end-screen">
        <p className="footer-title">✨ GAME OVER ✨</p>
        <p className="footer-subtext">Thanks for playing in Cadee's Codeverse</p>
        <p className="footer-score">
          Final Score: <span className="score-points">∞</span>
        </p>
        <p className="footer-restart">Click anywhere to celebrate 🎆</p>
      </div>
    </footer>
  );
};

export default Footer;
