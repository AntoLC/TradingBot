const dataSocketConf = {
    ENDPOINT: "localhost:3012/",
    ROOM: "BinanceIO",
    REQUEST: "request",
    INIT_SYMBOL: "BTCUSDT",
    LIST_SYMBOL: ['BTCUSDT', 'LINKUSDT', 'VETUSDT', 'ETHUSDT'],
    LIST_INTERVAL: ['1m', '3m', '15m', '30m', '1h'],
};
//interval. Allowed value: [1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

export default dataSocketConf;