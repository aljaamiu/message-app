"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const PrivateKEY = fs_1.default.readFileSync(__dirname + '/../../private.key', 'utf8');
const PublicKEY = fs_1.default.readFileSync(__dirname + '/../../public.key', 'utf8');
// const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'message_app_db';
// const MYSQL_USER = process.env.MYSQL_HOST || 'root';
// const MYSQL_PASS = process.env.MYSQL_HOST || '';
const MYSQL_HOST = process.env.DB_HOST || 'sql9.freemysqlhosting.net';
const MYSQL_DATABASE = process.env.DB_NAME || 'sql9578999';
const MYSQL_USER = process.env.DB_USER || 'sql9578999';
const MYSQL_PASS = process.env.DB_PASSWORD || 'wZeDc2SVlf';
// Server: sql9.freemysqlhosting.net
// DB Name: sql9578999
// Username: sql9578999
// Password: wZeDc2SVlf
// Port number: 3306
// Your account number is: 721138
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "Emjay";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || PrivateKEY;
const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};
// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
// const SERVER_PORT = process.env.SERVER_PORT || 3003;
const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 3000;
// const SERVER_PORT = process.env.PORT || 3003;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};
const config = {
    mysql: MYSQL,
    server: SERVER
};
exports.default = config;
