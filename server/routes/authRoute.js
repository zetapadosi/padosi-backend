import { Router } from 'express';
import { testAuth } from '../controllers/authController';

const authRoute = new Router();

// Test Route

/* 
 the url to test /api/auth/test
*/

authRoute.get('/test', testAuth);

export default authRoute;
