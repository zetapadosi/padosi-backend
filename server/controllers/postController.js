import Post from '../model/postModel';

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
		const { tages, postText } = req.body;
		const newPost = new Post({ tages: tages, postText: postText, postedBy: profile });
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
		const { _id } = req.profile;
		const posts = await Post.find({ postedBy: _id });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
