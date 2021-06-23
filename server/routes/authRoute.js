import passport from 'passport';
import { Router } from 'express';
import { googleAuthController } from '../controllers/authController';

const authRoute = new Router();

// Test Route

authRoute.get('/', (req, res) => {
 res.status(200).json({ msg: 'This is working', process: 'Success' });
});

authRoute.get('/google',  passport.authenticate('google', {
  scope: [
   'profile','email'
  ]
}))
 
authRoute.get('/google/callback', passport.authenticate('google',{failureRedirect:'/failed'}), async (req,res) => {
 try {
  return res.status(200)
 } catch (err) {
  console.error(err.message);
 }
})

export default authRoute;
