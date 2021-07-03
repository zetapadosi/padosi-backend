import { Schema, model, Types } from 'mongoose';
import { generateRandomSring } from '../helper/encriptionHelper';

const FROM_USER = {
	GOOGLE: 'google',
	FACEBOOK: 'facebook',
	DEFAULT: null,
};

const userSchema = new Schema(
	{
		userId: { type: String, default: () => `padosiUser-${Date.now()}${generateRandomSring(12)}` },
		userName: { type: String },
		email: { type: String },
		picture: { type: String },
		userFrom: { type: String, enum: Object.values(FROM_USER), default: FROM_USER.DEFAULT },
		location: {
			type: { type: String, default: 'Point' },
			coordinates: { type: [Number] },
		},
		following: [{ type: Schema.ObjectId, ref: 'User' }],
		followers: [{ type: Schema.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

export default model('User', userSchema);
