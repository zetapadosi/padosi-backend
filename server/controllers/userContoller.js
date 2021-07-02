import User from '../model/userModel';

export const userByID = async (req, res, next, userId) => {
	try {
		let user = await User.findById(userId);
		if (!user) {
			return res.error('USER_NOT_FOUND');
		}
		req.profile = user;
		next();
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};
