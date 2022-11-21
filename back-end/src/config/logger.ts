const getTimeStamp = (): String => {
    return new Date().toISOString();
};

const info = (namespace: String, msg: string, obj?: any) => {
    if (obj) {
        console.log(`[${getTimeStamp}] [INFO] [${namespace} ${msg}]`, obj);
    } else {
        console.log(`[${getTimeStamp}] [INFO] [${namespace} ${msg}]`);
    }
};

const warn = (namespace: String, msg: string, obj?: any) => {
    if (obj) {
        console.warn(`[${getTimeStamp}] [WARN] [${namespace} ${msg}]`, obj);
    } else {
        console.warn(`[${getTimeStamp}] [WARN] [${namespace} ${msg}]`);
    }
};

const error = (namespace: String, msg: string, obj?: any) => {
    if (obj) {
        console.error(`[${getTimeStamp}] [ERROE] [${namespace} ${msg}]`, obj);
    } else {
        console.error(`[${getTimeStamp}] [ERROE] [${namespace} ${msg}]`);
    }
};

const debug = (namespace: String, msg: string, obj?: any) => {
    if (obj) {
        console.debug(`[${getTimeStamp}] [DEBUG] [${namespace} ${msg}]`, obj);
    } else {
        console.debug(`[${getTimeStamp}] [DEBUG] [${namespace} ${msg}]`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};