require('dotenv').config();

const config = {
 env: process.env.NODE_ENV || 'development',
 port: process.env.PORT || '',
 jwtSecret: process.env.JWT_SECRET || '',
 mongoUri: process.env.MONGO_URL || '',
 googleClientID: process.env.GOOGLE_CLIENT_ID || '',
 googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
 googleCallBackUrl: process.env.GOOGLE_CALLBACK_URL || '',
 sessionSecret: process.env.SESSION_SECRET || ''
};

export default config;
