import React from 'react';

export interface PlayerData {
	rank: number;
	username: string;
	score: {
		wins: number;
		draws: number;
		loses: number;
	};
}

interface PlayerProps {
  player: PlayerData;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <>
      <th scope="col" className="px-6 py-3">
        {player.rank}
      </th>
      <th scope="col" className="px-6 py-3 w-3/6 text-left">
        {player.username}{' '}<span className="animate-pulse">
          {`${player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉': ''}`}
        </span>
      </th>
      <th scope="col" className="px-6 py-3">
        {player.score.wins}
      </th>
      <th scope="col" className="px-6 py-3">
        {player.score.draws}
      </th>
      <th scope="col" className="px-6 py-3">
        {player.score.loses}
      </th>
    </>
  );
};

export default Player;