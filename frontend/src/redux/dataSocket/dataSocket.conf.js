
let endpoint = "https://"+process.env.REACT_APP_SERVER+"/";
if(process.env.NODE_ENV === "development")
    endpoint = "http://localhost:"+process.env.REACT_APP_PORT_SERVER+"/";

const dataSocketConf = {
    ENDPOINT: endpoint,
    ROOM: "BinanceIO",
    REQUEST: "request",
    INIT_SYMBOL: "BTCUSDT",
    LIST_SYMBOL: ['BTCUSDT', 'LINKUSDT', 'VETUSDT', 'ETHUSDT'],
    LIST_INTERVAL: ['1m', '3m', '15m', '30m', '1h'],
};
//interval. Allowed value: [1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

export default dataSocketConf;