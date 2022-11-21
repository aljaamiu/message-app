"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimeStamp = () => {
    return new Date().toISOString();
};
const info = (namespace, msg, obj) => {
    if (obj) {
        console.log(`[${getTimeStamp}] [INFO] [${namespace} ${msg}]`, obj);
    }
    else {
        console.log(`[${getTimeStamp}] [INFO] [${namespace} ${msg}]`);
    }
};
const warn = (namespace, msg, obj) => {
    if (obj) {
        console.warn(`[${getTimeStamp}] [WARN] [${namespace} ${msg}]`, obj);
    }
    else {
        console.warn(`[${getTimeStamp}] [WARN] [${namespace} ${msg}]`);
    }
};
const error = (namespace, msg, obj) => {
    if (obj) {
        console.error(`[${getTimeStamp}] [ERROE] [${namespace} ${msg}]`, obj);
    }
    else {
        console.error(`[${getTimeStamp}] [ERROE] [${namespace} ${msg}]`);
    }
};
const debug = (namespace, msg, obj) => {
    if (obj) {
        console.debug(`[${getTimeStamp}] [DEBUG] [${namespace} ${msg}]`, obj);
    }
    else {
        console.debug(`[${getTimeStamp}] [DEBUG] [${namespace} ${msg}]`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug
};
