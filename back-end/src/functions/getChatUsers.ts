// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import UserInterface from '../interfaces/user';

interface GetChatUserResultInterface {
    result: UserInterface,
    success: boolean,
    message: string
}

export const getChatUsers = async (idArr: number[], field: string): Promise<GetChatUserResultInterface> => {
    
    let getResult = {
        result: {} as UserInterface,
        success: false,
        message: ""
    };

    let authId = 1;
    let query = ``;

    if (field == 'sender') {
        query = `SELECT * FROM messages INNER JOIN users ON messages.from_user_id = users.id WHERE messages.chat_id IN (${idArr})`;
    } else if (field == 'receiver') {
        query = `SELECT * FROM messages INNER JOIN users ON messages.to_user_id = users.id WHERE messages.chat_id IN (${idArr})`;
    } else {
        return {
            result: {} as UserInterface,
            success: false,
            message: "Wrong parameter passed"
        }
    }

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, query)
                .then((users) => {
                    if (users.length > 0) {
                        getResult = {
                            result: users[0],
                            success: true,
                            message: "Chat collected successfuly"
                        }
                    } else {
                        getResult = {
                            result: {} as UserInterface,
                            success: false,
                            message: "No chat found"
                        }
                    }  
                })
                .catch((error) => {
                    getResult = {
                        result: {} as UserInterface,
                        success: false,
                        message: error.message
                    };
                });
        })
        .catch((error) => {
            getResult = {
                result: {} as UserInterface,
                success: false,
                message: error.message
            };
        });
    return getResult;
};