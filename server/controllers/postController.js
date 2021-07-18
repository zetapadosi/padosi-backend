import Post from '../model/postModel';
import User from '../model/userModel';
import _ from 'lodash';

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
		const { _id } = req.session.user;
		const newPost = await Post.findById(req.post._id)
			.populate('postedBy', 'name _id userId picture')
			.populate('comments.postedBy', 'name _id userId picture')
			.exec();
		const hasLiked = newPost.likes.includes(_id);
		newPost.comments.sort((a, b) => new Date(b.created) - new Date(a.created));
		return res.ok({ message: 'SUCCESS', value: { ...newPost._doc, hasLiked } });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const editPost = async (req, res, next) => {
	try {
		const { _id } = req.session.user;
		const { tags, postText } = req.body;
		if (_id == req.post.postedBy._id) {
			const updatePost = await Post.findOne({ postId: req.post.postId });
			updatePost.postText = postText;
			updatePost.tags = [...tags];
			await updatePost.save();
		}
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
		const { userId, _id } = req.session.user;
		const user = await User.findOne({ userId: userId });
		const { location, distance } = user;
		const options = {
			longitude: parseFloat(location.coordinates[0]),
			latitude: parseFloat(location.coordinates[1]),
			distance: parseFloat(distance),
			limit: parseFloat(limit),
			page: parseFloat(page),
			id: userId,
		};
		const getPosts = await User.getPostOfUsers(options);

		getPosts.forEach((item) => {
			let check;
			item.likes.forEach((ele) => {
				if (ele == _id) {
					return (check = true);
				}
				return (check = false);
			});
			item.hasLiked = check;
		});

		return res.ok({ message: 'SUCCESS', value: getPosts });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const searchByTags = async (req, res, next) => {
	try {
		const { limit, page } = req.query;
		const { userId, _id } = req.session.user;
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
		getPosts.forEach((item) => {
			let check;
			item.likes.forEach((ele) => {
				if (ele == _id) {
					return (check = true);
				}
				return (check = false);
			});
			item.hasLiked = check;
		});
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
		const uniquePost = _.uniq(postTags, postTags._id);
		return res.ok({ message: 'SUCCESS', value: uniquePost });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const likePost = async (req, res, next) => {
	try {
		const { postId } = req.body;
		const { _id } = req.session.user;
		const addPost = await Post.findOne({ postId: postId }).exec();
		if (addPost.likes.indexOf(_id) == -1) {
			addPost.likes.push(_id);
			await addPost.save();
			return res.ok({ message: 'SUCCESS', value: addPost });
		} else {
			return res.error('ALREADY_LIKED_BY_USER');
		}
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const unlikePost = async (req, res, next) => {
	try {
		const { postId } = req.body;
		const { _id } = req.session.user;
		const unLike = await Post.findOne({ postId: postId }).exec();

		if (unLike.likes.indexOf(_id) != -1) {
			unLike.likes.splice(unLike.likes.indexOf(_id), 1);
			await unLike.save();
			return res.ok({ message: 'SUCCESS', value: unLike });
		} else {
			return res.error('ALREADY_UNLIKED_BY_USER');
		}
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
		if (post.postedBy._id == _id) {
			await Post.findOneAndUpdate({ postId: post.postId }, { isDeleted: true }, { new: true }).exec();
		}
		return res.ok({ message: 'REMOVE_POST' });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
