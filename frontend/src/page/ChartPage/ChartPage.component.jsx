import React from 'react';
import socketIOClient from "socket.io-client";
import { Line, Bar } from "react-chartjs-2";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import {
    dashboardPanelChart,
    dashboardShippedProductsChart,
    dashboardAllProductsChart,
    dashboard24HoursPerformanceChart
  } from "./chart_data";
import './ChartPage.scss';

class ChartPage extends React.Component {
    state = {
      response_socket: false,
      endpoint: "localhost:3012/",
      dashboardPanelChart: dashboardPanelChart
    }
  
    componentDidMount(){
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on('Trhello', data => this.set_data_server(data));
    }

    set_data_server(data){
        // 1572035700
        //
        this.setState({ response_socket: data.msg });
        const { response_socket } = this.state;
        console.debug(response_socket);
    
        if(response_socket.t && response_socket.c){
          const time = response_socket.t;
          const close = response_socket.c;
          
          const date = new Date(time);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
          const seconds = "0" + date.getSeconds();
          const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
          console.debug("time", time);
          dashboardPanelChart.update_data(close);
          dashboardPanelChart.update_label(formattedTime);
    
          console.debug("get_data", dashboardPanelChart.get_data());
    
          this.setState({ dashboardPanelChart: dashboardPanelChart });
        }
    
        if(Array.isArray(response_socket)){
          const last_tick = response_socket[0];
          let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
          
          const date = new Date(time);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
          const seconds = "0" + date.getSeconds();
          const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
          console.debug("close", close);
          console.debug("time", time);
          dashboardPanelChart.update_data(close);
          dashboardPanelChart.update_label(formattedTime);
    
          console.debug("get_data", dashboardPanelChart.get_data());
    
          this.setState({ dashboardPanelChart: dashboardPanelChart });
        }
      }

    render() {
        return (
            <>
            <PanelHeader
                size="lg"
                content={
                    <Line
                    data={this.state.dashboardPanelChart.data}
                    options={dashboardPanelChart.options}
                    />
                }
                />
            </>
        );
    }
}


export default ChartPage;