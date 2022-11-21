import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logger from './config/logger';
import config from './config/config';
import messageRoutes from './routes/message';
import userRoutes from './routes/user';
import socketRoutes from './routes/socket';
import testRoutes from './routes/test';

import { Server, Socket } from "socket.io";
import cors from 'cors';


const NAMESPACE = 'Server';
const router = express();

router.use(cors());

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/test', testRoutes);
router.use('/api/message', messageRoutes);
router.use('/api/user', userRoutes);
router.use('/api/socket', socketRoutes);

/** Error handling */
router.use((req, res, next) => {
    // return res;
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3003", "http://localhost:3000", "https://emychatclient.herokuapp.com", "https://emychatserver.herokuapp.com"],
        methods: ["GET", "POST"]
    }
});
  
io.on("connection", (socket: Socket) => {
    // logger.info(NAMESPACE, `socket id: ${socket.id}`, socket);
    // logger.info(NAMESPACE, `socket id: ${socket.id}`);

    socket.on('disconnect', () => {
        socket.broadcast.emit("update", "disconnection");
    });

    socket.on("user", data => {
        socket.broadcast.emit("update", data);
    })

    socket.on("message", data => {
        socket.broadcast.emit("update", data);
    })

    socket.on("block", data => {
        socket.broadcast.emit("update", data);
    })
});
// router.set('io', io);


httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
