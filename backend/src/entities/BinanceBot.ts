import { IBinanceObserver } from './BinanceAPI';

export class BinanceBot implements IBinanceObserver{
    private has_bought:boolean = false;

    flux_data(symbol: string, interval: string, data: string){
        console.log("BOT Listening1: "+symbol, data);

        console.log("BOT Listening2: "+symbol, typeof data);
        console.log("BOT Listening3: "+symbol, Object.values(data[0]));
        
        //const Object.keys(data[0]);
        if(symbol == "BTCUSDT")
            "";
    }
}