class BinanceInterfaceObserver {
    constructor() {
        if(!this.flux_data) {
            throw new Error("Must implement function flux_data()");
        }
    }
}

module.exports = BinanceInterfaceObserver;