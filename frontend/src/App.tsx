/**
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
    */

import './App.css';
import ThreeDLogoComp from './components/common/ThreeDLogo';
import Button from './components/common/Button';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden w-full">
      <ThreeDLogoComp size="large" animate={false} />
      <Button
        text="Create Account"
        color="green"
        animate
        size="full"
        onClick={() => navigate('/signup')}
      />

      <Button
        text="Login to Start Game"
        color="blue"
        animate
        size="full"
        onClick={() => navigate('/login')}
      />

      <Button
        text="Guest Mode"
        color="orange"
        animate
        size="full"
        onClick={() => navigate('/dashboard')}
      />
    </div>
  );
};

export default App;
