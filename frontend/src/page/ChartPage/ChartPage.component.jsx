import React from 'react';
import './ChartPage.style.scss';

// Chart
import ContainerChart from "../../components/ContainerChart/ContainerChart.component";
import {
	dashboardPanelChart,
	dashboardShippedProductsChart,
	dashboardAllProductsChart,
	dashboard24HoursPerformanceChart
} from "./chart_data"; 

const ChartPage = () => {
	return (
		<>
			<ContainerChart size="lg" symbolParent="BTCUSDT" intervalParent="1m" type_chart={dashboardPanelChart}/>
			<div className="container-charts">
				<ContainerChart size="sm" symbolParent="BTCUSDT" intervalParent="15m" type_chart={dashboardShippedProductsChart}/>
				<ContainerChart size="sm" symbolParent="BTCUSDT" intervalParent="30m" type_chart={dashboardAllProductsChart}/>
				<ContainerChart size="sm" symbolParent="BTCUSDT" intervalParent="1h" type_chart={dashboard24HoursPerformanceChart}/>
			</div>
		</>
	);
}
	
export default ChartPage;