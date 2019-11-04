import React from 'react';
import './MenuLeft.scss';
import Logo from './logo.svg';
import  { NavLink } from 'react-router-dom';

class MenuLeft extends React.Component{
    links = [
        {id: 1, path: '/', name: 'Dashboard', class: 'fas fa-chart-line'},
        {id: 2, path: '/trade', name: 'Trade', class: 'far fa-edit'},
    ];

    componentDidMount(){
        const {changeDisplay}= this.props;
        setTimeout(()=>(changeDisplay()), 700);
    }

    render(){
        const {changeDisplay}= this.props;
        return(
            <div className='menu-left-container'>
                <div className="menu-left-header">
                    <img src={Logo}/>
                    <span className="title">inance Bot</span>
                </div>
                <div className="nav-block">
                {
                    this.links.map((link)=>(
                        <NavLink 
                            exact
                            key={link.id} 
                            to={link.path} 
                            className='menu-left-link'
                            activeClassName="selected-link">
                            <i className={`${link.class} menu-icon`}></i>
                            {link.name}
                        </NavLink>
                    ))
                }
                </div>
                <div className="hide-show-menu" onClick={()=>changeDisplay()}>
                    <i className="fas fa-sign-in-alt"></i>
                </div>
            </div>
        );
    }
}

export default MenuLeft;