"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const NAMESPACE = 'Auth';
const createJWT = (user, callback) => {
    var timeSinEpoch = new Date().getTime();
    var expirationTime = timeSinEpoch + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jsonwebtoken_1.default.sign({
            email: user.email + '---' + user.id
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'RS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
                // callback(null, token? token : '');
            }
            else {
                // callback(null, token!);
                callback(null, token ? token : null);
            }
        });
    }
    catch (error) {
        // callback(error, null)
    }
};
exports.default = createJWT;
