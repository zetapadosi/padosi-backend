import User from '../model/userModel';
import Post from '../model/postModel';

export const userByID = async (req, res, next, id) => {
	try {
		let user = await User.find({ userId: `${id}` });
		if (!user) {
			return res.error('USER_NOT_FOUND');
		}
		req.profile = user[0];
		next();
	} catch (e) {
		console.error('UserByID -> ', e.message);
		next(e);
	}
};

export const getUserProfile = async (req, res, next) => {
	try {
		const { userId, _id } = req.session.user;
		const user = await User.findOne({ userId: userId });
		const userPost = await Post.find({ postedBy: _id, isDeleted: false })
			.populate('postedBy', 'name _id userId picture')
			.exec();
		return res.ok({ message: 'SUCCESS', value: { user, userPost } });
	} catch (e) {
		console.error('GetUserProfile -> ', e.message);
		next(e);
	}
};

// get users removed post
export const getRemovedPost = async (req, res, next) => {
	try {
		const { userId, _id } = req.session.user;
		const user = await User.findOne({ userId: userId });
		const userPost = await Post.find({ postedBy: _id, isDeleted: true })
			.populate('postedBy', 'name _id userId picture')
			.exec();
		return res.ok({ message: 'SUCCESS', value: { user, userPost } });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const otheUserProfile = async (req, res, next) => {
	try {
		const { userId, _id } = req.profile;
		const user = await User.findOne({ userId: userId });
		const userPost = await Post.find({ postedBy: _id, isDeleted: false })
			.populate('postedBy', 'name _id userId picture')
			.exec();
		return res.ok({ message: 'SUCCESS', value: { user, userPost } });
	} catch (e) {
		console.error('GetUserProfile -> ', e.message);
		next(e);
	}
};

export const updateUserBio = async (req, res, next) => {
	try {
		const { bioText } = req.body;
		const { userId } = req.session.user;
		const userData = await User.findOneAndUpdate({ userId: userId }, { bio: bioText }, { new: true });
		return res.ok({ message: 'SUCCESS', value: userData });
	} catch (e) {
		console.error('UpdateUserBio -> ', e.message);
		next(e);
	}
};

export const updateUserDistance = async (req, res, next) => {
	try {
		const { distance } = req.body;
		const { userId } = req.session.user;
		const newDist = distance * 1000;
		const userData = await User.findOneAndUpdate({ userId: userId }, { distance: newDist }, { new: true });
		return res.ok({ message: 'SUCCESS', value: userData });
	} catch (e) {
		console.error('UpdateUserLocation -> ', e.message);
		next(e);
	}
};
