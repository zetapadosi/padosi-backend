import Post from '../model/postModel';
import User from '../model/userModel';
import config from '../../config/config';

export const testPost = (req, res, next) => {
	try {
		const testPostData = 'The test Post is working ';
		return res.ok({ message: 'SUCCESS', value: testPostData });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const postByID = async (req, res, next, postId) => {
	try {
		let post = await Post.findById(postId).populate('postedBy', '_id userName').exec();
		if (!post) {
			return res.error('POST_NOT_FOUND');
		}
		req.post = post;
		next();
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const createPost = async (req, res, next) => {
	try {
		const { profile } = req;
		const { tags, postText } = req.body;
		const newPost = new Post({ tags: tags, postText: postText, postedBy: profile });
		await newPost.save();
		const viewPost = await Post.find({ _id: newPost._id }).populate('postedBy', '_id userId picture userName');
		return res.ok({ message: 'SUCCESS', value: viewPost });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const listByUser = async (req, res, next) => {
	try {
		console.log('reqprofile', req.profile);
		if (req.profile === undefined) {
			return res.error('USER_IS_NOT_AUTHORIZED');
		}
		const { coordinates } = req.profile.location;
		const options = {
			longitude: parseFloat(coordinates[0]),
			latitude: parseFloat(coordinates[1]),
			distance: parseFloat(config.dist),
			limit: parseFloat(config.limit),
			page: parseFloat(config.page),
		};
		const getPosts = await User.getPostOfUsers(options);

		return res.ok({ message: 'SUCCESS', value: getPosts });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const likePost = async (req, res, next) => {
	try {
		const { userId, postId } = req.body;
		const isLiked = await Post.findOne({ likes: userId });
		if (isLiked) {
			return res.ok('ALREADY_LIKED_BY_USER');
		}
		const addlike = await Post.findOneAndUpdate({ postId: `${postId}` }, { $push: { likes: userId } }, { new: true });
		return res.ok({ message: 'SUCCESS', value: addlike });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const unlikePost = async (req, res, next) => {
	try {
		const { userId, postId } = req.body;
		const isUnlike = await Post.findOne({ likes: userId });
		console.log(isUnlike);
		if (isUnlike === null) {
			return res.ok('ALREADY_UNLIKED_BY_USER');
		}
		const unlike = await Post.findOneAndUpdate({ postId: `${postId}` }, { $pull: { likes: userId } }, { new: true });
		return res.ok({ message: 'SUCCESS', value: unlike });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const commentPost = async (req, res, next) => {
	try {
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const uncommentPost = async (req, res, next) => {
	try {
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
