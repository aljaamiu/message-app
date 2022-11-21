import { NextFunction, Request, Response } from 'express';
// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MySQLInterfaceResult from '../interfaces/result';
import CheckInterface from '../interfaces/check';

const NAMESPACE = 'Blocked';

export const checkUserBlocked = async (user_id: number): Promise<CheckInterface> => {
    let authId = 1;
    let checkResult = {
        result: false,
        success: false
    };

    let query = `SELECT * FROM blocked WHERE blocked_user_id = '${user_id}' AND blocker_user_id = ${authId}`;

    Connect()
        .then((connection) => {
            Query<MySQLInterfaceResult>(connection, query)
                .then((result) => {
                    if (result.affectedRows > 0) {
                        checkResult = {
                            result: true,
                            success: true
                        }
                    } else {
                        checkResult = {
                            result: true,
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
