import { Router } from 'express';
import { loginAuth, testAuth } from '../controllers/authController';

const authRoute = new Router();

// Test Route

/*
 the url to test /api/auth/test
*/

authRoute.get('/test', testAuth);

/*
 userlogin route
 */

authRoute.post('/login',loginAuth)

export default authRoute;
