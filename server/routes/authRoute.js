import passport from 'passport';
import { Router } from 'express';

const authRoute = new Router();

// Test Route

authRoute.get('/', (req, res) => {
 res.status(200).json({ msg: 'This is working', process: 'Success' });
});

export default authRoute;
