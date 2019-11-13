export const cleaningDataSocket = (data_socket) => {
    console.debug("cleaningDataSocket:"+data_socket);
    
    let data_socket_clean = {};
    let time_response = null;
    if(data_socket.t && data_socket.c){
        time_response = data_socket.t;
        data_socket_clean.close = data_socket.c;
    }
    else if(Array.isArray(data_socket)){
        const last_tick = data_socket[0];
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        
        time_response = time;
        data_socket_clean.close = close;
    }

    if(time_response)
        data_socket_clean.formattedTime = get_formated_time(time_response);

    return data_socket_clean;
}

const get_formated_time = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}