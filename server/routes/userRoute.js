import { Router } from 'express';
import { registerUser, requireSignin } from '../controllers/authController';
import { getUserProfile } from '../controllers/userContoller';
// import { isLoggedIn } from '../helper/isLoggedInHelper';

const userRouter = new Router();

userRouter.get('/', async (req, res) => {
	try {
		return res.status(200).json({ msg: 'Success', body: req.body });
	} catch (e) {
		console.error(e.message);
	}
});

/*
 REGISTER USER WITH THER ROUTE
 api route
  /api/user/register
 */
userRouter.post('/register', registerUser);

userRouter.get('/:userId', requireSignin, getUserProfile);

export default userRouter;
