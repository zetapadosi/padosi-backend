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
	cookies: { maxAge: oneDay, sameSite: 'none', httpOnly: true },
};

export const sessionClear = (req, res, next) => {
	if (req.cookies.Padosi_Session && !req.session.user) {
		res.clearCookie('Padosi_Session');
	}
	next();
};

export const sessionCheck = (req, res, next) => {
	const { cookies, session } = req;
	if (cookies.Padosi_Session.includes(session.id) && session.user) {
		next();
	} else return res.status(403).error('USER_IS_NOT_AUTHORIZED');
};
