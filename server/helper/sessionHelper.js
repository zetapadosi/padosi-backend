import { generateRandomSring } from './encriptionHelper';
import config from '../../config/config';

const { sessionSecret } = config;

const oneDay = 1000 * 60 * 60 * 24;
const usedKey = generateRandomSring(16);

export const sessionConfig = {
	key: usedKey,
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: oneDay },
};

export const sessionCler = (req, res, next) => {
	if (req.cookies.usedKey && !req.session.user) {
		res.clearCookie(usedKey);
	}
	next();
};

export const sessionCheck = (req, res, next) => {
	if (!req.session.user && !res.cookie.usedKey) {
		return res.status(401).error('USER_IS_NOT_AUTHORIZED');
	} else if (req.session.user && res.cookie.usedKey) {
		req.session.isAuth = true;
	}
	next();
};
