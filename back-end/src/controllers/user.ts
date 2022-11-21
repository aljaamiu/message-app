import { NextFunction, Request, Response } from 'express';
// import logger from '../config/logger';
import { Connect, Query } from '../config/mysql';
import bcryptjs, { hash } from 'bcryptjs';
import createJWT from '../functions/createJWT';
import UserInterface from '../interfaces/user';
import MySQLInterfaceResult from '../interfaces/result';
import {checkUserBlocked} from '../functions/checkBlocked';
import {checkUserExists} from '../functions/checkUser';
import {loginHelper} from '../functions/login';
import {updateUserData} from '../functions/upateUser';
import _ from 'lodash';

const NAMESPACE = 'Users';
interface BlockedUser {
    blocked_user_id: number,
    blocker_user_id: number
}

const register = async (req: Request, res: Response, next: NextFunction) => {

    let { email, password, name } = req.body;

    let checkQuery = `SELECT * FROM users WHERE email = '${email}'`;
    
    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, checkQuery)
                .then((users) => {
                    if (users.length > 0) {
                        return res.status(500).json({
                            message: "Already exists"
                        });
                    } else {
                        bcryptjs.hash(password, 10, (hashError, hash) => {
                            if(hashError) {
                                return res.status(500).json({
                                    message: hashError.message,
                                    error: hashError
                                });
                            }
                
                            let query = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hash}")`;
                
                            Connect()
                            .then((connection) => {
                                Query<MySQLInterfaceResult>(connection, query)
                                    .then((result) => {
                                        
                                        let loginQuery = `SELECT * FROM users WHERE email = '${email}'`;
                                
                                        Connect()
                                            .then((connection) => {
                                                Query<UserInterface[]>(connection, loginQuery)
                                                    .then((users) => {
                                                        if (users.length > 0) {
                                                            createJWT(users[0], (_error, token) => {
                                                                if (_error) {
                                                                } else if (token) {
                                                                    // updateUserData('status', true);
                                                                    // updateUserData('token', token);

                                                                    let updateQuery = `UPDATE users SET status = '${1}' WHERE email = '${email}'`;
                                                                        Connect()
                                                                        .then((connection) => {
                                                                            Query<MySQLInterfaceResult>(connection, updateQuery)
                                                                                .then((result) => {
                                                                                    if (result.affectedRows > 0) {
                                                                                        
                                                                                        // getBlockedList();
                                                                                        // getUsers();
                                                                                        
                                                                                        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${users[0].id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                                                            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${users[0].id}')`;
                                                                                    
                                                                                        Connect()
                                                                                            .then((connection) => {
                                                                                                Query<UserInterface[]>(connection, usersQuery)
                                                                                                    .then((allUsers) => {
                                                                                    
                                                                                                        let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${users[0].id}'`;
                                    
                                                                                                            Connect()
                                                                                                                .then((connection) => {
                                                                                                                    Query<BlockedUser[]>(connection, blockedQuery)
                                                                                                                        .then((blocked) => {
                                                                                                                            
                                                                                                                            return res.status(200).json({
                                                                                                                                user: users[0],
                                                                                                                                token: token,
                                                                                                                                users: allUsers,
                                                                                                                                blocked: _.map(blocked, (el) => el.blocked_user_id),
                                                                                                                                success: true,
                                                                                                                                message: "Created Successfully"
                                                                                                                            });
                                                                                                                            
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

                                                                    
                                                                }
                                                            });
                                                        } else {
                                                            return res.status(500).json({
                                                                message: "Error retrieving user"
                                                            });
                                                        }  
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
};

const login = async (req: Request, res: Response, next: NextFunction) => {

    let { email, password } = req.body;

    let query = `SELECT * FROM users WHERE email = '${email}'`;

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, query)
                .then((users) => {
                    bcryptjs.compare(password, users[0].password, (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                message: "Incorrect password"
                            });
                        } else if(result) {
                            createJWT(users[0], (_error, token) => {
                                if (error) {
                                    return res.status(401).json({
                                        message: "Unable to create token"
                                    });
                                } else if (token) {
                                    // updateUserData('status', true);
                                    // updateUserData('token', token);

                                    let updateQuery = `UPDATE users SET status = '${1}' WHERE email = '${email}'`;
                                    Connect()
                                    .then((connection) => {
                                        Query<MySQLInterfaceResult>(connection, updateQuery)
                                            .then((result) => {
                                                if (result.affectedRows > 0) {
                                                    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${users[0].id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${users[0].id}')`;
                                                
                                                    Connect()
                                                        .then((connection) => {
                                                            Query<UserInterface[]>(connection, usersQuery)
                                                                .then((allUsers) => {
                                                
                                                                    let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${users[0].id}'`;

                                                                        Connect()
                                                                            .then((connection) => {
                                                                                Query<BlockedUser[]>(connection, blockedQuery)
                                                                                    .then((blocked) => {
                                                                                        return res.status(200).json({
                                                                                            message: "Authenticated Successfully",
                                                                                            token,
                                                                                            user: users[0],
                                                                                            users: allUsers,
                                                                                            blocked: _.map(blocked, (el) => el.blocked_user_id),
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

                                    
                                }
                            });
                        }
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
};

const blockUser = async (req: Request, res: Response, next: NextFunction) => {

    let user_id = req.params.user_id;
    let authId = res.locals.jwt.email.split('---')[1];

    if (Number(user_id) == authId) {
        return res.status(500).json({
            message: "Operation not allowed"
        });
    }

    let checkQuery = `SELECT * FROM users WHERE id = '${user_id}'`;
    let checkBlockedQuery = `SELECT * FROM blocked WHERE blocked_user_id = '${user_id}' AND blocked_user_id = '${user_id}'`;
    
    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, checkQuery)
                .then((users) => {
                    if ((users.length > 0)) {
                        
                        Connect()
                        .then((connection) => {
                            Query<[]>(connection, checkBlockedQuery)
                                .then((blocked_users) => {
                                    if ((blocked_users.length > 0)) {
                                        let query = `DELETE FROM blocked WHERE blocked_user_id = ${user_id} AND blocker_user_id = ${authId}`;

                                        Connect()
                                            .then((connection) => {
                                                Query<MySQLInterfaceResult>(connection, query)
                                                    .then((result) => {
                                                        if (result.affectedRows > 0) {


                                                            let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                                FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                                                        
                                                            Connect()
                                                                .then((connection) => {
                                                                    Query<UserInterface[]>(connection, usersQuery)
                                                                        .then((allUsers) => {
                                                        
                                                                            let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${user_id}'`;
        
                                                                                Connect()
                                                                                    .then((connection) => {
                                                                                        Query<BlockedUser[]>(connection, blockedQuery)
                                                                                            .then((blocked) => {
                                                                                                return res.status(200).json({
                                                                                                    message: "User Unblocked Successfully",
                                                                                                    users: allUsers,
                                                                                                    blocked: _.map(blocked, (el) => el.blocked_user_id),
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
                                                                message: "User not unblocked please try again",
                                                            });
                                                        }
                                                        
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
                                    } else {
                                        let query = `INSERT INTO blocked (blocker_user_id, blocked_user_id) VALUES ("${authId}", "${user_id}")`;

                                        Connect()
                                        .then((connection) => {
                                            Query(connection, query)
                                                .then((result) => {

                                                    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                                                
                                                    Connect()
                                                        .then((connection) => {
                                                            Query<UserInterface[]>(connection, usersQuery)
                                                                .then((allUsers) => {
                                                
                                                                    let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${authId}'`;

                                                                        Connect()
                                                                            .then((connection) => {
                                                                                Query<BlockedUser[]>(connection, blockedQuery)
                                                                                    .then((blocked) => {
                                                                                        return res.status(200).json({
                                                                                            message: "User blocked Successfully",
                                                                                            users: allUsers,
                                                                                            blocked: _.map(blocked, (el) => el.blocked_user_id),
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
                        return res.status(500).json({
                            message: "User not found"
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
};

const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {

    let status = true;
    if (Number(req.params.status) == 0) {
        status = false;
    }
    let authId = res.locals.jwt.email.split('---')[1];

    let query = `UPDATE users SET status = ${status} WHERE id = '${authId}'`;
    Connect()
    .then((connection) => {
        Query<MySQLInterfaceResult>(connection, query)
            .then((result) => {
                if (result.affectedRows > 0) {
                    return res.status(200).json({
                        message: "Status updated"
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

    
};

const logout = async (req: Request, res: Response, next: NextFunction) => {

    // 
    let authId = res.locals.jwt.email.split('---')[1];

    updateUserData('status', false, authId);
    // updateUserData('token', "", authId);
    
    //
    return res.status(200).json({
        message: "Good bye"
    });

    // let status = true;
    // if (Number(req.params.status) == 0) {
    //     status = false;
    // }
    // let authId = 1;

    // let query = `UPDATE users SET status = ${status} WHERE id = '${authId}'`;
    // Connect()
    // .then((connection) => {
    //     Query<MySQLInterfaceResult>(connection, query)
    //         .then((result) => {
    //             if (result.affectedRows > 0) {
    //                 return res.status(200).json({
    //                     message: "Status updated"
    //                 });
    //             } else {
    //                 return res.status(500).json({
    //                     message: "Error updating status"
    //                 });
    //             }  
    //         })
    //         .catch((error) => {
    //             logger.error(NAMESPACE, error.message, error);
    //                 return res.status(500).json({
    //                 message: error.message,
    //                 error: error
    //             });
    //         });
    // })
    // .catch((error) => {
    //     logger.error(NAMESPACE, error.message, error);
    //     return res.status(500).json({
    //         message: error.message,
    //         error: error
    //     });
    // });
    
};


const getAllusers = async (req: Request, res: Response, next: NextFunction) => {
    let auth_user_id = res.locals.jwt.email.split('---')[1];

    // let query = 'SELECT id, name, email FROM users';
    let query = `SELECT id, name, email FROM users as u WHERE (u.id != '${auth_user_id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${auth_user_id}')`;

    Connect()
        .then((connection) => {
            Query<UserInterface[]>(connection, query)
                .then((users) => {

                    return res.status(200).json({
                        users,
                        count: users.length
                    });
                })
                .catch((error) => {

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
        })
        .catch((error) => {

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getBlockedUsers = async (req: Request, res: Response, next: NextFunction) => {
    let auth_user_id = res.locals.jwt.email.split('---')[1];

    interface BlockedUser {
        blocked_user_id: number,
        blocker_user_id: number
    }

    // let query = 'SELECT id, name, email FROM users';
    let query = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${auth_user_id}'`;

    Connect()
        .then((connection) => {
            Query<BlockedUser[]>(connection, query)
                .then((users) => {
                    
                    return res.status(200).json({
                        users: _.map(users, (el) => el.blocked_user_id),
                        count: users.length
                    });
                })
                .catch((error) => {

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
        })
        .catch((error) => {

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};


export default { getBlockedUsers, register, getAllusers, blockUser, login, updateUserStatus, logout };
