import { IBinanceObserver } from './BinanceAPI';

export class SocketIO implements IBinanceObserver{
    private IO: any | null;
    
    constructor(){
        this.IO = require('socket.io')();
        this.IO.on('connection', () => {
            console.log('A user connected');
            this.IO.sockets.emit('Trhello', {msg: 'Connected'});

            this.IO.on("disconnect", () => console.log("Client disconnected"));
        });
    } 

    get_IO(){
        return this.IO;
    }

    flux_data(data: string){
        console.log("flux_data", data)
        this.IO.sockets.emit('Trhello', {msg: data});
    }
}