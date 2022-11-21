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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const mysql_1 = require("../config/mysql");
const response_1 = require("../functions/response");
const NAMESPACE = 'Socket';
const socketOnMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(NAMESPACE, `message called`, req);
    let data = req.params.user_id;
    let doer_id = data.split('-')[0];
    let user_id = data.split('-')[0];
    let authId = res.locals.jwt.email.split('---')[1];
    let chats = [];
    let query = `SELECT * FROM messages WHERE (from_user_id = ${user_id} AND to_user_id = ${authId} OR from_user_id = ${authId} AND to_user_id = ${user_id}) ORDER BY id DESC`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((messages) => {
            chats = messages;
            return res.status(200).json({
                chats,
                user_id: doer_id
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
        logger_1.default.info(NAMESPACE, error.message, error);
        let errorR = (0, response_1.myErrorResponse)(error.message, error);
        return res.status(500).json({
            errorR
        });
    });
});
const socketOnBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(NAMESPACE, `block called`, req);
    let doer_id = req.params.user_id;
    let authId = res.locals.jwt.email.split('---')[1];
    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, usersQuery)
            .then((allUsers) => {
            return res.status(200).json({
                message: "User Unblocked Successfully",
                users: allUsers,
                user_id: doer_id
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
});
const socketOnUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(NAMESPACE, `user called`, req);
    let data = req.params.user_id;
    let doer_id = data.split('-')[0];
    let type = data.split('-')[1];
    let authId = res.locals.jwt.email.split('---')[1];
    if (type == 'left') {
        let updateQuery = `UPDATE users SET status = '${0}' WHERE id = '${authId}'`;
        (0, mysql_1.Connect)()
            .then((connection) => {
            (0, mysql_1.Query)(connection, updateQuery)
                .then((result) => {
                if (result.affectedRows > 0) {
                    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                    (0, mysql_1.Connect)()
                        .then((connection) => {
                        (0, mysql_1.Query)(connection, usersQuery)
                            .then((allUsers) => {
                            return res.status(200).json({
                                message: "User Fetched Successfully",
                                users: allUsers,
                                user_id: doer_id
                            });
                        })
                            .catch((error) => {
                            return res.status(500).json({
                                message: error.message,
                                error: error
                            });
                        });
                    })
                        .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    });
                }
                else {
                    return res.status(500).json({
                        message: "Error updating status"
                    });
                }
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    }
    else {
        // let usersQuery = `SELECT id, name, email FROM users as u WHERE u.id != '${authId}' AND NOT EXISTS ( SELECT *
        //     FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
        (0, mysql_1.Connect)()
            .then((connection) => {
            (0, mysql_1.Query)(connection, usersQuery)
                .then((allUsers) => {
                return res.status(200).json({
                    message: "User Fetched Successfully",
                    users: allUsers,
                    user_id: doer_id
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    }
});
exports.default = { socketOnBlock, socketOnMessage, socketOnUser };
