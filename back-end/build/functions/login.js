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
exports.loginHelper = void 0;
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJWT_1 = __importDefault(require("../functions/createJWT"));
const NAMESPACE = 'Users';
const loginHelper = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let userData = {
        user: {},
        token: "",
        success: false,
        message: ""
    };
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((users) => {
            bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
                if (error) {
                    userData = {
                        user: {},
                        token: "",
                        success: false,
                        message: "Incorrect password"
                    };
                }
                else if (result) {
                    (0, createJWT_1.default)(users[0], (_error, token) => {
                        if (error) {
                            userData = {
                                user: {},
                                token: "",
                                success: false,
                                message: "Unable to create token"
                            };
                        }
                        else if (token) {
                            // updateUserData('status', true);
                            // updateUserData('token', token);
                            userData = {
                                user: users[0],
                                token: token,
                                success: true,
                                message: "Authenticated Successfully"
                            };
                        }
                    });
                }
            });
        })
            .catch((error) => {
            userData = {
                user: {},
                token: "",
                success: false,
                message: error.message
            };
        });
    })
        .catch((error) => {
        userData = {
            user: {},
            token: "",
            success: false,
            message: error.message
        };
    });
    return userData;
});
exports.loginHelper = loginHelper;
