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

            socket.on('subscribe', function(room: string) { 
                console.log('joining room', room);
                socket.join(room); 
            })

            socket.on('unsubscribe', function(room: string) {  
                console.log('leaving room', room);
                socket.leave(room); 
            })

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

    getIO(){
        return this.IO;
    }

    flux_data(symbol: string, interval: string, data: string){
        //console.log("flux_data: "+symbol, data);
        //this.IO.sockets.emit('BinanceIO', {msg: data});
        //this.IO.sockets.emit('BinanceIO-'+symbol+'-'+interval, {msg: data});
        this.IO.sockets.in(symbol+'-'+interval).emit('BinanceIO', { msg: data })
    }
}