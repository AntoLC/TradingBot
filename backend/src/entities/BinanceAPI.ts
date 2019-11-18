import { ISocketIOObserver } from './SocketApi';

export interface IBinanceObserver {
    flux_data(symbol: string, interval: string, data: string): void;
}

export class BinanceAPI implements ISocketIOObserver{
    private binanceObserver:Array<IBinanceObserver>;
    private binanceAPI : any | null;
    private symbolOrigin : string = "BTCUSDT";
    private methodAllowed = {
        CANDLESTICK: "CANDLESTICK"
    };
    private listSymbol: string[] = [
        "BTCUSDT",
        "LINKUSDT",
        "VETUSDT",
        "ETHUSDT"
    ];
    private listInterval: string[] = ['1m', '3m', '5m', '15m', '30m', '1h'];
    //private listInterval: string[] = ['1m', '3m' ];
    //   [ 'btcusdt@kline_1m', 'btcusdt@kline_3m' ],
    //   [ 'linkusdt@kline_1m', 'linkusdt@kline_3m' ],
    //   [ 'vetusdt@kline_1m', 'vetusdt@kline_3m' ],
    //   [ 'ethusdt@kline_1m', 'ethusdt@kline_3m' ] ]
    constructor(){
        this.binanceObserver = [];
        this.binanceAPI = this.connect();
    }

    connect():any{
        return require('node-binance-api')().options({
            APIKEY: process.env.APIKEY,
            APISECRET: process.env.APISECRET,
            useServerTime: true // If you get timestamp errors, synchronize to server time at startup
        });
    }

    async requestClientIO(data: any): Promise<string>{
        switch (data.type) {
            case this.methodAllowed.CANDLESTICK:
                return (data.symbol && data.interval) 
                    ? await this.lastCandlesticks(data.symbol, data.interval)
                    : JSON.stringify([]);
                break;
            default:
                return JSON.stringify([]);;
                break;
        }
    }

    /*
        Each symbol and interval are array of object
        [{"BTCUSDT":
          [{"30m":[{"timestamp":1573983000000,"close":"8536.33000000"}]},
           {"10m":[{"timestamp":1573983000000,"close":"8536.33000000"}]},
        ]}]
    */
    lastCandlesticks(symbol: string, interval: string): Promise<string>{
        return new Promise(resolve => {
            this.binanceAPI.candlesticks(symbol, interval, (error: any, ticks: any[], symbol: string) => {
                //console.log("candlesticks: "+ticks);
                //let [time, open, high, low, close, volume, closeTime, assetVolume, 
                    //    trades, buyBaseVolume, buyAssetVolume, ignored] = value;
                
                resolve(this.jsonFormat(ticks, symbol, interval));
            }, {limit: 50});
        });
        // endTime: 1573707600000 // Actually it is like a start time
    }

    registerBinanceObserver(observer: IBinanceObserver){
        this.binanceObserver.push(observer);
    }

    startListener():void{
        if (this.binanceAPI === null) return;
        
        this.binanceAPI.websockets.candlesticks(this.listSymbol, this.listInterval, (candlesticks: any) => {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { t:timestamp, o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            //console.log(symbol+" "+interval+" candlestick update");
            if(isFinal){
                let array_data:any = [];
                array_data[0] = timestamp;
                array_data[4] = close;

                this.send_data(symbol, interval, this.jsonFormat([array_data], symbol, interval));
            }
          });
    }

    jsonFormat(data: any[], symbol: string, interval: string):string
    {
        const formated_data:any[] = [];

        if(Array.isArray(data))
        {
            const array_data:any[] = [];
            const array_interval:any[] = [];
            const object_interval:any = {};
            const object_symbol:any = {};
            
            //formated_data.push(symbol);
            //formated_data[0].push(interval);
            console.debug(symbol);
            console.debug(interval);
            data.forEach(element => {
                array_data.push({
                    timestamp: element[0],
                    close: element[4]
                });
            });

            
            object_interval[interval] = array_data;
            array_interval.push(object_interval);
            
            object_symbol[symbol] = array_interval;
            formated_data.push(object_symbol);
        }

        console.debug(JSON.stringify(formated_data));

        return JSON.stringify(formated_data);
    }

    send_data(symbol: string, interval: string, data: string){
        this.binanceObserver.forEach(observer => {
            observer.flux_data(symbol, interval, data);
        });
    }

    // List all endpoints
    listEndpoints(){
        let endpoints = this.binanceAPI.websockets.subscriptions();
        for ( let endpoint in endpoints ) {
            console.log(endpoint);
            //binance.websockets.terminate(endpoint);
        }
    }
}