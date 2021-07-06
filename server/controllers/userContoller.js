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
