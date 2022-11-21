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
exports.updateUserData = void 0;
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const updateUserData = (field, value, authId) => __awaiter(void 0, void 0, void 0, function* () {
    let res = false;
    let query = ``;
    // let query = `SELECT * FROM users WHERE id = '${email}'`;
    if (field == 'token') {
        query = `UPDATE users SET token = '${value}' WHERE id = '${authId}'`;
        // res = true;
    }
    else if (field == 'status') {
        query = `UPDATE users SET status = '${value}' WHERE id = '${authId}'`;
        // res = true;
    }
    else {
        return false;
    }
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((result) => {
            if (result.affectedRows > 0) {
                res = true;
            }
            else {
                res = false;
            }
        })
            .catch((error) => {
            res = false;
        });
    })
        .catch((error) => {
        res = false;
    });
    return res;
});
exports.updateUserData = updateUserData;
