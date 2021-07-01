import { Router } from 'express';
import { testAuth } from '../controllers/authController';
import authRoute from './authRoute';
import postRouter from './postRoute';
import userRouter from './userRoute';

const apiRoutes = new Router();

/*  
  test the api route
*/
apiRoutes.get('/',testAuth)

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/post', postRouter);
apiRoutes.use('/user', userRouter)

export default apiRoutes;
