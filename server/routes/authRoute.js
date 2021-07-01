import { Router } from 'express';
import {  sigin, signout, testAuth } from '../controllers/authController';

const authRoute = new Router();

/*
 the url to test /api/auth/test
*/
authRoute.get('/test', testAuth);

/*
 userlogin route
 */
authRoute.post('/login',sigin)

/*
 user Logout route
 */
authRoute.get('/logout',signout)

export default authRoute;
