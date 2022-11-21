"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post('/send_message', checkToken, controller.createMessage);
// router.get('/get_messages/:user_id', checkToken, controller.getAllMessages);
router.get('/', (req, res) => {
    res.send('Code with Rico. Ready to run on Heroku.');
});
module.exports = router;
