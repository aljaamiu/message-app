import express from 'express';
import controller from '../controllers/message';
import checkToken from '../middleware/checkJWT';

import { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post('/send_message', checkToken, controller.createMessage);
router.get('/get_messages/:user_id', checkToken, controller.getAllMessages);
export = router;
