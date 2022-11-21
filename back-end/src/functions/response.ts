import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MySQLInterfaceResult from '../interfaces/result';

const DeveloperNAME = 'Yakubu Muhammed-Jamiu (Emjay)';
const DeveloperEMAIL = 'yakubumuhammedjaamiu@gmail.com';
const DeveloperPHONE = '+233 559 148 214';
const DeveloperDate = '11/13/2022';

interface SuccessInterface {
    data: any,
    message: string,
    success: boolean,
    developer: any
}

interface ErrorInterface {
    error: any,
    message: string,
    success: boolean,
    developer: any
}

export const mySuccessResponse = (message: string, success: boolean, data?: any): SuccessInterface => {
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
    }
    
};

export const myErrorResponse = (message: string, error?: any): ErrorInterface => {
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
    }
    
};
