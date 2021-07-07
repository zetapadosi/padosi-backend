import { Router } from 'express';
import { hasAuthorization, registerUser, requireSignin } from '../controllers/authController';
import {
	getUserProfile,
	updateUserBio,
	updateUserDistance,
	updateUserLocation,
	userByID,
} from '../controllers/userContoller';
import { inputBioRules, inputDistanceRules, validate } from '../helper/inputValidationHelper';

// import { isLoggedIn } from '../helper/isLoggedInHelper';

const userRouter = new Router();


/*
 REGISTER USER WITH THER ROUTE
 api route
  /api/user/register
 */
userRouter.post('/register', registerUser);


userRouter.get('/:userId', requireSignin, getUserProfile);

// update the bio of the user
userRouter.put('/bio/:userId', requireSignin, hasAuthorization, inputBioRules(), validate, updateUserBio);

// update the user distance
userRouter.put(
	'/distance/:userId',
	requireSignin,
	hasAuthorization,
	inputDistanceRules(),
	validate,
	updateUserDistance,
);

/**
 * Added the params route
 */
userRouter.get('/:userId', requireSignin, getUserProfile);


userRouter.param('userId', userByID);
export default userRouter;
