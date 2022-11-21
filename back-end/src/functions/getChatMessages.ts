// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import MessageInterface from '../interfaces/message';

const NAMESPACE = 'Messages';

interface GetChatMessageResultInterface {
    result: MessageInterface[],
    success: boolean,
    message: string
}

export const getChatMessages = async (chat_id_arr: number[]): Promise<GetChatMessageResultInterface> => {
    // let result: MessageInterface[] = [];
    let getResult = {
        result: [] as MessageInterface[],
        success: false,
        message: ""
    };

    let query = `SELECT * FROM messages WHERE chat_id IN (${chat_id_arr})`;

    Connect()
        .then((connection) => {
            Query<MessageInterface[]>(connection, query)
                .then((messages) => {
                    if (messages.length > 0) {
                        getResult = {
                            result: messages,
                            success: true,
                            message: "Chat messages collected successfuly"
                        }
                    } else {
                        getResult = {
                            result: [],
                            success: false,
                            message: "No chat message found"
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