import mongoose from 'mongoose';
// import uniqueValidator from "mongoose-unique-validator";
import { UserDoc } from '../types/models/user.types';

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    wins: { type: mongoose.Schema.Types.Number, required: false, default: 0 },
    losses: { type: mongoose.Schema.Types.Number, required: false, default: 0 },
    draws: { type: mongoose.Schema.Types.Number, required: false, default: 0 },
    gamesPlayed: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// userSchema.plugin(uniqueValidator);
const User = mongoose.model<UserDoc>('User', userSchema);
export { User };
