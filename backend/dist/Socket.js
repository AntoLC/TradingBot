"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _server_1 = tslib_1.__importDefault(require("@server"));
const _entities_1 = require("@entities");
const _entities_2 = require("@entities");
const http_1 = tslib_1.__importDefault(require("http"));
const _shared_1 = require("@shared");
const port = Number(process.env.PORT || 3000);
let server = http_1.default.createServer(_server_1.default);
exports.SocketInit = () => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    const socketIO = new _entities_2.SocketIO();
    socketIO.getIO().attach(server);
    const binanceAPI = new _entities_1.BinanceAPI();
    socketIO.registerBinanceObserver(binanceAPI);
    binanceAPI.registerBinanceObserver(socketIO);
    binanceAPI.startListener();
};
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    if (addr === null)
        return;
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    _shared_1.logger.info('Express server started on port: ' + bind);
}
