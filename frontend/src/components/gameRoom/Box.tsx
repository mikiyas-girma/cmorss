import React from 'react'

type BoxType = {
  top?: string,
  score: string,
  bottom?: string,
  color?: 'green' | 'orange' | 'blue'
}

const Box: React.FC<BoxType> = ({ top, score, bottom, color }) => {
  return (
    <div className={`p-1 w-24 h-full text-white flex flex-col items-center justify-center bg-gradient-radial rounded-lg leading-none ${color == 'orange' ? 'from-secondary-orange to-primary-orange' : color == 'blue' ? 'from-secondary-blue to bg-primary-blue' : 'from-secondary-green to-primary-green'}`}>
      <p className="text-xs m-0">{top}</p>
      <p className="font-bold text-3xl leading-none m-0">{score}</p>
      <p className="text-xs m-0">{bottom}</p>
    </div>
  )
}

export default Box