import app from '@server';
import { BinanceAPI } from '@entities';
import { SocketIO } from '@entities';
import http from 'http';
import { logger } from '@shared';


//const port = Number(process.env.PORT || 3000);
const port = Number(3012);
let server = http.createServer(app);

export const SocketInit = () => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    
    const socketIO = new SocketIO();
    socketIO.getIO().attach(server);
    
    const binanceAPI = new BinanceAPI();
    socketIO.registerBinanceObserver(binanceAPI);
    binanceAPI.registerBinanceObserver(socketIO);
    binanceAPI.startListener();
}

/**
* Event listener for HTTP server "error" event.
*/
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
    // handle specific listen errors with friendly messages
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

/**
* Event listener for HTTP server "listening" event.
*/
function onListening() {
    var addr = server.address();
    if(addr === null ) return;
    
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    
    logger.info('Express server started on port: ' + bind);
}  