import React, { useState, useRef, useEffect } from 'react';
import { AudioPlayerProps } from '../../types';

/**
 *
 * @param param0 audioSrc -   path of audio
 * @returns
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.07;
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  //   Return JSX
  return (
    <div className="absolute top-5 right-3 w-[50px] sm:w-[80px]">
      <audio
        loop
        ref={audioRef}
        src={audioSrc}
        autoPlay={isPlaying}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
      >
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleAudio}>
        <img
          src="/images/speaker.png"
          className={`${
            isPlaying ? 'animate-pulse' : 'saturate-0'
          } cursor-pointer`}
        />
      </button>

      {!isPlaying && (
        <button className="w-[16px] h-[16px] sm:w-[25px] sm:h-[25px] bg-red-600 absolute text-white top-8 sm:top-14 rounded-full right-6 text-xs sm:text-base">
          X
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
