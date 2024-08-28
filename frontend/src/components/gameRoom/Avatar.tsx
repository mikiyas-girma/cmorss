import React from 'react';
type AvatarType = {
  player?: string | null;
  color?: string;
  endBoard?: boolean;
};

const Avatar: React.FC<AvatarType> = ({ player, endBoard }) => {
  return (
    <>
      {player && (
        <div
          className={`w-[85%] h-[85%] ${
            endBoard ? 'text-2xl sm:text-4xl ' : 'text-6xl'
          } font-bold text-white m-auto flex items-center justify-center rounded-2xl shadow-lg shadow-neutral-500 gradien bg-gradient-radial animate-bounce ${
            player == 'X'
              ? 'from-secondary-orange to-primary-orange'
              : 'from-secondary-green to-primary-green'
          }`}
        >
          {player}
        </div>
      )}
    </>
  );
};

export default Avatar;
