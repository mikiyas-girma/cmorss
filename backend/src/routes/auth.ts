import express from 'express';
import { signin, signup } from '../controllers/auth.controllers.ts';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);


export default router;
