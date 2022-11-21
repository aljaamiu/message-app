import { NextFunction, Request, Response } from 'express';
// import logger from '../config/logger';
import UserInterface from '../interfaces/user';
import { Connect, Query } from '../config/mysql';
import MySQLInterfaceResult from '../interfaces/result';
import CheckInterface from '../interfaces/check';

const NAMESPACE = 'Users';

export const checkUserExists = async (email: string): Promise<CheckInterface> => {
    let checkResult = {
        result: false,
        success: false
    };

    let query = `SELECT * FROM users WHERE email = '${email}'`;

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, query)
                .then((users) => {
                    if (users.length > 0) {
                        checkResult = {
                            result: true,
                            success: true
                        }
                    } else {
                        checkResult = {
                            result: false,
                            success: true
                        }
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
};
