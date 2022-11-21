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
exports.getChatUsers = void 0;
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const getChatUsers = (idArr, field) => __awaiter(void 0, void 0, void 0, function* () {
    let getResult = {
        result: {},
        success: false,
        message: ""
    };
    let authId = 1;
    let query = ``;
    if (field == 'sender') {
        query = `SELECT * FROM messages INNER JOIN users ON messages.from_user_id = users.id WHERE messages.chat_id IN (${idArr})`;
    }
    else if (field == 'receiver') {
        query = `SELECT * FROM messages INNER JOIN users ON messages.to_user_id = users.id WHERE messages.chat_id IN (${idArr})`;
    }
    else {
        return {
            result: {},
            success: false,
            message: "Wrong parameter passed"
        };
    }
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((users) => {
            if (users.length > 0) {
                getResult = {
                    result: users[0],
                    success: true,
                    message: "Chat collected successfuly"
                };
            }
            else {
                getResult = {
                    result: {},
                    success: false,
                    message: "No chat found"
                };
            }
        })
            .catch((error) => {
            getResult = {
                result: {},
                success: false,
                message: error.message
            };
        });
    })
        .catch((error) => {
        getResult = {
            result: {},
            success: false,
            message: error.message
        };
    });
    return getResult;
});
exports.getChatUsers = getChatUsers;
