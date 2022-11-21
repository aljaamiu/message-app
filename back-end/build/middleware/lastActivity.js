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
exports.lastActivity = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const mysql_1 = require("../config/mysql");
const NAMESPACE = 'Users';
let authId = 1;
const lastActivity = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(NAMESPACE, 'update user lastactivity');
    let res = true;
    let value = true;
    let query = `UPDATE users SET status = ${value} WHERE id = '${authId}'`;
    // res = true;
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
            logger_1.default.error(NAMESPACE, error.message, error);
            res = false;
        });
    })
        .catch((error) => {
        logger_1.default.error(NAMESPACE, error.message, error);
        res = false;
    });
    return res;
});
exports.lastActivity = lastActivity;
