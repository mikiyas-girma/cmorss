import { Router } from 'express';
import authRouter from './auth.js';
import { scoreRouter } from './score.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/score', scoreRouter);

// To test the api
apiRouter.get('/hello', (req, res) => {
	res.status(200).json({ message: 'Hello from the server! nice' });
});

export default apiRouter;
