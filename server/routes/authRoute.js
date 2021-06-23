import passport from 'passport';
import { Router } from 'express';

const authRoute = new Router();

// Test Route

authRoute.get('/', (req, res) => {
 res.status(200).json({ msg: 'This is working', process: 'Success' });
});

authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRoute.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), async (req, res) => {
 try {
  return res.status(200).json({ msg: 'Success', body: 'Data of user stored' });
 } catch (err) {
  console.error(err.message);
 }
});

authRoute.get('/logout', async (req, res) => {
 try {
  req.session = null;
  req.logout();
  return res.status(200).json({ msg: 'Success', body: 'You are logged out successfully' });
 } catch (e) {
  console.error(e.message);
 }
});

export default authRoute;
