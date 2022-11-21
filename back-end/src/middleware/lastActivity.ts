import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MySQLInterfaceResult from '../interfaces/result';

const NAMESPACE = 'Users';
let authId = 1;

export const lastActivity = async (): Promise<boolean> => {
    logger.info(NAMESPACE, 'update user lastactivity');
    let res = true;
    let value = true;

    let query = `UPDATE users SET status = ${value} WHERE id = '${authId}'`;
        // res = true;

    Connect()
        .then((connection) => {
            Query<MySQLInterfaceResult>(connection, query)
                .then((result) => {
                    if (result.affectedRows > 0) {
                        res = true;
                    } else {
                        res = false;
                    }  
                })
                .catch((error) => {
                    logger.error(NAMESPACE, error.message, error);
                    res = false;
                });
        })
        .catch((error) => {
            logger.error(NAMESPACE, error.message, error);
            res = false;
        });
    return res;
};
