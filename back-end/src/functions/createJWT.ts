import jwt from 'jsonwebtoken';
import config from '../config/config';
// import logger from '../config/logger';
import UserInterface from '../interfaces/user';

const NAMESPACE = 'Auth';

const createJWT = (user: UserInterface, callback: (error: Error | null, token: string | null) => void) => {
    var timeSinEpoch = new Date().getTime();
    var expirationTime = timeSinEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    try {
        jwt.sign({
            email: user.email+'---'+user.id
        },
        config.server.token.secret,
        {
            issuer: config.server.token.issuer,
            algorithm: 'RS256',
            expiresIn: expirationTimeInSeconds
        },
        (error, token) => {
            if (error) {
                callback(error, null);
            } else if(token) {
                callback(null, token);
                // callback(null, token? token : '');
            } else {
                // callback(null, token!);
                callback(null, token? token : null);
            }
        });
    } catch (error) {
        // callback(error, null)
    }
};

export default createJWT;