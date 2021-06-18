import { connect } from 'mongoose';
import config from '../../config/config.js';

const mongoOpt = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 50000,
};
const { mongoUri } = config;

const dbController = async () => {
  try {
    await connect(mongoUri, mongoOpt);
    console.info(`MongoDb -> Connected to mongoDb Server`);
  } catch (err) {
    console.error('MongoDb ->', err.message);
  }
};
export default dbController;
