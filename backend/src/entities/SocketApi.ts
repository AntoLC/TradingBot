import { IBinanceObserver } from './BinanceAPI';
const Socket = require('socket.io')

export interface ISocketIOObserver {
    requestClientIO(data: {}): Promise<[]>;
}

export class SocketIO implements IBinanceObserver{
    private socketIOObserver:Array<ISocketIOObserver>;
    private IO: any | null;
    
    constructor(){
        this.socketIOObserver = [];
        this.IO = Socket();
        this.IO.on('connection', (socket: any) => {
            console.log('SocketIO Connected');

            
           

            socket.on('call' , (uid: string, data: []) => {
                //socket.nickname = symbol;
                //console.log(symbol + ' just connected!');
                
                this.socketIOObserver.forEach(async observer => {
                    socket.emit(uid, {msg: await observer.requestClientIO(data)});
                });
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