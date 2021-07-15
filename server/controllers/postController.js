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
		const { _id } = req.session.user;
		const { tags, postText } = req.body;
		const newPost = new Post({ tags: tags, postText: postText, postedBy: _id });
		await newPost.save();
		const viewPost = await Post.find({ _id: newPost._id }).populate('postedBy', '_id userId picture name');
		return res.ok({ message: 'SUCCESS', value: viewPost });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const listByUser = async (req, res, next) => {
	try {
		const { limit, page } = req.query;
		const { userId } = req.session.user;
		const user = await User.findOne({ userId: userId });
		const { location, distance } = user;
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
		const { limit, page } = req.query;
		const { userId } = req.session.user;
		const user = await User.findOne({ userId: userId });
		const { location, distance } = user;
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
		const { postId } = req.body;
		const { _id } = req.session.user;
		const isPostLiked = await Post.findOne({ postId: postId }).exec();
		isPostLiked.likes.forEach((item) => {
			if (item == _id) {
				return res.ok('ALREADY_LIKED_BY_USER');
			}
		});
		const addlike = await Post.findOneAndUpdate({ postId: `${postId}` }, { $push: { likes: _id } }, { new: true });
		return res.ok({ message: 'SUCCESS', value: addlike });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const unlikePost = async (req, res, next) => {
	try {
		const { postId } = req.body;
		const { _id } = req.session.user;
		const isPostLiked = await Post.findOne({ postId: postId }).exec();
		isPostLiked.likes.forEach((item) => {
			if (item != _id) {
				return res.ok('ALREADY_UNLIKED_BY_USER');
			}
		});
		const unlike = await Post.findOneAndUpdate({ postId: `${postId}` }, { $pull: { likes: _id } }, { new: true });
		return res.ok({ message: 'SUCCESS', value: unlike });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const commentPost = async (req, res, next) => {
	try {
		const { commentText, postId } = req.body;
		const { _id } = req.session.user;
		const comment = {
			commentText: commentText,
			postedBy: _id,
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

export const removePost = async (req, res, next) => {
	try {
		const post = req.post;
		const { _id } = req.session.user;
		if (_id === post.postedby._id) {
			await Post.findOneAndRemove({ postedBy: post.postedby._id });
		}
		return res.ok({ message: 'REMOVE_POST' });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
