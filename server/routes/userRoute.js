import { Router } from 'express';
import { registerUser } from '../controllers/authController';
import {
<<<<<<< HEAD
	getUserDeletedPost,
=======
	getRemovedPost,
>>>>>>> 938b67459cb8490e9139b5d9e3c15b4e8334a320
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
// Get removed post of the user logged in
userRouter.get('/removedPost', sessionCheck, getRemovedPost);
// update the bio of the user
userRouter.put('/bio', sessionCheck, inputBioRules(), validate, updateUserBio);
// update the user distance
userRouter.put('/distance', sessionCheck, inputDistanceRules(), validate, updateUserDistance);

userRouter.get('/:userId', sessionCheck, otheUserProfile);

userRouter.param('userId', userByID);
export default userRouter;
