declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '**/*.png';
declare module '**/*.jpg';
declare module '**/*.jpeg';
declare module '**/*.gif';

export type Player = 'X' | 'O' | null;
export type Board = Player[];

export type AudioPlayerProps = {
  audioSrc: string;
};

export type User = {
  pseudo: string;
  wins: number;
  losses: number;
  draws: number;
};

export type AppState = {
  allowAudio: boolean;
  user: User | null;
};
