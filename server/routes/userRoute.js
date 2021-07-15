import { Router } from 'express';
import { registerUser } from '../controllers/authController';
import {
	getUserDeletedPost,
	getUserProfile,
	otheUserProfile,
	updateUserBio,
	updateUserDistance,
	userByID,
} from '../controllers/userContoller';
import { inputBioRules, inputDistanceRules, validate } from '../helper/inputValidationHelper';
import { sessionCheck } from '../helper/sessionHelper';

const userRouter = new Router();

/*
 REGISTER USER WITH THER ROUTE
 api route
  /api/user/register
 */
userRouter.post('/register', registerUser);

userRouter.get('/', sessionCheck, getUserProfile);

userRouter.get('/:userId', sessionCheck, otheUserProfile);

// userRouter.get('/deletedPost', sessionCheck, getUserDeletedPost);

// update the bio of the user
userRouter.put('/bio', sessionCheck, inputBioRules(), validate, updateUserBio);

// update the user distance
userRouter.put('/distance', sessionCheck, inputDistanceRules(), validate, updateUserDistance);

userRouter.param('userId', userByID);
export default userRouter;
