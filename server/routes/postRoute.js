import { Router } from 'express';
import { requireSignin } from '../controllers/authController';
import { createPost, postByID, testPost } from '../controllers/postController';
import { userByID } from '../controllers/userContoller';

const postRouter = new Router();

// Test Route
postRouter.get('/', requireSignin, testPost);

// create new post
postRouter.post('/create/:userId', requireSignin, createPost);

// Params route
postRouter.param('userId', userByID);
postRouter.param('postId', postByID);

export default postRouter;
