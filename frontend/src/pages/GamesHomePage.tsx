import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const GamesPage: React.FC = () => {
  return (
    <div>
      <Link to="/multiplayer">
        <button className="px-4 py-2 bg-blue-500 text-white mb-4">
          Join a Game
        </button>
      </Link>
      <Link to="/minimax">
        <button className="px-4 py-2 bg-green-500 text-white">
          Play with AI
        </button>
      </Link>
    </div>
  );
};

export default GamesPage;
