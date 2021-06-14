import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import Template from '../template';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

// Test Route
app.get('/ping', async (req, res, next) => {
 try {
  return res.status(200).json({ msg: 'Success', status: 200, data: 'Pong' });
 } catch (e) {
  console.log(e.message);
 }
});
app.get('/', async (req, res, next) => {
 try {
  return res.status(200).send(Template());
 } catch (e) {
  console.log(e.message);
 }
});

export default app;
