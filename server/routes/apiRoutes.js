import { Router } from 'express';
import authRoute from './authRoute';
import postRouter from './postRoute';
import userRouter from './userRoute';

import {  testAuth } from '../controllers/authController';

const apiRoutes = new Router();

/*
  test the api route
*/
apiRoutes.get('/',testAuth)

apiRoutes.use('/auth', authRoute);
// api/post/
apiRoutes.use('/post', postRouter);
apiRoutes.use('/user', userRouter)

export default apiRoutes;
