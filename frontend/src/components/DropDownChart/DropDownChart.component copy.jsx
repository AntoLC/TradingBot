import React, {useState, useEffect} from 'react';
import './DropDownSymbol.style.scss';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {changeSymbolChartTop} from '../../redux/dataSocket/dataSocket.action';
import {connect} from 'react-redux';


const DropDownSymbol = ({changeSymbol, setParentSymbol}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [symbol, setSymbol] = useState('BTCUSDT');
    const symbols = ['BTCUSDT', 'LINKUSDT', 'VETUSDT', 'ETHUSDT'];
    const dropdownItemsSymbol = symbols.map((_symbol) =>
        <DropdownItem 
            tag="a" 
            key={_symbol}
            className={(symbol === _symbol ? "current" : "")}
            onClick={() => {setSymbol(_symbol);changeSymbol(_symbol)}}
        >
            {_symbol}
        </DropdownItem>
    );

    useEffect(() => {
        setParentSymbol(symbol);
    },[symbol]);

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

const mapDispatchToProps = dispatch => ({
    changeSymbol: (symbol) => dispatch(changeSymbolChartTop(symbol))
});
export default connect(null, mapDispatchToProps)(DropDownSymbol);