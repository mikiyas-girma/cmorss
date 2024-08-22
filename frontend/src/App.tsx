import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GamesPage from './pages/GamesHomePage';
import GameBoard from "./Components/Board/MultiBoard";
import MinimaxGame from "./Components/Board/Aiboard";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-8">Tic-Tac-Toe</h1>
        <Routes>
          <Route path="/" element={<GamesPage />} />
          <Route path="/multiplayer" element={<GameBoard />} />
          <Route path="/minimax" element={<MinimaxGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
