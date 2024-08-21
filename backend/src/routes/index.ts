import { Router } from "express";
import { authRouter } from "./auth";
import { roomRouter } from "./room";
import { scoreRouter } from "./score";

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/room', roomRouter);
apiRouter.use('/score', scoreRouter);

// To test the api
apiRouter.get('/hello', (req, res) => {
	res.status(200).json({ message: 'Hello from the server! nice' });
});

export default apiRouter;