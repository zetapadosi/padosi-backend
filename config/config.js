require('dotenv').config();

import path from 'path';

const config = {
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || '',
	jwtSecret: process.env.JWT_SECRET || '',
	mongoUri: process.env.MONGO_URL_PRODUCTION || '',
	projectRoot: path.join(__dirname, '..'),
	availableLocals: ['en'],
	defaultLanguage: 'en',
	dist: process.env.MAX_DISTANCE || '',
	page: process.env.PAGE || '',
	limit: process.env.LIMIT || '',
};

export default config;
