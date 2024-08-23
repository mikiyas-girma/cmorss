import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface UserDoc extends mongoose.Document {
	pseudo: string
	password: string
	gamePlayed: number
	wins: number
	loses: number
	draws: number
	createdAt: Date
	updatedAt: Date
}

const userSchema = new mongoose.Schema({
  pseudo: {
		type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
		type: String,
		required: true
	},
	gamePlayed: {
		type:mongoose.Schema.Types.Number,
		required: true,
		default: 0,
	},
	wins: {
		type:mongoose.Schema.Types.Number,
		required: true,
		default: 0,
	},
	loses: {
		type:mongoose.Schema.Types.Number,
		required: true,
		default: 0,
	},
	draws: {
		type:mongoose.Schema.Types.Number,
		required: true,
		default: 0,
	},
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: Date.now
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: Date.now
	}
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<UserDoc>('User', userSchema);

export { User };