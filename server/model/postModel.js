import { Schema, model } from 'mongoose';
import { generateRandomSring } from '../helper/encriptionHelper';

const postSchema = new Schema(
	{
		postId: { type: String, default: () => `padosiPost-${Date.now()}${generateRandomSring(12)}`, index: true },
		postedBy: { type: Schema.ObjectId, ref: 'User' },
		tags: [{ type: String, index: true }],
		postText: { type: String },
		likes: [{ type: Schema.ObjectId, ref: 'User' }],
		comments: [
			{
				text: String,
				created: { type: Date, default: Date.now },
				postedBy: { type: Schema.ObjectId, ref: 'User' },
			},
		],
	},
	{ timestamps: true },
);

class Post {}

postSchema.loadClass(Post);

export default model('Post', postSchema);
