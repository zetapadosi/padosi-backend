const config = {
 env: process.env.NODE_ENV || 'development',
 port: process.env.PORT || '',
 jwtSecret: process.env.JWT_SECRET || '',
 mongoUri: process.env.MONGO_URL || '',
};

export default config;
