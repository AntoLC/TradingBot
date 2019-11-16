import React, {useEffect, useState} from 'react';
import './ChartPage.style.scss';

// Chart
import { Line, Bar } from "react-chartjs-2";
import ContainerChart from "../../components/ContainerChart/ContainerChart.component";
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

import {
	Card, 
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Row,
	Col,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Table,
	Button,
	Label,
	FormGroup,
	Input,
	UncontrolledTooltip
  } from "reactstrap";

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
			<ContainerChart size="lg" title="Chart Minutes">
				<Line
					data={dashboardPanelChart.data(dataChartTop.formattedTime, dataChartTop.close)}
					options={dashboardPanelChart.options} />
			</ContainerChart>
			<div className="containerCharts">
				<ContainerChart size="sm" title="Chart 10mn">
					<Line
						data={dashboardShippedProductsChart.data(dataChartTop.formattedTime, dataChartTop.close)}
						options={dashboardShippedProductsChart.options} />
				</ContainerChart>
				<ContainerChart size="sm" title="Chart 30mn">
					<Line
						data={dashboardAllProductsChart.data(dataChartTop.formattedTime, dataChartTop.close)}
						options={dashboardAllProductsChart.options} />
				</ContainerChart>
				<ContainerChart size="sm" title="Chart 1h">
					<Line
						data={dashboard24HoursPerformanceChart.data(dataChartTop.formattedTime, dataChartTop.close)}
						options={dashboard24HoursPerformanceChart.options} />
				</ContainerChart>
			</div>
		</>
	);
}
	
const mapStateToProps = createStructuredSelector({
	dataChartTop: selectChartTop,
});
export default connect(mapStateToProps)(ChartPage);