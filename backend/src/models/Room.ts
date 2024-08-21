import mongoose from "mongoose";

export interface RoomDoc extends mongoose.Document {
	players: [{
		id: string
		score: [boolean] // True represent an 'won' and 0 a 'lose' or a 'draw'
	}]
	createdAt: Date
	updatedAt: Date
}

const playerSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	score: [mongoose.Schema.Types.Boolean] // True represent an 'won' and 0 a 'lose' or a 'draw'
}, {_id: false});

const roomSchema = new mongoose.Schema({
	players: [playerSchema],
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: Date.now
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: Date.now
	}
});

const Room = mongoose.model<RoomDoc>('Room', roomSchema);

export { Room };
