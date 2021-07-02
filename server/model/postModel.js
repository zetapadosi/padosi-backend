import { Schema, model } from 'mongoose';
import { generateRandomSring } from '../helper/encriptionHelper';

const postSchema = new Schema(
	{
		_id: { type: String, default: () => `padosiPost-${Date.now()}${generateRandomSring(12)}` },
		postedBy: { type: Schema.ObjectId, ref: 'User' },
		text: { type: String },
		likes: [{ type: Schema.ObjectId, ref: 'User' }],
		comments: [
			{
				text: String,
				created: { type: Date, default: Date.now },
				postedBy: { type: Schema.ObjectId, ref: 'User' },
			},
		],
	},
	{ timestamp: true },
);

export default model('Post', postSchema);
