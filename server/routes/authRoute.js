import { Router } from 'express';
import {  sigin, testAuth } from '../controllers/authController';

const authRoute = new Router();

// Test Route

/*
 the url to test /api/auth/test
*/

authRoute.get('/test', testAuth);

/*
 userlogin route
 */
authRoute.post('/login',sigin)

export default authRoute;
