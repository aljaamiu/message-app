import express from 'express';
import controller from '../controllers/user';
import checkToken from '../middleware/checkJWT';
import { lastActivity } from '../middleware/lastActivity';

const router = express.Router();

router.post('/register_user', controller.register);

router.get('/get_users', checkToken, controller.getAllusers);
// router.get('/get_users', [checkToken, lastActivity], controller.getAllusers);
// router.get('/get_users', controller.getAllusers);

// router.get('/block_user/:user_id', controller.blockUser);
router.get('/block_user/:user_id', checkToken, controller.blockUser);
// router.get('/unblock_user/:user_id', checkToken, controller.unblockUser);
router.get('/blocked_users', checkToken, controller.getBlockedUsers);
// router.get('/block_user/user_id/:user_id/name/:name', checkToken, controller.blockUser);

// router.get('/validate_token', controller.validateToken);
router.post('/login', controller.login);
router.get('/logout', checkToken, controller.logout);

router.get('/update_user_status/:status', checkToken, controller.updateUserStatus);

export = router;
