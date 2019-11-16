import React, {useState} from "react";
import DropDownSymbol from '../DropDownSymbol/DropDownSymbol.component';
import "./ContainerChart.style.scss";

const ContainerChart = ({size, children, title}) => {
  return (
    <div className={"container-chart " + (size ? size : "")}> 
      <DropDownSymbol/>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default ContainerChart;
