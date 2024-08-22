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
