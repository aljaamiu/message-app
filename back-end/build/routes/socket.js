"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const socket_1 = __importDefault(require("../controllers/socket"));
const checkJWT_1 = __importDefault(require("../middleware/checkJWT"));
const router = express_1.default.Router();
router.get('/socket_on_message/:user_id', checkJWT_1.default, socket_1.default.socketOnMessage);
router.get('/socket_on_block/:user_id', checkJWT_1.default, socket_1.default.socketOnBlock);
router.get('/socket_on_user/:user_id', checkJWT_1.default, socket_1.default.socketOnUser);
module.exports = router;
