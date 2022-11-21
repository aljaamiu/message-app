"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myErrorResponse = exports.mySuccessResponse = void 0;
const DeveloperNAME = 'Yakubu Muhammed-Jamiu (Emjay)';
const DeveloperEMAIL = 'yakubumuhammedjaamiu@gmail.com';
const DeveloperPHONE = '+233 559 148 214';
const DeveloperDate = '11/13/2022';
const mySuccessResponse = (message, success, data) => {
    return {
        data: data,
        message: message,
        success: success,
        developer: {
            DeveloperNAME,
            DeveloperEMAIL,
            DeveloperPHONE,
            DeveloperDate
        }
    };
};
exports.mySuccessResponse = mySuccessResponse;
const myErrorResponse = (message, error) => {
    return {
        error: error,
        message: message,
        success: false,
        developer: {
            DeveloperNAME,
            DeveloperEMAIL,
            DeveloperPHONE,
            DeveloperDate
        }
    };
};
exports.myErrorResponse = myErrorResponse;
