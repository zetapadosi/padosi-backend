import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import i18n from 'i18n';
import path from 'path';
import session from 'express-session';

import config from '../config/config';
import { errHandler, headerFunction, notFound, unauthorisedErrors } from './middleware/errorMiddleware';
import apiRoutes from './routes/apiRoutes';
import { extendedRequestMiddleware } from './middleware/extendedRequestMiddleware';
import { sessionClear, sessionConfig } from './helper/sessionHelper';

const { availableLocals, defaultLanguage, projectRoot, port } = config;

const app = express();

i18n.configure({
	locales: availableLocals,
	directory: path.join(projectRoot, 'server', 'locals'),
	defaultLocale: defaultLanguage,
});

import './model';
// Middleware
if (app.get('env') === 'production') {
	app.set('trust proxy', 1); // trust first proxy
	sessionConfig.cookies.secure = true; // serve secure cookies
}
const whiteList = [
	'http://localhost:3000',
	'https://padosi-frontend.vercel.app',
	'https://padosi-backend.herokuapp.com/',
];
const corsOptions = {
	origin: function (origin, callBack) {
		if (whiteList.indexOf(origin) !== -1) {
			callBack(null, true);
		} else {
			callBack(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(i18n.init);
app.use(cookieParser());
app.use(
	session({
		name: 'Padosi_Session',
		key: sessionConfig.key,
		secret: sessionConfig.secret,
		resave: sessionConfig.resave,
		saveUninitialized: sessionConfig.saveUninitialized,
		cookie: sessionConfig.cookies,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveFavicon('./source/nodejs.svg'));
app.use(morgan('combined'));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));

// check the cookie and remove if is not set
app.use(sessionClear);
app.use(extendedRequestMiddleware);

app.all('*', headerFunction);
// Test Route
app.get('/ping', async (req, res, next) => {
	try {
		// req.session.user = {
		// 	name: 'James Smith',
		// 	userFrom: 'google',
		// 	userId: 'padosiUser-1626329921586e453c1b8bbf3',
		// 	_id: '60efd341fe8daf001585034d',
		// };
		// res.cookie('Padosi_Session', req.session.id, { expires: new Date(Date.now() + 90000000) });
		return res.status(200).json({
			msg: 'Success',
			status: 200,
			data: 'Pong',
			// session: req.session,
			// cookies: req.cookies,
			// sessionId: req.session.id,
		});
	} catch (e) {
		console.error(e.message);
		next(e);
	}
});

// Load Routes
app.use('/api', apiRoutes);

app.use(unauthorisedErrors);
app.use(errHandler);
app.use(notFound);

export default app;
