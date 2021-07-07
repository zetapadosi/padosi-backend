import User from '../model/userModel';

export const userByID = async (req, res, next, id) => {
	try {
		let user = await User.find({ userId: `${id}` });
		if (!user) {
			return res.error('USER_NOT_FOUND');
		}
		req.profile = user[0];
		next();
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const getUserProfile = async (req, res, next) => {
	try {
		const options = {
			// _id,
		};
		const userProfile = await User.getUserData(options);
		return res.ok({ message: 'SUCCESS', value: userProfile });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
