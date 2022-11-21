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
exports.checkUserBlocked = void 0;
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const NAMESPACE = 'Blocked';
const checkUserBlocked = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let authId = 1;
    let checkResult = {
        result: false,
        success: false
    };
    let query = `SELECT * FROM blocked WHERE blocked_user_id = '${user_id}' AND blocker_user_id = ${authId}`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((result) => {
            if (result.affectedRows > 0) {
                checkResult = {
                    result: true,
                    success: true
                };
            }
            else {
                checkResult = {
                    result: true,
                    success: true
                };
            }
        })
            .catch((error) => {
            checkResult = {
                result: false,
                success: false
            };
        });
    })
        .catch((error) => {
        checkResult = {
            result: false,
            success: false
        };
    });
    return checkResult;
});
exports.checkUserBlocked = checkUserBlocked;
