// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MessageInterface from '../interfaces/message';

const NAMESPACE = 'Messages';

interface GetChatResultInterface {
    result: MessageInterface[],
    success: boolean,
    message: string
}

export const getUserChats = async (): Promise<GetChatResultInterface> => {
    // let result: MessageInterface[] = [];
    let getResult = {
        result: [] as MessageInterface[],
        success: false,
        message: ""
    };

    let authId = 1;

    let query = `SELECT * FROM messages WHERE chat_id IS NULL AND (from_user_id = ${authId} OR to_user_id = ${authId}) ORDER BY id DESC`;

    Connect()
        .then((connection) => {
            Query<MessageInterface[]>(connection, query)
                .then((messages) => {
                    if (messages.length > 0) {
                        getResult = {
                            result: messages,
                            success: true,
                            message: "Chat collected successfuly"
                        }
                    } else {
                        getResult = {
                            result: [],
                            success: false,
                            message: "No chat found"
                        }
                    }  
                })
                .catch((error) => {
                    getResult = {
                        result: [],
                        success: false,
                        message: error.message
                    };
                });
        })
        .catch((error) => {
            getResult = {
                result: [],
                success: false,
                message: error.message
            };
        });
    return getResult;
};