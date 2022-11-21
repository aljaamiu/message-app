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
exports.checkUserExists = void 0;
const mysql_1 = require("../config/mysql");
const NAMESPACE = 'Users';
const checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let checkResult = {
        result: false,
        success: false
    };
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((users) => {
            if (users.length > 0) {
                checkResult = {
                    result: true,
                    success: true
                };
            }
            else {
                checkResult = {
                    result: false,
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
exports.checkUserExists = checkUserExists;
