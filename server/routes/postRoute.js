import { Router } from 'express';
import { requireSignin } from '../controllers/authController';

import {
	commentPost,
	createPost,
	getSinglePost,
	likePost,
	listByUser,
	postByID,
	searchByTags,
	testPost,
	uncommentPost,
	unlikePost,
} from '../controllers/postController';
import { userByID } from '../controllers/userContoller';
import { inputCommentRules, inputPostRules, validate } from '../helper/inputValidationHelper';

const postRouter = new Router();

// Test Route
postRouter.get('/', requireSignin, testPost);

// Get individual post
postRouter.get('/view/:postId', requireSignin, getSinglePost);

// create new post
postRouter.post('/create/:userId', requireSignin, inputPostRules(), validate, createPost);

postRouter.get('/wall/:userId', requireSignin, listByUser);

// like and dislike the post
postRouter.put('/like', requireSignin, likePost);
postRouter.put('/unlike', requireSignin, unlikePost);

// Comment and un comment
postRouter.put('/comment', requireSignin, inputCommentRules(), validate, commentPost);
postRouter.put('/uncomment', requireSignin, uncommentPost);

postRouter.post('/search/:userId', requireSignin, searchByTags);

// Params route
postRouter.param('userId', userByID);
postRouter.param('postId', postByID);

export default postRouter;
