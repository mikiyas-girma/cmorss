import React from 'react'
import Button from '../common/Button'
import { starImage } from '../../assets'
import { useNavigate } from 'react-router-dom'

const GameEnd: React.FC = () => {
    const navigate = useNavigate()
    return (
<div className="">
  <div className="absolute inset-0 bg-black opacity-70" />
  <div className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center">
    <div className="mb-10 flex items-center justify-center">
      <img className="w-16 pt-16" src={starImage} alt="star" />
      <img className="-mx-4" src={starImage} alt="star" />
      <img className="w-16 pt-16" src={starImage} alt="star" />
    </div>
    <div className="text-center">
      <p className="text-yellow-500 text-3xl font-bold">YAAAAAAAY!</p>
      <p className="text-white text-4xl font-bold">PLAYER X</p>
      <p className="text-yellow-500 text-7xl font-extrabold leading-none">WON!</p>
    </div>
    <div className="w-full flex flex-col space-y-1">
      <Button
        text="Play Again"
        color="orange"
        animate={false}
        size="full"
        onClick={() => window.location.reload()}
      />
      <Button
        text="Exit Match"
        color="blue"
        animate={false}
        size="full"
        onClick={() => navigate('/dashboard')}
      />
    </div>
  </div>
</div>

    )
}

export default GameEnd