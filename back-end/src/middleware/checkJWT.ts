import { NextFunction, Request, Response } from 'express';
// import logger from '../config/logger';
import Jwt, { decode } from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE = 'Auth';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        Jwt.verify(token, config.server.token.secret, {algorithms: ['RS256']}, (error: any, decoded: any) => {
        // Jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

};

export default checkToken;