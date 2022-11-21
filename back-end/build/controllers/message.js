"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const response_1 = require("../functions/response");
const NAMESPACE = 'Messages';
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { msg, to_user_id, message_type, from_user_id } = req.body;
    let authUser = from_user_id;
    if (to_user_id == authUser) {
        return res.status(500).json({
            message: "Sorry you can't message yourself"
        });
    }
    else {
        let query = `INSERT INTO messages (from_user_id, to_user_id, msg, message_type) VALUES ("${authUser}", "${to_user_id}", "${msg}", "${message_type}")`;
        (0, mysql_1.Connect)()
            .then((connection) => {
            (0, mysql_1.Query)(connection, query)
                .then((result) => {
                let chats = [];
                let query = `SELECT * FROM messages WHERE (from_user_id = ${to_user_id} AND to_user_id = ${authUser} OR from_user_id = ${authUser} AND to_user_id = ${to_user_id}) ORDER BY id DESC`;
                (0, mysql_1.Connect)()
                    .then((connection) => {
                    (0, mysql_1.Query)(connection, query)
                        .then((messages) => {
                        chats = messages;
                        // req.app.get('io').on("connection", (socket: Socket) => {
                        //     console.log("---------------------------")
                        //     console.log(socket.id)
                        //     // socket.on("sendMessage", data => socket.join(data))
                        //     socket.broadcast.emit("sendMessage", {
                        //         type: "message",
                        //         chats: messages,
                        //         user_id: authUser
                        //     });
                        // });
                        return res.status(200).json({
                            chats
                        });
                    })
                        .catch((error) => {
                        let errorR = (0, response_1.myErrorResponse)(error.message, error);
                        return res.status(500).json({
                            errorR
                        });
                    });
                })
                    .catch((error) => {
                    let errorR = (0, response_1.myErrorResponse)(error.message, error);
                    return res.status(500).json({
                        errorR
                    });
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    }
});
const getAllMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user_id = req.params.user_id;
    let authId = res.locals.jwt.email.split('---')[1];
    let chats = [];
    let query = `SELECT * FROM messages WHERE (from_user_id = ${user_id} AND to_user_id = ${authId} OR from_user_id = ${authId} AND to_user_id = ${user_id}) ORDER BY id DESC`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((messages) => {
            chats = messages;
            return res.status(200).json({
                chats
            });
        })
            .catch((error) => {
            let errorR = (0, response_1.myErrorResponse)(error.message, error);
            return res.status(500).json({
                errorR
            });
        });
    })
        .catch((error) => {
        let errorR = (0, response_1.myErrorResponse)(error.message, error);
        return res.status(500).json({
            errorR
        });
    });
});
exports.default = { createMessage, getAllMessages };
