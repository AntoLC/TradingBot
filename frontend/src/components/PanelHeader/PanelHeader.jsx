import React, {useState} from "react";
import DropDownSymbol from '../DropDownSymbol/DropDownSymbol.component';

const PanelHeader = ({size, content}) => {
  return (
    <div className={ "panel-header " + (size !== undefined ? "panel-header-" + size : "")}> 
      <DropDownSymbol/>
      {content}
    </div>
  );
}

export default PanelHeader;
