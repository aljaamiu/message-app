import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PrivateKEY  = fs.readFileSync(__dirname+'/../../private.key', 'utf8');
const PublicKEY  = fs.readFileSync(__dirname+'/../../public.key', 'utf8');

const MYSQL_HOST = process.env.DB_HOST || 'localhost';
const MYSQL_DATABASE = process.env.DB_NAME || 'message_app_db';
const MYSQL_USER = process.env.DB_USER || 'root';
const MYSQL_PASS = process.env.DB_PASSWORD || '';

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "Emjay";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || PrivateKEY;

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';
// const SERVER_PORT = process.env.PORT || 3000;
const SERVER_PORT = process.env.PORT || 3003;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET as string
    }
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
