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
import {selectResponseSocket} from '../../redux/dataSocket/dataSocket.selector';
import { createStructuredSelector } from 'reselect';

const ChartPage = ({response_socket}) => {
	useEffect(() => {
		if(Object.entries(response_socket).length && response_socket.constructor === Object)
			set_data_server();
	},[response_socket]);
	
	const set_data_server = () => {
		console.debug("set_data_server_response_socket:", response_socket);
		dashboardPanelChart.update_data(response_socket.close);
		dashboardPanelChart.update_label(response_socket.formattedTime);
		
		console.debug("set_data_server:", dashboardPanelChart.get_data());
	}
	
	return (
		<>
		<PanelHeader
		size="lg"
		content={
			<Line
			data={dashboardPanelChart.data}
			options={dashboardPanelChart.options}
			/>
		}/>
		</>
		);
}
	
const mapStateToProps = createStructuredSelector({
	response_socket: selectResponseSocket,
});
export default connect(mapStateToProps)(ChartPage);