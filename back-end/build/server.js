"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./config/logger"));
const config_1 = __importDefault(require("./config/config"));
const message_1 = __importDefault(require("./routes/message"));
// import userRoutes from './routes/user';
// import socketRoutes from './routes/socket';
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const NAMESPACE = 'Server';
const router = (0, express_1.default)();
router.use((0, cors_1.default)());
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logger_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logger_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
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
router.use('/test', message_1.default);
// router.use('/api/message', messageRoutes);
// router.use('/api/user', userRoutes);
// router.use('/api/socket', socketRoutes);
/** Error handling */
router.use((req, res, next) => {
    // return res;
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(router);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:3003", "http://localhost:3000", "https://emychatclient.herokuapp.com", "https://emychatbackend.herokuapp.com"],
        methods: ["GET", "POST"]
    }
});
// io.on("connection", (socket: Socket) => {
//     // logger.info(NAMESPACE, `socket id: ${socket.id}`, socket);
//     // logger.info(NAMESPACE, `socket id: ${socket.id}`);
//     console.log('connection started');
//     socket.on('disconnect', () => {
//         socket.broadcast.emit("update", "disconnection");
//     });
//     socket.on("user", data => {
//         console.log("########  user  ##########");
//         console.log(data);
//         socket.broadcast.emit("update", data);
//         console.log("###------------###");
//     })
//     socket.on("message", data => {
//         console.log("########  message  ##########");
//         console.log(data);
//         socket.broadcast.emit("update", data);
//         console.log("###------------###");
//     })
//     socket.on("block", data => {
//         console.log("########  block  ##########");
//         console.log(data);
//         socket.broadcast.emit("update", data);
//         console.log("###------------###");
//     })
// });
// router.set('io', io);
httpServer.listen(config_1.default.server.port, () => logger_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
