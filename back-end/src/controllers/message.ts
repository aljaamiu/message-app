import { NextFunction, Request, Response } from 'express';
// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import _ from "lodash";
import MessageInterface from '../interfaces/message';
import { myErrorResponse } from '../functions/response';
import { Socket } from "socket.io";

const NAMESPACE = 'Messages';

const createMessage = async (req: Request, res: Response, next: NextFunction) => {

    let {msg, to_user_id, message_type, from_user_id} = req.body;
    let authUser = from_user_id;

    if (to_user_id == authUser) {

        return res.status(500).json({
            message: "Sorry you can't message yourself"
        });
    } else {
        let query = `INSERT INTO messages (from_user_id, to_user_id, msg, message_type) VALUES ("${authUser}", "${to_user_id}", "${msg}", "${message_type}")`;

        Connect()
            .then((connection) => {
                Query(connection, query)
                    .then((result) => {

                        let chats: MessageInterface[] = [];
                        let query = `SELECT * FROM messages WHERE (from_user_id = ${to_user_id} AND to_user_id = ${authUser} OR from_user_id = ${authUser} AND to_user_id = ${to_user_id}) ORDER BY id DESC`;

                        Connect()
                            .then((connection) => {
                                Query<MessageInterface[]>(connection, query)
                                    .then((messages) => {
                                        chats = messages;

                                        // req.app.get('io').on("connection", (socket: Socket) => {
                                        //     console.log("---------------------------")
                                        //     console.log(socket.id)
                                        
                                        //     // socket.on("sendMessage", data => socket.join(data))
                                        //     socket.broadcast.emit("sendMessage", {
                                        //         type: "message",
                                        //         chats: messages,
                                        //         user_id: authUser
                                        //     });
                                        // });

                                        return res.status(200).json({
                                            chats
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

                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            })
            .catch((error) => {

                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    }
};

const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {

    let user_id = req.params.user_id;
    let authId = res.locals.jwt.email.split('---')[1];
    let chats: MessageInterface[] = [];
    let query = `SELECT * FROM messages WHERE (from_user_id = ${user_id} AND to_user_id = ${authId} OR from_user_id = ${authId} AND to_user_id = ${user_id}) ORDER BY id DESC`;

    Connect()
        .then((connection) => {
            Query<MessageInterface[]>(connection, query)
                .then((messages) => {

                    chats = messages;

                    return res.status(200).json({
                        chats
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
            let errorR = myErrorResponse(
                error.message,
                error
            )
            return res.status(500).json({
                errorR
            });
            
        });
};

export default { createMessage, getAllMessages };
