import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../css/splash.css';

// Sounds
import smashSoundFile from '../assests/sounds/8-bit-punch.wav';
import coinSoundFile from '../assests/sounds/mario-coin-fx-8-bit_F_major.wav';
import tickSoundFile from '../assests/sounds/clock-ticking-sound_151bpm_E_minor.wav';
import gameOverSoundFile from '../assests/sounds/game-over-video-game-type-fx_200bpm_B_major.wav';
import winSoundFile from '../assests/sounds/703543__yoshicakes77__win.ogg';

export function SplashScreen({ onEnter }) {
  const [insertedCoin, setInsertedCoin] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [shake, setShake] = useState(false);
  const [winner, setWinner] = useState(false);
  const [smashedCount, setSmashedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lives, setLives] = useState(3);

  // Audio refs
  const smashSoundRef = useRef(null);
  const coinSoundRef = useRef(null);
  const tickSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);
  const winSoundRef = useRef(null);

  // Initialize audio once
  useEffect(() => {
    smashSoundRef.current = new Audio(smashSoundFile);
    coinSoundRef.current = new Audio(coinSoundFile);
    tickSoundRef.current = new Audio(tickSoundFile);
    gameOverSoundRef.current = new Audio(gameOverSoundFile);
    winSoundRef.current = new Audio(winSoundFile);

    // Optional: preload all sounds
    Object.values({
      smashSoundRef,
      coinSoundRef,
      tickSoundRef,
      gameOverSoundRef,
      winSoundRef
    }).forEach(ref => {
      ref.current.load();
    });
  }, []);

  const spawnBlocks = useCallback(() => {
    const newBlocks = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth * 0.8,
      y: Math.random() * (window.innerHeight * 0.6) + 100,
      broken: false,
      trick: Math.random() < 0.25,
      hits: 0,
      requiredHits: Math.random() < 0.5 ? 2 : 3
    }));
    setBlocks(newBlocks);
    setSmashedCount(0);
    setWinner(false);
  }, []);

  useEffect(() => {
    if (insertedCoin) {
      spawnBlocks();
      setLives(3);
      setTimeLeft(30);
    }
  }, [insertedCoin, spawnBlocks]);

  const handleLoseLife = useCallback(() => {
    tickSoundRef.current.pause();
    tickSoundRef.current.currentTime = 0;

    if (lives > 1) {
      setLives(l => l - 1);
      spawnBlocks();
      setTimeLeft(30);
    } else {
      const audio = gameOverSoundRef.current;
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setTimeout(onEnter, 1500);
    }
  }, [lives, spawnBlocks, onEnter]);

  // Timer
  useEffect(() => {
    if (!insertedCoin || winner) return;
    if (timeLeft <= 0) {
      handleLoseLife();
      return;
    }

    // Play tick sound exactly when hitting 10 seconds
    if (timeLeft === 10) {
      const tickAudio = tickSoundRef.current;
      tickAudio.currentTime = 0;
      tickAudio.play().catch(() => {});
    }

    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, insertedCoin, winner, handleLoseLife]);

  const handleSmash = (id) => {
    // Play smash sound
    const smashAudio = smashSoundRef.current;
    smashAudio.currentTime = 0;
    smashAudio.play().catch(() => {});

    setBlocks(prev => {
      const updated = prev.map(b => {
        if (b.id === id && !b.broken) {
          const hits = b.hits + 1;
          const isBroken = hits >= b.requiredHits;
          return {
            ...b,
            hits,
            broken: isBroken,
            x: Math.random() * window.innerWidth * 0.8,
            y: Math.random() * (window.innerHeight * 0.6) + 100
          };
        }
        return b;
      });

      const newSmashed = updated.filter(b => b.broken && !b.trick).length;
      setSmashedCount(newSmashed);

      if (updated.every(b => b.broken)) {
        setWinner(true);
        tickSoundRef.current.pause();
        tickSoundRef.current.currentTime = 0;

        const winAudio = winSoundRef.current;
        winAudio.currentTime = 0;
        winAudio.play().catch(() => {});

        setTimeout(onEnter, 2000);
      }

      return updated;
    });

    setShake(true);
    setTimeout(() => setShake(false), 200);
  };

  const handleCoinClick = () => {
    setInsertedCoin(true);
    const coinAudio = coinSoundRef.current;
    coinAudio.currentTime = 0;
    coinAudio.play().catch(() => {});
  };

  const normalBlocksCount = blocks.filter(b => !b.trick).length;
  const xpPercent = normalBlocksCount > 0 ? (smashedCount / normalBlocksCount) * 100 : 0;

  return (
    <div className={`smash-overlay ${shake ? 'shake' : ''}`}>
      {!insertedCoin ? (
        <div className="coin-screen">
          <div className="coin-welcome-container">
            <div className="coin" onClick={handleCoinClick}></div>
            <div className="welcome-text">
              <h2>Welcome to Cadee Rousseau's portfolio!</h2>
              <p>Complete the game to get access to the portfolio.</p>
              
              <p>Rules:</p>
              <ul>
                <li>You have <strong>3 lives</strong>.</li>
                <li>The timer is <strong>30 seconds.</strong>.</li>
                <li>Click the blocks to smash them!</li>
                <li>All blocks require multiple hits!</li>
                <li>After 3 unsuccessful attempts, the portfolio will open automatically. </li>
                <li>Tap the coin to start the game.</li>
                <li>GOOD LUCK!</li>
                
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* HUD */}
          <div className="hud">
            <span>LEVEL 1</span>
            <span>SCORE: {smashedCount * 100}</span>
            <span>XP: {Math.round(xpPercent)}%</span>
            <span>LIVES: {lives}</span>
            <span style={{ color: timeLeft <= 10 ? 'red' : undefined, fontWeight: timeLeft <= 10 ? 'bold' : undefined }}>
              TIMER: {timeLeft}s
            </span>
          </div>

          {/* Blocks */}
          <div className="block-container">
            {blocks.map(b =>
              !b.broken ? (
                <div
                  key={b.id}
                  className={`block ${b.trick ? 'trick-block' : ''} ${b.hits > 0 ? 'hit' : ''}`}
                  style={{
                    top: `${b.y}px`,
                    left: `${b.x}px`,
                    transition: 'all 0.3s ease',
                    background: b.trick
                      ? `linear-gradient(145deg, rgba(255,0,255,${1 - b.hits / b.requiredHits}), rgba(255,85,255,${1 - b.hits / b.requiredHits}))`
                      : undefined,
                    boxShadow: b.trick
                      ? `0 0 ${20 + b.hits * 10}px #ff00ff, inset 0 0 ${10 + b.hits * 5}px #ff55ff`
                      : undefined
                  }}
                  onClick={() => handleSmash(b.id)}
                />
              ) : (
                <React.Fragment key={b.id}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className={`fragment fragment${n}`} style={{ top: `${b.y}px`, left: `${b.x}px` }} />
                  ))}
                </React.Fragment>
              )
            )}
          </div>

          {/* XP Bar */}
          <div className="xp-loader">
            <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
          </div>

          {winner && <div className="winner-popup">LEVEL COMPLETE!! </div>}
        </>
      )}
    </div>
  );
}
