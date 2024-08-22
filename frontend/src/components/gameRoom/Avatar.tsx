import React from 'react'
type AvatarType = {
  player?: string | null
  color?: string
}

const Avatar: React.FC<AvatarType> = ({ player }) => {
  return (
    <>
      {player &&
        <div className={`w-20 h-20 text-6xl font-bold text-white m-auto flex items-center justify-center rounded-2xl shadow-lg shadow-neutral-500 gradien bg-gradient-radial ${player == 'X'? 'from-secondary-orange to-primary-orange' : 'from-secondary-green to-primary-green'}`}>
          {player}
        </div>
      }
    </>
  )
}

export default Avatar