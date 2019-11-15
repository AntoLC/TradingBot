import * as cloneDeep from 'lodash/cloneDeep';

export const cleaningDataSocket = (data_socket, new_data_socket) => {
    console.debug("cleaningData_socket", new_data_socket);
    
    let data_socket_clean = {};
    let time_response = null;
    if(new_data_socket.t && new_data_socket.c){
        time_response = new_data_socket.t;
        data_socket_clean.close = new_data_socket.c;
    }
    else if(Array.isArray(new_data_socket)){
        //const last_tick = new_data_socket[0];
        const last_tick = new_data_socket;
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
        
        time_response = time;
        data_socket_clean.close = close;
    }

    if(time_response)
        data_socket_clean.formattedTime = get_formated_time(time_response);

    // Merge With old Data
    data_socket.close = [...data_socket.close, data_socket_clean.close];
    data_socket.close = slice_data(data_socket.close);

    data_socket.formattedTime = [...data_socket.formattedTime, data_socket_clean.formattedTime];
    data_socket.formattedTime = slice_data(data_socket.formattedTime);
    
    return cloneDeep(data_socket);
}

const slice_data = (data) => {
    if(data.length > 50)
        data = data.slice(1);

    return data;
};

const get_formated_time = (time) => {
    const date = new Date(time);
    const dayMonth = date.getDate()+'-'+date.getMonth();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    return dayMonth+" "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}