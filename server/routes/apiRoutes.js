import { Router } from 'express';
import authRoute from './authRoute';
import postRouter from './postRoute';
import userRouter from './userRoute';

const apiRoutes = new Router();

/*  */
apiRoutes.use('/auth', authRoute);
apiRoutes.use('/post', postRouter);
apiRoutes.use('/user', userRouter)

export default apiRoutes;
