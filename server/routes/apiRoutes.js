import { Router } from 'express';
import authRoute from './authRoute';
import postRouter from './postRoute';

const apiRoutes = new Router();

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/post', postRouter);

export default apiRoutes;
