import React, {useEffect, useState} from 'react';
import './ChartPage.scss';

// Chart
import { Line, Bar } from "react-chartjs-2";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import {
	dashboardPanelChart,
	dashboardShippedProductsChart,
	dashboardAllProductsChart,
	dashboard24HoursPerformanceChart
} from "./chart_data";

// Redux
import {connect} from 'react-redux';
import {selectChartTop} from '../../redux/dataSocket/dataSocket.selector';
import { createStructuredSelector } from 'reselect';

const ChartPage = ({dataChartTop}) => {
	/*useEffect(() => {
		if(Object.entries(dataChartTop).length && dataChartTop.constructor === Object)
			set_data_server();
	},[dataChartTop]);
	
	const set_data_server = () => {
		console.debug("set_data_server_response_socket:", dataChartTop);
		//dashboardPanelChart.update_data(response_socket.close);
		//dashboardPanelChart.update_label(response_socket.formattedTime);
		
		//console.debug("set_data_server:", dashboardPanelChart.get_data());
	}*/
	
	return (
		<>
		<PanelHeader
		size="lg"
		content={
			<Line
			data={dashboardPanelChart.data(dataChartTop.formattedTime, dataChartTop.close)}
			options={dashboardPanelChart.options}
			/>
		}/>
		</>
		);
}
	
const mapStateToProps = createStructuredSelector({
	dataChartTop: selectChartTop,
});
export default connect(mapStateToProps)(ChartPage);