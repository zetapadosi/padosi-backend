import { Schema, model } from 'mongoose';
import { generateRandomSring } from '../helper/encriptionHelper';

const userSchema = new Schema(
	{
		userId: { type: String, default: () => `padosiUser-${Date.now()}${generateRandomSring(12)}`, index: true },
		name: { type: String },
		email: { type: String },
		picture: { type: String },
		userFrom: { type: String, default: null },
		location: {
			type: { type: String, default: 'Point' },
			coordinates: { type: [Number], default: [0, 0] },
		},
		following: [{ type: Schema.ObjectId, ref: 'User' }],
		followers: [{ type: Schema.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

class User {
	static async getPostOfUsers(options = {}) {
		const data = await this.aggregate([
			{
				$geoNear: {
					near: { type: 'Point', coordinates: [options.longitude, options.latitude] },
					distanceField: 'dist.calculated',
					maxDistance: options.distance,
					spherical: true,
				},
			},
			{ $project: { _id: 1 } },
			{
				$lookup: {
					from: 'posts',
					let: { userId: '$_id' },
					pipeline: [{ $match: { $expr: { $eq: ['$postedBy', '$$userId'] } } }],
					as: 'posts',
				},
			},
			{ $unwind: '$posts' },
			{
				$lookup: {
					from: 'users',
					let: { userId: '$_id' },
					pipeline: [
						{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
						{ $project: { userId: 1, _id: 0, name: 1, picture: 1 } },
					],
					as: 'userData',
				},
			},
			{ $unwind: '$userData' },
			{
				$project: {
					postId: '$posts.postId',
					tags: '$posts.tags',
					postText: '$posts.postText',
					likes: '$posts.likes',
					comments: '$posts.comments',
					postedBy: {
						name: '$userData.name',
						picture: '$userData.picture',
						userId: '$userData.userId',
					},
					createdAt: '$posts.createdAt',
				},
			},
			{
				$sort: { createdAt: 1 },
			},
			{
				$skip: options.page || 0 > 0 ? (options.page || 0 - 1) * options.limit || 0 : 0,
			},
			{
				$limit: options.limit || 8,
			},
		]);
		return data;
		try {
		} catch (e) {
			console.error(e.message);
			throw e;
		}
	}
}

userSchema.loadClass(User);
userSchema.index({ location: '2dshere' });

export default model('User', userSchema);
