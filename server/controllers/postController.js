
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
		let post = await Post.findOne({ postId: postId }).populate('postedBy', '_id name').exec();

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


export const getSinglePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.post._id).populate('postedBy', 'name _id userId picture').exec();
		return res.ok({ message: 'SUCCESS', value: post });
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
			return res.ok({ message: 'ALREADY_LIKED_BY_USER', value: isLiked });
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
			return res.ok({ message: 'ALREADY_UNLIKED_BY_USER', value: isUnlike });
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
		const { commentText, postId, userId } = req.body;
		const comment = {
			commentText: commentText,
			postedBy: userId,
		};
		const isCommented = await Post.findOne({ 'comments.postedBy': userId });
		if (isCommented) {
			return res.ok({ message: 'USER_COMMENTED_ONCE', value: isCommented });
		}
		console.log(isCommented);
		const updatedPost = await Post.findOneAndUpdate({ postId: postId }, { $push: { comments: comment } }, { new: true })
			.populate('comments.postedBy', '_id name userId picture')
			.populate('postedBy', '_id name')
			.exec();
		return res.ok({ message: 'SUCCESS', value: updatedPost });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const uncommentPost = async (req, res, next) => {
	try {
		const { commentId, postId } = req.body;

		const isRemoved = await Post.findOne({ 'comments._id': commentId });
		if (isRemoved === null) {
			return res.ok({ message: 'USER_COMMENTED_ONCE', value: isRemoved });
		}
		const updatedComment = await Post.findOneAndUpdate({ postId: postId }, { $pull: { comments: { _id: commentId } } }, { new: true })
			.populate('comments.postedBy', '_id name userId picture')
			.populate('postedBy', '_id name')
			.exec();
		return res.ok({ message: 'SUCCESS', value: updatedComment });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
