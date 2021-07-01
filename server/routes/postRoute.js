import { Router } from 'express';
import { hasAuthorization, requireSignin } from '../controllers/authController';
import { testPost } from '../controllers/postController';

const postRouter = new Router();

// Test Route
postRouter.get('/', requireSignin, testPost);

export default postRouter;
