import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import cookieSession from 'cookie-session';

import Template from '../template';
import config from '../config/config';
import { errHandler, headerFunction, notFound } from './middleware/errorMiddleware';
import apiRoutes from './routes/apiRoutes';
import { extendedRequestMiddleware } from './middleware/extendedRequestMiddleware';

const { sessionSecret } = config;

const app = express();

// Import Model
import './model/indexModel';

// Middleware
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serveFavicon('./source/nodejs.svg'));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(
 cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [sessionSecret],
 })
);

app.use(extendedRequestMiddleware);

app.all('*', headerFunction);
// Test Route
app.get('/ping', async (req, res, next) => {
 try {
  return res.status(200).json({ msg: 'Success', status: 200, data: 'Pong' });
 } catch (e) {
  console.log(e.message);
  next(e);
 }
});
app.get('/', async (req, res, next) => {
 try {
  return res.status(200).json({ msg: 'Success', body: 'Server is working ' });
 } catch (e) {
  console.log(e.message);
  next(e);
 }
});

// Load Routes
app.use('/api', apiRoutes);

app.use(errHandler);
app.use(notFound);

export default app;
