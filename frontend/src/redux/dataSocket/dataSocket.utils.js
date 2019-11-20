import * as cloneDeep from 'lodash/cloneDeep';

export const cleaningDataSymbol = (data_socket, new_data_socket, reset_chart) => {
    //console.debug("cleaning:Data", data_socket);
    //console.debug("cleaning:NewData", new_data_socket);
    
    JSON.parse(new_data_socket).forEach(elementSymbol => {
        //console.debug("cleaning:elementSymbol", elementSymbol);
        const symbol = Object.keys(elementSymbol);
        
        elementSymbol[symbol].forEach(elementInterval => {
            const interval = Object.keys(elementInterval);
            //console.debug("cleaning:elementInterval", elementInterval);
            // Delete the oldest value
            data_socket[symbol][interval].close = slice_data(data_socket[symbol][interval].close);
            data_socket[symbol][interval].formattedTime = slice_data(data_socket[symbol][interval].formattedTime);
    
            if(reset_chart){
                data_socket[symbol][interval].close = [];
                data_socket[symbol][interval].formattedTime = [];
            }
            elementInterval[interval].forEach(element => {
                //console.log('cleaning:Element', reset_chart);
                // Merge With old Data
                data_socket[symbol][interval].close = [...data_socket[symbol][interval].close, element.close];
                data_socket[symbol][interval].formattedTime = [...data_socket[symbol][interval].formattedTime, get_formated_time(element.timestamp)];
                
            });
        });
    });

    if(process.env.NODE_ENV === "development"){
        console.log('cleaning:FinalElement', data_socket);
    }

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
    //const seconds = "0" + date.getSeconds();

    return dayMonth+" "+hours + ':' + minutes.substr(-2);
}