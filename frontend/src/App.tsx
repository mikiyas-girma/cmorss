import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GameBoard from "./Components/Board/MultiBoard";
import MinimaxGame from "./Components/Board/Aiboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-8">Tic-Tac-Toe</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multiplayer" element={<GameBoard />} />
          <Route path="/minimax" element={<MinimaxGame />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
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

export default App;
