import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import User from '../model/userModel';
import config from '../../config/config';

const { jwtSecret } = config;

export const testAuth = async (req, res, next) => {
	try {
		const testData = {
			testDetails: 'The test is working fine ',
		};
		return res.ok({ message: 'SUCCESS', value: testData });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const registerUser = async (req, res, next) => {
	try {
		const { name, email, picture, latitude, longitude, userFrom, area } = req.body;
		let newUser = await User.findOne({ email: `${email}`, userFrom: `${userFrom}` });
		if (newUser) {
			return res.error({ message: 'USER_ALREADY_REGISTERED' });
		}
		const user = await User.create({
			name,
			email,
			picture,
			location: { coordinates: [parseFloat(longitude), parseFloat(latitude)] },
			userFrom,
			area,
		});

		req.session.user = {
			name: user.name,
			userFrom: user.userFrom,
			userId: user.userId,
			_id: user._id,
		};
		return res.status(201).ok({ message: 'REGISTRATION_SUCCESS', value: user });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const sigin = async (req, res, next) => {
	try {
		const { email, userFrom } = req.body;
		const user = await User.findOne({ email: `${email}`, userFrom: `${userFrom}` });
		if (!user) {
			return res.error('USER_NOT_FOUND');
		}
		req.session.user = {
			name: user.name,
			userFrom: user.userFrom,
			userId: user.userId,
			_id: user._id,
		};
		return res.ok({ message: 'SIGNED_SUCCESS', value: user });
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const signout = async (req, res, next) => {
	try {
		req.session.destroy();
		return res.ok('SIGNED_OUT_SUCCESS');
	} catch (e) {
		console.error(e.message);
		next(e);
	}
};

export const requireSignin = expressJwt({
	secret: jwtSecret,
	userProperty: 'auth',
	algorithms: ['HS256'],
});

export const hasAuthorization = (req, res, next) => {
	const authorized = req.profile && req.auth && req.profile.userId == req.auth.userId;
	if (!authorized) {
		return res.status(403).error('USER_IS_NOT_AUTHORIZED');
	}
	next();
};
