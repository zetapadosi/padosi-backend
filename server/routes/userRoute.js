import { Router } from 'express';
import { isLoggedIn } from '../helper/isLoggedInHelper';

const userRouter = new Router();

userRouter.get('/',  async (req, res) => {
 try {
  console.log('userRoute-7', req.user);
  return res.status(200).json({ msg: 'Success', body: req.body });
 } catch (e) {
  console.error(e.message);
 }
});

export default userRouter;
