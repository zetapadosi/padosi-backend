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
		const userProfile = await User.findOne({ userId: req.profile.userId });
		const userPost = await Post.find({ postedBy: userProfile._id })
			.populate('postedBy', 'name _id userId picture')
			.exec();

		return res.ok({ message: 'SUCCESS', value: { userProfile, userPost } });
	} catch (e) {
		console.error('GetUserProfile -> ', e.message);
		next(e);
	}
};

export const updateUserBio = async (req, res, next) => {
	try {
		const { bioText } = req.body;
		const { userId } = req.profile;
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
		const { userId } = req.profile;
		const newDist = distance * 1000;
		const userData = await User.findOneAndUpdate({ userId: userId }, { distance: newDist }, { new: true });
		return res.ok({ message: 'SUCCESS', value: userData });
	} catch (e) {
		console.error('UpdateUserLocation -> ', e.message);
		next(e);
	}
};
