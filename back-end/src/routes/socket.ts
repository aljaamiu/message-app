import express from 'express';
import controller from '../controllers/socket';
import checkToken from '../middleware/checkJWT';

const router = express.Router();

router.get('/socket_on_message/:user_id', checkToken, controller.socketOnMessage);
router.get('/socket_on_block/:user_id', checkToken, controller.socketOnBlock);
router.get('/socket_on_user/:user_id', checkToken, controller.socketOnUser);

export = router;
