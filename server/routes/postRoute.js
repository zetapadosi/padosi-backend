import { Router } from 'express';
import { requireSignin } from '../controllers/authController';

import {
	commentPost,
	createPost,
	editPost,
	getSinglePost,
	likePost,
	listByUser,
	postByID,
	removePost,
	searchByTags,
	testPost,
	uncommentPost,
	unlikePost,
} from '../controllers/postController';
import { userByID } from '../controllers/userContoller';
import { inputCommentRules, inputPostRules, validate } from '../helper/inputValidationHelper';
import { sessionCheck } from '../helper/sessionHelper';

const postRouter = new Router();

// Test Route
postRouter.get('/', sessionCheck, testPost);

postRouter.post('/create/', sessionCheck, inputPostRules(), validate, createPost);
// Get individual post
postRouter.get('/view/:postId', sessionCheck, getSinglePost);
postRouter.put('/edit/:postId', sessionCheck, editPost);

// create new post

postRouter.get('/wall', sessionCheck, listByUser);

// like and dislike the post
postRouter.put('/like', sessionCheck, likePost);
postRouter.put('/unlike', sessionCheck, unlikePost);

// Comment and un comment
postRouter.put('/comment', sessionCheck, inputCommentRules(), validate, commentPost);
postRouter.put('/uncomment', sessionCheck, uncommentPost);

postRouter.post('/search', sessionCheck, searchByTags);

postRouter.delete('/remove/:postId', sessionCheck, removePost);

// Params route
postRouter.param('userId', userByID);
postRouter.param('postId', postByID);

export default postRouter;
