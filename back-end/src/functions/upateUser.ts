// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MySQLInterfaceResult from '../interfaces/result';


export const updateUserData = async (field: string, value: string | boolean, authId: number): Promise<boolean> => {
    
    let res = false;
    let query = ``;

    // let query = `SELECT * FROM users WHERE id = '${email}'`;
    if (field == 'token') {
        query = `UPDATE users SET token = '${value}' WHERE id = '${authId}'`;
        // res = true;
    } else if (field == 'status') {
        query = `UPDATE users SET status = '${value}' WHERE id = '${authId}'`;
        // res = true;
    } else {
        return false;
    }

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
                    res = false;
                });
        })
        .catch((error) => {
            res = false;
        });
    return res;
};
