import { Document } from 'mongoose';

// Interface for the User Document
export interface UserDoc extends Document {
  pseudo: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
