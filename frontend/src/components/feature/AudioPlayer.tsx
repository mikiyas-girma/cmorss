import React, { useState, useRef, useEffect } from 'react';
import { AudioPlayerProps } from '../../types';
import { useAppState } from '../../hooks/useAppState';

/**
 *
 * @param param0 audioSrc -   path of audio
 * @returns
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { app, setAppState } = useAppState();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.07;
      audioRef.current.play();
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
      setAppState((prev) => ({ ...prev, allowAudio: !prev.allowAudio }));
    }
  };

  //   Return JSX
  return (
    <div className="absolute top-5 right-3 w-[50px] sm:w-[80px]">
      <audio ref={audioRef} src={audioSrc} loop autoPlay={app.allowAudio}>
        Your browser does not support the audio element.
      </audio>

      <button onClick={toggleAudio}>
        <img
          src="/images/speaker.png"
          className={`${
            app.allowAudio ? 'animate-pulse' : 'saturate-0'
          } cursor-pointer`}
        />
      </button>

      {!app.allowAudio && (
        <button className="w-[16px] h-[16px] sm:w-[25px] sm:h-[25px] bg-red-600 absolute text-white top-8 sm:top-14 rounded-full right-6 text-xs sm:text-base">
          X
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
