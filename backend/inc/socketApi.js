var BinanceInterfaceObserver = require('./interface/binanceInterfaceObserver');
/*
io.on('connection', function(socket){
    console.log('A user connected');
    io.sockets.emit('Trhello', {msg: 'Connected'});
});

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}


*/
class SocketIO extends BinanceInterfaceObserver{
    constructor(){
        super();
        this.IO = require('socket.io')();
        this.IO.on('connection', (socket) => {
            console.log('A user connected');
            this.IO.sockets.emit('Trhello', {msg: 'Connected'});

            this.IO.on("disconnect", () => console.log("Client disconnected"));
        });
    }

    get_IO(){
        return this.IO;
    }

    flux_data(data){
        console.log("flux_data", data)
        this.IO.sockets.emit('Trhello', {msg: data});
    }
}

module.exports = SocketIO;