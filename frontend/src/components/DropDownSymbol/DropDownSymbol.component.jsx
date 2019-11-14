import React, {useState} from 'react';
import './DropDownSymbol.style.scss';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const DropDownSymbol = () => {
    const [dropdownOpen, setDropdownOpen] = useState(true);
    const [symbol, setSymbol] = useState('BTCUSDT');
    const symbols = ['BTCUSDT', 'LINKUSDT', 'VETUSDT', 'ETHUSDT'];
    const dropdownItemsSymbol = symbols.map((_symbol) =>
        <DropdownItem 
            tag="a" 
            key={_symbol}
            className={(symbol === _symbol ? "current" : "")}
            onClick={() => setSymbol(_symbol)}
        >
            {_symbol}
        </DropdownItem>
    );

    return (
        <Dropdown  
            nav
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
        >
            <DropdownToggle caret nav className="block-change-symbol">
                <i className="fas fa-chart-bar chart-icon"></i>{symbol}
            </DropdownToggle>
            <DropdownMenu right>{dropdownItemsSymbol}</DropdownMenu>
        </Dropdown>
    );
};

export default DropDownSymbol;