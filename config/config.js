require('dotenv').config();

import path from 'path'

const config = {
 environment: process.env.NODE_ENV || 'development',
 port: process.env.PORT || '',
 jwtSecret: process.env.JWT_SECRET || '',
 mongoUri: process.env.MONGO_URL || '',
 googleClientID: process.env.GOOGLE_CLIENT_ID || '',
 googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
 googleCallBackUrl: process.env.GOOGLE_CALLBACK_URL || '',
 sessionSecret: process.env.SESSION_SECRET || '',
 projectRoot: path.join(__dirname,'..'),
 availableLocals:['en'],
 defaultLanguage:'en'
};

export default config;
