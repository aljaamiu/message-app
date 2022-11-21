"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import logger from '../config/logger';
const mysql_1 = require("../config/mysql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createJWT_1 = __importDefault(require("../functions/createJWT"));
const upateUser_1 = require("../functions/upateUser");
const lodash_1 = __importDefault(require("lodash"));
const NAMESPACE = 'Users';
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, name } = req.body;
    let checkQuery = `SELECT * FROM users WHERE email = '${email}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, checkQuery)
            .then((users) => {
            if (users.length > 0) {
                return res.status(500).json({
                    message: "Already exists"
                });
            }
            else {
                bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
                    if (hashError) {
                        return res.status(500).json({
                            message: hashError.message,
                            error: hashError
                        });
                    }
                    let query = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hash}")`;
                    (0, mysql_1.Connect)()
                        .then((connection) => {
                        (0, mysql_1.Query)(connection, query)
                            .then((result) => {
                            let loginQuery = `SELECT * FROM users WHERE email = '${email}'`;
                            (0, mysql_1.Connect)()
                                .then((connection) => {
                                (0, mysql_1.Query)(connection, loginQuery)
                                    .then((users) => {
                                    if (users.length > 0) {
                                        (0, createJWT_1.default)(users[0], (_error, token) => {
                                            if (_error) {
                                            }
                                            else if (token) {
                                                // updateUserData('status', true);
                                                // updateUserData('token', token);
                                                let updateQuery = `UPDATE users SET status = '${1}' WHERE email = '${email}'`;
                                                (0, mysql_1.Connect)()
                                                    .then((connection) => {
                                                    (0, mysql_1.Query)(connection, updateQuery)
                                                        .then((result) => {
                                                        if (result.affectedRows > 0) {
                                                            // getBlockedList();
                                                            // getUsers();
                                                            let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${users[0].id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                                                            FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${users[0].id}')`;
                                                            (0, mysql_1.Connect)()
                                                                .then((connection) => {
                                                                (0, mysql_1.Query)(connection, usersQuery)
                                                                    .then((allUsers) => {
                                                                    let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${users[0].id}'`;
                                                                    (0, mysql_1.Connect)()
                                                                        .then((connection) => {
                                                                        (0, mysql_1.Query)(connection, blockedQuery)
                                                                            .then((blocked) => {
                                                                            return res.status(200).json({
                                                                                user: users[0],
                                                                                token: token,
                                                                                users: allUsers,
                                                                                blocked: lodash_1.default.map(blocked, (el) => el.blocked_user_id),
                                                                                success: true,
                                                                                message: "Created Successfully"
                                                                            });
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
                                                        else {
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
                                    else {
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
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((users) => {
            bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        message: "Incorrect password"
                    });
                }
                else if (result) {
                    (0, createJWT_1.default)(users[0], (_error, token) => {
                        if (error) {
                            return res.status(401).json({
                                message: "Unable to create token"
                            });
                        }
                        else if (token) {
                            // updateUserData('status', true);
                            // updateUserData('token', token);
                            let updateQuery = `UPDATE users SET status = '${1}' WHERE email = '${email}'`;
                            (0, mysql_1.Connect)()
                                .then((connection) => {
                                (0, mysql_1.Query)(connection, updateQuery)
                                    .then((result) => {
                                    if (result.affectedRows > 0) {
                                        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${users[0].id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${users[0].id}')`;
                                        (0, mysql_1.Connect)()
                                            .then((connection) => {
                                            (0, mysql_1.Query)(connection, usersQuery)
                                                .then((allUsers) => {
                                                let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${users[0].id}'`;
                                                (0, mysql_1.Connect)()
                                                    .then((connection) => {
                                                    (0, mysql_1.Query)(connection, blockedQuery)
                                                        .then((blocked) => {
                                                        return res.status(200).json({
                                                            message: "Authenticated Successfully",
                                                            token,
                                                            user: users[0],
                                                            users: allUsers,
                                                            blocked: lodash_1.default.map(blocked, (el) => el.blocked_user_id),
                                                        });
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
                                    else {
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
});
const blockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user_id = req.params.user_id;
    let authId = res.locals.jwt.email.split('---')[1];
    if (Number(user_id) == authId) {
        return res.status(500).json({
            message: "Operation not allowed"
        });
    }
    let checkQuery = `SELECT * FROM users WHERE id = '${user_id}'`;
    let checkBlockedQuery = `SELECT * FROM blocked WHERE blocked_user_id = '${user_id}' AND blocked_user_id = '${user_id}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, checkQuery)
            .then((users) => {
            if ((users.length > 0)) {
                (0, mysql_1.Connect)()
                    .then((connection) => {
                    (0, mysql_1.Query)(connection, checkBlockedQuery)
                        .then((blocked_users) => {
                        if ((blocked_users.length > 0)) {
                            let query = `DELETE FROM blocked WHERE blocked_user_id = ${user_id} AND blocker_user_id = ${authId}`;
                            (0, mysql_1.Connect)()
                                .then((connection) => {
                                (0, mysql_1.Query)(connection, query)
                                    .then((result) => {
                                    if (result.affectedRows > 0) {
                                        let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                                FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                                        (0, mysql_1.Connect)()
                                            .then((connection) => {
                                            (0, mysql_1.Query)(connection, usersQuery)
                                                .then((allUsers) => {
                                                let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${user_id}'`;
                                                (0, mysql_1.Connect)()
                                                    .then((connection) => {
                                                    (0, mysql_1.Query)(connection, blockedQuery)
                                                        .then((blocked) => {
                                                        return res.status(200).json({
                                                            message: "User Unblocked Successfully",
                                                            users: allUsers,
                                                            blocked: lodash_1.default.map(blocked, (el) => el.blocked_user_id),
                                                        });
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
                                    else {
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
                        }
                        else {
                            let query = `INSERT INTO blocked (blocker_user_id, blocked_user_id) VALUES ("${authId}", "${user_id}")`;
                            (0, mysql_1.Connect)()
                                .then((connection) => {
                                (0, mysql_1.Query)(connection, query)
                                    .then((result) => {
                                    let usersQuery = `SELECT id, name, email FROM users as u WHERE (u.id != '${authId}' AND status ='${1}') AND NOT EXISTS ( SELECT *
                                                        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${authId}')`;
                                    (0, mysql_1.Connect)()
                                        .then((connection) => {
                                        (0, mysql_1.Query)(connection, usersQuery)
                                            .then((allUsers) => {
                                            let blockedQuery = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${authId}'`;
                                            (0, mysql_1.Connect)()
                                                .then((connection) => {
                                                (0, mysql_1.Query)(connection, blockedQuery)
                                                    .then((blocked) => {
                                                    return res.status(200).json({
                                                        message: "User blocked Successfully",
                                                        users: allUsers,
                                                        blocked: lodash_1.default.map(blocked, (el) => el.blocked_user_id),
                                                    });
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
            }
            else {
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
});
const updateUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let status = true;
    if (Number(req.params.status) == 0) {
        status = false;
    }
    let authId = res.locals.jwt.email.split('---')[1];
    let query = `UPDATE users SET status = ${status} WHERE id = '${authId}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((result) => {
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    message: "Status updated"
                });
            }
            else {
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
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 
    let authId = res.locals.jwt.email.split('---')[1];
    (0, upateUser_1.updateUserData)('status', false, authId);
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
});
const getAllusers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let auth_user_id = res.locals.jwt.email.split('---')[1];
    // let query = 'SELECT id, name, email FROM users';
    let query = `SELECT id, name, email FROM users as u WHERE (u.id != '${auth_user_id}' AND status ='${1}') AND NOT EXISTS ( SELECT *
        FROM blocked as b WHERE b.blocker_user_id = u.id AND b.blocked_user_id = '${auth_user_id}')`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
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
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
});
const getBlockedUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let auth_user_id = res.locals.jwt.email.split('---')[1];
    // let query = 'SELECT id, name, email FROM users';
    let query = `SELECT blocked_user_id, blocker_user_id FROM blocked WHERE blocker_user_id = '${auth_user_id}'`;
    (0, mysql_1.Connect)()
        .then((connection) => {
        (0, mysql_1.Query)(connection, query)
            .then((users) => {
            return res.status(200).json({
                users: lodash_1.default.map(users, (el) => el.blocked_user_id),
                count: users.length
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
exports.default = { getBlockedUsers, register, getAllusers, blockUser, login, updateUserStatus, logout };
