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
exports.getChatMessages = void 0;
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const NAMESPACE = 'Messages';
const getChatMessages = (chat_id_arr) => __awaiter(void 0, void 0, void 0, function* () {
    // let result: MessageInterface[] = [];
    let getResult = {
        result: [],
        success: false,
        message: ""
    };
    let query = `SELECT * FROM messages WHERE chat_id IN (${chat_id_arr})`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((messages) => {
            if (messages.length > 0) {
                getResult = {
                    result: messages,
                    success: true,
                    message: "Chat messages collected successfuly"
                };
            }
            else {
                getResult = {
                    result: [],
                    success: false,
                    message: "No chat message found"
                };
            }
        })
            .catch((error) => {
            getResult = {
                result: [],
                success: false,
                message: error.message
            };
        });
    })
        .catch((error) => {
        getResult = {
            result: [],
            success: false,
            message: error.message
        };
    });
    return getResult;
});
exports.getChatMessages = getChatMessages;
