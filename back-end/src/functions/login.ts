// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import bcryptjs, { hash } from 'bcryptjs';
import createJWT from '../functions/createJWT';
import UserInterface from '../interfaces/user';
import LoginInterface from '../interfaces/login';
import { updateUserData } from './upateUser';

const NAMESPACE = 'Users';

export const loginHelper = async (email: string, password: string): Promise<LoginInterface> => {
    let userData = {
        user: {},
        token: "",
        success: false,
        message: ""
    }

    let query = `SELECT * FROM users WHERE email = '${email}'`;

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, query)
                .then((users) => {
                    bcryptjs.compare(password, users[0].password, (error, result) => {
                        if (error) {
                            userData = {
                                user: {},
                                token: "",
                                success: false,
                                message: "Incorrect password"
                            }
                        } else if(result) {
                            createJWT(users[0], (_error, token) => {
                                if (error) {
                                    userData = {
                                        user: {},
                                        token: "",
                                        success: false,
                                        message: "Unable to create token"
                                    }
                                } else if (token) {
                                    // updateUserData('status', true);
                                    // updateUserData('token', token);
                                    userData = {
                                        user: users[0],
                                        token: token,
                                        success: true,
                                        message: "Authenticated Successfully"
                                    }
                                }
                            });
                        }
                    });
                    
                })
                .catch((error) => {
                    userData = {
                        user: {},
                        token: "",
                        success: false,
                        message: error.message
                    }
                });
        })
        .catch((error) => {
            userData = {
                user: {},
                token: "",
                success: false,
                message: error.message
            }
        });

    return userData as LoginInterface;
};