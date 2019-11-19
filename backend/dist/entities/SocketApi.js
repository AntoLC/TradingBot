"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Socket = require('socket.io');
class SocketIO {
    constructor() {
        this.socketIOObserver = [];
        this.IO = Socket();
        this.IO.on('connection', (socket) => {
            console.log('SocketIO Connected');
            socket.on('subscribe', function (room) {
                console.log('joining room', room);
                socket.join(room);
            });
            socket.on('unsubscribe', function (room) {
                console.log('leaving room', room);
                socket.leave(room);
            });
            socket.on('request', (data) => {
                console.log(data.uid + ' just connected!');
                this.socketIOObserver.forEach((observer) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const responseObserver = yield observer.requestClientIO(data.arg);
                    socket.emit(data.uid, { msg: responseObserver });
                }));
            });
            this.IO.on("disconnect", () => console.log("Client disconnected"));
        });
    }
    registerBinanceObserver(observer) {
        this.socketIOObserver.push(observer);
    }
    getIO() {
        return this.IO;
    }
    flux_data(symbol, interval, data) {
        this.IO.sockets.in(symbol + '-' + interval).emit('BinanceIO', { msg: data });
    }
}
exports.SocketIO = SocketIO;
