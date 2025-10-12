import React, { useState, useEffect } from 'react';
import '../css/about.css';

export function About() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X'); // default player
  const [computer, setComputer] = useState('O');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  // Check winner
  useEffect(() => {
    for (let combo of winningCombos) {
      const [a,b,c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) setWinner('Tie');
  }, [board]);

  // Smart computer move
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const newBoard = [...board];

      const findBestMove = (side) => {
        // Try to win
        for (let combo of winningCombos) {
          const [a,b,c] = combo;
          const values = [newBoard[a], newBoard[b], newBoard[c]];
          if (values.filter(v => v === side).length === 2 && values.includes(null)) {
            return combo[values.indexOf(null)];
          }
        }
        return null;
      };

      // Win if possible
      let move = findBestMove(computer);
      // Block if player is about to win
      if (move === null) move = findBestMove(player);
      // Take center
      if (move === null && newBoard[4] === null) move = 4;
      // Take corner
      const corners = [0,2,6,8].filter(i => newBoard[i] === null);
      if (move === null && corners.length > 0) move = corners[Math.floor(Math.random()*corners.length)];
      // Take any free cell
      const empties = newBoard.map((v,i)=>v===null?i:null).filter(v=>v!==null);
      if (move === null && empties.length>0) move = empties[Math.floor(Math.random()*empties.length)];

      if (move !== null) {
        newBoard[move] = computer;
        setTimeout(() => { // slight delay for realism
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }, 400);
      }
    }
  }, [isPlayerTurn, board, computer, winner]);

  const handleCellClick = (index) => {
    if (!board[index] && isPlayerTurn && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <section id="about" className="about-section">
      <h2 data-text="ABOUT ME">ABOUT ME</h2>
      <p>
        Hi, my name is Cadee Rousseau. I'm in the IT field with hands-on experience in software development from Code College. I chose this career path because technology is always advancing and so is the world. Creating apps that help people in their daily lives makes it exciting and meaningful. It inspires me to keep going.
        <br /><br />
        Mixing design with technology is where the fun really begins, it unlocks your creative side and lets you build things that feel personal and joyful. Coding grew on me this year as I explored and experimented with different frameworks, learning how to bring ideas to life through clean, functional, and playful interfaces.
      </p>
      <ul className="additional-info">
        <li>🌍 Community-minded – I build joyful tech for real humans.</li>
        <li>🗣️ Clear communicator – I explain my code with clarity and confidence.</li>
        <li>📚 Always open to learning and leveling up – curiosity fuels my code.</li>
        <li>🤝 Team player – check out the Demo section for proof.</li>
        <li>🎯 Goal-oriented and deadline-driven – I ship on time, every time.</li>
        <li>🗂️ Organized file structure – no mystery folders, no casing drama.</li>
      </ul>

      {/* Tic-Tac-Toe */}
      <div className="tic-tac-toe">
        <h3>Play Tic-Tac-Toe 🎮</h3>
        <p>You are <strong>{player}</strong> | Computer is <strong>{computer}</strong></p>
        <div className="board">
          {board.map((cell, idx) => (
            <div key={idx} className="cell" onClick={() => handleCellClick(idx)}>
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="winner">
            {winner === 'Tie' ? "It's a tie!" : winner === player ? "You won!" : "Computer wins!"}
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </section>
  );
}
