"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class BinanceAPI {
    constructor() {
        this.symbolOrigin = "BTCUSDT";
        this.methodAllowed = {
            CANDLESTICK: "CANDLESTICK"
        };
        this.listSymbol = [
            "BTCUSDT",
            "LINKUSDT",
            "VETUSDT",
            "ETHUSDT"
        ];
        this.listInterval = ['1m', '3m', '5m', '15m', '30m', '1h'];
        this.binanceObserver = [];
        this.binanceAPI = this.connect();
    }
    connect() {
        return require('../binance-api')().options({
            APIKEY: process.env.APIKEY,
            APISECRET: process.env.APISECRET,
            useServerTime: true
        });
    }
    requestClientIO(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            switch (data.type) {
                case this.methodAllowed.CANDLESTICK:
                    return (data.symbol && data.interval)
                        ? yield this.lastCandlesticks(data.symbol, data.interval)
                        : JSON.stringify([]);
                    break;
                default:
                    return JSON.stringify([]);
                    ;
                    break;
            }
        });
    }
    lastCandlesticks(symbol, interval) {
        return new Promise(resolve => {
            this.binanceAPI.candlesticks(symbol, interval, (error, ticks, symbol) => {
                resolve(this.jsonFormat(ticks, symbol, interval));
            }, { limit: 50 });
        });
    }
    registerBinanceObserver(observer) {
        this.binanceObserver.push(observer);
    }
    startListener() {
        if (this.binanceAPI === null)
            return;
        this.binanceAPI.websockets.candlesticks(this.listSymbol, this.listInterval, (candlesticks) => {
            let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
            let { t: timestamp, o: open, h: high, l: low, c: close, v: volume, n: trades, i: interval, x: isFinal, q: quoteVolume, V: buyVolume, Q: quoteBuyVolume } = ticks;
            if (isFinal) {
                let array_data = [];
                array_data[0] = timestamp;
                array_data[4] = close;
                this.send_data(symbol, interval, this.jsonFormat([array_data], symbol, interval));
            }
        });
    }
    jsonFormat(data, symbol, interval) {
        const formated_data = [];
        if (Array.isArray(data)) {
            const array_data = [];
            const array_interval = [];
            const object_interval = {};
            const object_symbol = {};
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
        return JSON.stringify(formated_data);
    }
    send_data(symbol, interval, data) {
        this.binanceObserver.forEach(observer => {
            observer.flux_data(symbol, interval, data);
        });
    }
    listEndpoints() {
        let endpoints = this.binanceAPI.websockets.subscriptions();
        for (let endpoint in endpoints) {
            console.log(endpoint);
        }
    }
}
exports.BinanceAPI = BinanceAPI;
