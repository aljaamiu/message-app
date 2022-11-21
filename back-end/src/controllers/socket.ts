import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import _ from "lodash";
import MessageInterface from '../interfaces/message';
import { myErrorResponse } from '../functions/response';
import UserInterface from '../interfaces/user';
import MySQLInterfaceResult from '../interfaces/result';

const NAMESPACE = 'Socket';

const socketOnMessage = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(NAMESPACE, `message called`, req);

    let data = req.params.user_id;
    let doer_id = data.split('-')[0];
    let user_id = data.split('-')[0];
    let authId = res.locals.jwt.email.split('---')[1];
    let chats: MessageInterface[] = [];

    let query = `SELECT * FROM messages WHERE (from_user_id = ${user_id} AND to_user_id = ${authId} OR from_user_id = ${authId} AND to_user_id = ${user_id}) ORDER BY id DESC`;

    Connect()
        .then((connection) => {
            Query<MessageInterface[]>(connection, query)
                .then((messages) => {

                    chats = messages;

                    return res.status(200).json({
                        chats,
                        user_id: doer_id
                    });
                })
                .catch((error) => {
                    let errorR = myErrorResponse(
                        error.message,
                        error
                    )
                    return res.status(500).json({
                        errorR
                    });
                    
                });
        })
        .catch((error) => {
            logger.info(NAMESPACE, error.message, error);
            let errorR = myErrorResponse(
                error.message,
                error
            )
            return res.status(500).json({
                errorR
            });
            
        });
};

const socketOnBlock = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(NAMESPACE, `block called`, req);
    let doer_id = req.params.user_id;

    let authId = res.locals.jwt.email.split('---')[1];

    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, usersQuery)
                .then((allUsers) => {

                    return res.status(200).json({
                        message: "User Unblocked Successfully",
                        users: allUsers,
                        user_id: doer_id
                    })
                })
                .catch((error) => {
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
};

const socketOnUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(NAMESPACE, `user called`, req);
    let data = req.params.user_id;
    let doer_id = data.split('-')[0];
    let type = data.split('-')[1];

    let authId = res.locals.jwt.email.split('---')[1];

    if (type == 'left') {

        let updateQuery = `UPDATE users SET status = '${0}' WHERE id = '${authId}'`;
        Connect()
        .then((connection) => {
            Query<MySQLInterfaceResult>(connection, updateQuery)
                .then((result) => {
                    if (result.affectedRows > 0) {
                        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                
                        Connect()
                            .then((connection) => {
                                Query<UserInterface[]>(connection, usersQuery)
                                    .then((allUsers) => {
                
                                        return res.status(200).json({
                                            message: "User Fetched Successfully",
                                            users: allUsers,
                                            user_id: doer_id
                                        })
                                    })
                                    .catch((error) => {
                                        return res.status(500).json({
                                            message: error.message,
                                            error: error
                                        });
                                    })
                            })
                            .catch((error) => {
                                return res.status(500).json({
                                    message: error.message,
                                    error: error
                                });
                            });
                        
                    } else {
                        return res.status(500).json({
                            message: "Error updating status"
                        });
                    }  
                })
                .catch((error) => {
                        return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });

    } else {
        // let usersQuery = `SELECT id, name, email FROM users as u WHERE u.id != '${authId}' AND NOT EXISTS ( SELECT *
        //     FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;

        Connect()
            .then((connection) => {
                Query<UserInterface[]>(connection, usersQuery)
                    .then((allUsers) => {

                        return res.status(200).json({
                            message: "User Fetched Successfully",
                            users: allUsers,
                            user_id: doer_id
                        })
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error: error
                        });
                    })
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error
                });
            });
    }
};

export default { socketOnBlock, socketOnMessage, socketOnUser };
