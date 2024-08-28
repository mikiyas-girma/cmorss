import { Document } from 'mongoose';

// Interface for the User Document
export interface UserDoc extends Document {
  pseudo: string;
  password: string;
  wins: number;
  losses: number;
  draws: number;
  gamesPlayed: number;
  createdAt: Date;
  updatedAt: Date;
}
