class BinanceAPI{

    constructor(){
        this.binanceObserver = [];
        this.binanceAPI = this.connect();
    }

    connect(){
        return require('node-binance-api')().options({
            APIKEY: process.env.APIKEY,
            APISECRET: process.env.APISECRET,
            useServerTime: true // If you get timestamp errors, synchronize to server time at startup
        });
    }

    registerBinanceObserver(observer){
        this.binanceObserver.push(observer);
    }

    startListener(){
        /*this.binanceAPI.prices('BNBBTC', (error, ticker) => {
            console.log("Price of BNB: ", ticker.BNBBTC);
            this.send_data(ticker.BNBBTC);
        });*/
        this.binanceAPI.websockets.candlesticks(['KAVAUSDT'], "1m", (candlesticks) => {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            console.log(symbol+" "+interval+" candlestick update");
            console.log("open: "+open);
            console.log("high: "+high);
            console.log("low: "+low);
            console.log("close: "+close);
            console.log("volume: "+volume);
            console.log("isFinal: "+isFinal);
            if(isFinal)
                this.send_data(ticks);
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

    send_data(data){
        this.binanceObserver.forEach(observer => {
            observer.flux_data(data);
        });
    }
}

module.exports = BinanceAPI;

  
  // binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
  //   let tick = binance.last(chart);
  //   const last = chart[tick].close;
  //   console.log(chart);
  //   // Optionally convert 'chart' object to array:
  //   // let ohlc = binance.ohlc(chart);
  //   // console.log(symbol, ohlc);
  //   console.log(symbol+" last price: "+last)
  // });