import { IBinanceObserver } from './BinanceAPI';

export interface ISocketIOObserver {
    connectionIO(): string;
}

export class SocketIO implements IBinanceObserver{
    private socketIOObserver:Array<ISocketIOObserver>;
    private IO: any | null;
    
    constructor(){
        this.socketIOObserver = [];
        this.IO = require('socket.io')();
        this.IO.on('connection', () => {
            console.log('SocketIO Connected');

            this.socketIOObserver.forEach(observer => {
                this.IO.sockets.emit('BinanceIO', {msg: observer.connectionIO()});
            });

            this.IO.on("disconnect", () => console.log("Client disconnected"));
        });
    }

    registerBinanceObserver(observer: ISocketIOObserver){
        this.socketIOObserver.push(observer);
    }

    get_IO(){
        return this.IO;
    }

    flux_data(data: string){
        console.log("flux_data", data)
        this.IO.sockets.emit('BinanceIO', {msg: data});
    }
}