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
import { sessionCler, sessionConfig } from './helper/sessionHelper';

const { availableLocals, defaultLanguage, projectRoot } = config;

const app = express();

i18n.configure({
	locales: availableLocals,
	directory: path.join(projectRoot, 'server', 'locals'),
	defaultLocale: defaultLanguage,
});

import './model';
// Middleware
app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveFavicon('./source/nodejs.svg'));
app.use(morgan('combined'));
app.use(
	session({
		name: sessionConfig.key,
		secret: sessionConfig.secret,
		resave: sessionConfig.resave,
		saveUninitialized: sessionConfig.saveUninitialized,
		cookie: sessionConfig.cookie,
	}),
);
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

// check the cookie and remove if is not set
app.use(sessionCler);
app.use(extendedRequestMiddleware);

app.all('*', headerFunction);
// Test Route
app.get('/ping', async (req, res, next) => {
	try {
		return res.status(200).json({ msg: 'Success', status: 200, data: 'Pong' });
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
