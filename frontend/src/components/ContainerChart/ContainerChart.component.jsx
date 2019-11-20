import React, {useEffect, useState} from "react";
import DropDownChart from '../DropDownChart/DropDownChart.component';
import "./ContainerChart.style.scss";
import { Line } from "react-chartjs-2";

// Redux
import {connect} from 'react-redux';
import {selectChart, isSocketReady} from '../../redux/dataSocket/dataSocket.selector';
import {initChart} from '../../redux/dataSocket/dataSocket.action';
import dataSocketConf from '../../redux/dataSocket/dataSocket.conf';
import { createStructuredSelector } from 'reselect';

const ContainerChart = ({size, symbolParent, intervalParent, dataChart, type_chart, initChart, isSocketReady}) => {
  const [symbol, setSymbol] = useState(symbolParent);
  const [interval, setInterval] = useState(intervalParent);
  
  const [dataFormattedTime, setDataFormattedTime] = useState([]);
  const [dataClose, setDataClose] = useState([]);
  
  const symbols = dataSocketConf.LIST_SYMBOL;
  const intervals = dataSocketConf.LIST_INTERVAL;

  useEffect(() => {
    if(isSocketReady)
      initChart(symbol, interval);
    
  },[symbol, interval, isSocketReady, initChart]);

  useEffect(() => {
    try { 
      if(dataChart[symbol][interval]){
        setDataFormattedTime(dataChart[symbol][interval].formattedTime);
        setDataClose(dataChart[symbol][interval].close);
      }  
    } 
    catch(e) { 
      console.log("catchdataChart");
    }
  },[dataChart]);

  return (
    <div className={"container-chart " + (size ? size : "")}>
      <div className="container-dropdownchart">
        <DropDownChart setParentData={setSymbol} list_data={symbols} dataParent={symbolParent}/>
        <DropDownChart setParentData={setInterval} list_data={intervals} dataParent={intervalParent} />
      </div>
      <h3>{symbol} {interval}</h3>
      <Line
        data={type_chart.data(dataFormattedTime, dataClose)}
        options={type_chart.options} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataChart: selectChart,
  isSocketReady: isSocketReady,
});
const mapDispatchToProps = dispatch => ({
  initChart: (symbol, interval) => dispatch(initChart(symbol, interval))
});
export default connect(mapStateToProps, mapDispatchToProps)(ContainerChart);