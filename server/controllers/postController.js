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
		if (req.profile === undefined) {
			return res.error('USER_IS_NOT_AUTHORIZED');
		}
		const { limit, page } = req.query;
		const { location, distance } = req.profile;
		const options = {
			longitude: parseFloat(location.coordinates[0]),
			latitude: parseFloat(location.coordinates[1]),
			distance: parseFloat(distance),
			limit: parseFloat(limit),
			page: parseFloat(page),
		};
		const getPosts = await User.getPostOfUsers(options);

		return res.ok({ message: 'SUCCESS', value: getPosts });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const searchByTags = async (req, res, next) => {
	try {
		if (req.profile === undefined) {
			return res.error('USER_IS_NOT_AUTHORIZED');
		}
		const { limit, page } = req.query;
		const { location, distance } = req.profile;
		const { tags } = req.body;
		const options = {
			longitude: parseFloat(location.coordinates[0]),
			latitude: parseFloat(location.coordinates[1]),
			distance: parseFloat(distance),
			limit: parseFloat(limit),
			page: parseFloat(page),
		};

		const getPosts = await User.getPostOfUsers(options);
		const newTags = (arr1, arr2) => {
			let arr3 = [];
			arr1.forEach((ele1) => {
				for (let i = 0; i < ele1.tags.length; i++) {
					for (let j = 0; j < arr2.length; j++) {
						if (arr2[j] == ele1.tags[i]) {
							arr3.push(ele1);
						}
					}
				}
			});
			return arr3;
		};
		const postTags = newTags(getPosts, tags);

		return res.ok({ message: 'SUCCESS', value: postTags });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const likePost = async (req, res, next) => {
	try {
		const { userId, postId } = req.body;
		// const isLiked = await Post.findOne({ likes: userId });
		// if (isLiked) {
		// 	return res.ok({ message: 'ALREADY_LIKED_BY_USER', value: isLiked });
		// }
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
		// const isUnlike = await Post.findOne({ likes: userId });
		// if (isUnlike === null) {
		// 	return res.ok({ message: 'ALREADY_UNLIKED_BY_USER', value: isUnlike });
		// }
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
		const updatedComment = await Post.findOneAndUpdate(
			{ postId: postId },
			{ $pull: { comments: { _id: commentId } } },
			{ new: true },
		)
			.populate('comments.postedBy', '_id name userId picture')
			.populate('postedBy', '_id name')
			.exec();
		return res.ok({ message: 'SUCCESS', value: updatedComment });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
