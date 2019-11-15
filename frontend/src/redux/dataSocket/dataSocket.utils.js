import * as cloneDeep from 'lodash/cloneDeep';

export const cleaningDataSymbol = (data_socket, new_data_socket) => {
    console.debug("cleaningData_socket", data_socket);

    // Delete the oldest value
    data_socket.close = slice_data(data_socket.close);
    data_socket.formattedTime = slice_data(data_socket.formattedTime);
    
    JSON.parse(new_data_socket).forEach(element => {
        //console.log('cleaningDataSymbol', element);
        // Merge With old Data
        data_socket.close = [...data_socket.close, element.close];
        data_socket.formattedTime = [...data_socket.formattedTime, get_formated_time(element.timestamp)];
        
    });

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