import { Schema, model } from 'mongoose';
import { generateRandomSring } from '../helper/encriptionHelper';
import config from '../../config/config';

const convertToMeter = (value) => value * 1000;

const userSchema = new Schema(
	{
		userId: { type: String, default: () => `padosiUser-${Date.now()}${generateRandomSring(12)}`, index: true },
		name: { type: String },
		email: { type: String },
		picture: { type: String },
		bio: { type: String, default: null },
		userFrom: { type: String, default: null },
		area: { type: String },
		location: {
			type: { type: String, default: 'Point' },
			coordinates: { type: [Number], default: [0, 0] },
		},
		distance: { type: Number, default: convertToMeter(5) },
		following: [{ type: Schema.ObjectId, ref: 'User' }],
		followers: [{ type: Schema.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

class User {
	static async getUserData(options = {}) {
		try {
			const data = await this.aggregate([
				{
					$lookup: {
						from: 'posts',
						let: { userId: '$_id' },
						pipeline: [{ $match: { $expr: { $eq: ['$postedBy', '$$userId'] } } }],
						as: 'posts',
					},
				},
				{
					$lookup: {
						from: 'users',
						let: { userId: '$postedBy' },
						pipeline: [{ $match: { $expr: { $eq: ['$postedBy', '$$userId'] } } }],
						as: 'userDetails',
					},
				},
			]);

			return data;
		} catch (e) {
			console.error(e.message);
			throw e;
		}
	}

	static async getPostOfUsers(options = {}) {
		try {
			const data = await this.aggregate([
				{
					$geoNear: {
						near: { type: 'Point', coordinates: [options.longitude, options.latitude] },
						distanceField: 'dist.calculated',
						maxDistance: options.distance || parseFloat(config.dist),
						spherical: true,
					},
				},
				{ $project: { _id: 1 } },
				{
					$lookup: {
						from: 'posts',
						let: { userId: '$_id' },
						pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$postedBy', '$$userId'] }, { $eq: ['$isDeleted', false] }] } } }],
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
						isDeleted: '$posts.isDeleted',
						postedBy: {
							name: '$userData.name',
							picture: '$userData.picture',
							userId: '$userData.userId',
						},
						createdAt: '$posts.createdAt',
					},
				},
				{ $sort: { createdAt: -1 } },
				{ $skip: options.page || config.page > 0 ? (options.page || config.page - 1) * options.limit || config.limit : 0 },
				{ $limit: options.limit || config.limit },
			]);
			return data;
		} catch (e) {
			console.error(e.message);
			throw e;
		}
	}
}

userSchema.loadClass(User);
userSchema.index({ location: '2dshere' });

export default model('User', userSchema);
