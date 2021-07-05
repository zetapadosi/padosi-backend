import { Router } from 'express';
import { requireSignin } from '../controllers/authController';
import {
	commentPost,
	createPost,
	likePost,
	listByUser,
	postByID,
	testPost,
	uncommentPost,
	unlikePost,
} from '../controllers/postController';
import { userByID } from '../controllers/userContoller';
import { inputPostRules, validate } from '../helper/inputValidationHelper';

const postRouter = new Router();

// Test Route
postRouter.get('/', requireSignin, testPost);

// create new post
postRouter.post('/create/:userId', requireSignin, inputPostRules(), validate, createPost);

postRouter.get('/wall/:userId', requireSignin, listByUser);

// like and dislike the post
postRouter.put('/like', requireSignin, likePost);
postRouter.put('/unlike', requireSignin, unlikePost);

// Comment and un comment
postRouter.put('/comment', requireSignin, commentPost);
postRouter.put('/uncomment', requireSignin, uncommentPost);

// Params route
postRouter.param('userId', userByID);
postRouter.param('postId', postByID);

export default postRouter;
