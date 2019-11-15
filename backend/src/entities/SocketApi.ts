import { IBinanceObserver } from './BinanceAPI';
const Socket = require('socket.io')

export interface ISocketIOObserver {
    requestClientIO(data: {}): Promise<string>;
}

export class SocketIO implements IBinanceObserver{
    private socketIOObserver:Array<ISocketIOObserver>;
    private IO: any | null;
    
    constructor(){
        this.socketIOObserver = [];
        this.IO = Socket();
        this.IO.on('connection', (socket: any) => {
            console.log('SocketIO Connected');

            socket.on('request' , (data: {uid:string, arg:any}) => {
                console.log(data.uid + ' just connected!');
                //console.log("data emit by "+data.uid, data.arg);

                this.socketIOObserver.forEach(async observer => {
                    const responseObserver = await observer.requestClientIO(data.arg);
                    socket.emit(data.uid, {msg: responseObserver});
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