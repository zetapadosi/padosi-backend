import { Router } from 'express';

const postRouter = new Router();

// Test Route

postRouter.get('/', (req, res) => {
 res.status(200).json({ msg: 'This is the postRoute', process: 'Success' });
});

export default postRouter;
