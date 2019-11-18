import React, {useState, useEffect} from 'react';
import './DropDownChart.style.scss';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";


const DropDownChart = ({setParentData, list_data, dataParent}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownData, setDropdownData] = useState(dataParent);
    
    const dropdownItemsData = list_data.map((_data) =>
        <DropdownItem 
            tag="a" 
            key={_data}
            className={(dropdownData === _data ? "current" : "")}
            onClick={() => {
                setParentData(_data);
                setDropdownData(_data);
            }}
        >
            {_data}
        </DropdownItem>
    );

    return (
        <Dropdown  
            nav
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
        >
            <DropdownToggle caret nav className="block-change-data">
                <i className="fas fa-chart-bar chart-icon"></i>{dropdownData}
            </DropdownToggle>
            <DropdownMenu right>{dropdownItemsData}</DropdownMenu>
        </Dropdown>
    );
};

export default DropDownChart;