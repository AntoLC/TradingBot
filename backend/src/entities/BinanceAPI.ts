import { ISocketIOObserver } from './SocketApi';

export interface IBinanceObserver {
    flux_data(data: string): void;
}

export class BinanceAPI implements ISocketIOObserver{
    private binanceObserver:Array<IBinanceObserver>;
    private binanceAPI : any | null;
    private symbolOrigin : string = "BTCUSDT";
    private methodAllowed = {
        CANDLESTICK: "CANDLESTICK"
    };

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
                return (data.symbol) 
                    ? await this.lastCandlesticks(data.symbol)
                    : JSON.stringify([]);
                break;
            default:
                return JSON.stringify([]);;
                break;
        }
    }

    lastCandlesticks(symbol: string): Promise<string>{
        return new Promise(resolve => {
            this.binanceAPI.candlesticks(symbol, "1m", (error: any, ticks: any[], symbol: string) => {
                //console.log("candlesticks: "+ticks);
                //let [time, open, high, low, close, volume, closeTime, assetVolume, 
                    //    trades, buyBaseVolume, buyAssetVolume, ignored] = value;
                
                const formated_data:any[] = [];
                if(ticks)
                {
                    ticks.forEach(element => {
                        formated_data.push({
                            timestamp: element[0],
                            close: element[4]
                        });
                    });
                }

                resolve(JSON.stringify(formated_data));
            }, {limit: 5});
        });
        // endTime: 1573707600000 // Actually it is like a start time
    }

    registerBinanceObserver(observer: IBinanceObserver){
        this.binanceObserver.push(observer);
    }

    startListener():void{
        /*this.binanceAPI.prices('BNBBTC', (error, ticker) => {
            console.log("Price of BNB: ", ticker.BNBBTC);
            this.send_data(ticker.BNBBTC);
        });*/
        if (this.binanceAPI === null) return;
        
        this.binanceAPI.websockets.candlesticks([this.symbolOrigin], "1m", (candlesticks: any) => {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { t:timestamp, o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            /*console.log(symbol+" "+interval+" candlestick update");
            console.log("open: "+open);
            console.log("high: "+high);
            console.log("low: "+low);
            console.log("close: "+close);
            console.log("volume: "+volume);
            console.log("isFinal: "+isFinal);*/
            if(isFinal){
                const formated_data = [{
                    timestamp: timestamp,
                    close: close
                }];

                this.send_data(JSON.stringify(formated_data));
            }
          });

        /*setInterval(() => {
            this.binanceAPI.candlesticks("KAVAUSDT", "1m", (error, ticks, symbol) => {
                //console.log("candlesticks()", ticks);
                //let last_tick = ticks[ticks.length - 1];
                //let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
                //console.log(symbol+" last close: "+close);
    
                this.send_data(ticks);
            }, {limit: 1});
        }, 3000);*/
        /*binance.candlesticks("BNBBTC", "1m", (error, ticks, symbol) => {
            //console.log("candlesticks()", ticks);
            let last_tick = ticks[ticks.length - 1];
            let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
            //console.log(symbol+" last close: "+close);

            this.send_data(ticks);
        }, {limit: 1, endTime: 1514764800000});*/
    }

    send_data(data: string){
        this.binanceObserver.forEach(observer => {
            observer.flux_data(data);
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

  // binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
  //   let tick = binance.last(chart);
  //   const last = chart[tick].close;
  //   console.log(chart);
  //   // Optionally convert 'chart' object to array:
  //   // let ohlc = binance.ohlc(chart);
  //   // console.log(symbol, ohlc);
  //   console.log(symbol+" last price: "+last)
  // });