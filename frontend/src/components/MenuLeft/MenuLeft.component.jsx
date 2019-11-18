import React, {useEffect, useState} from 'react';
import './MenuLeft.scss';
import Logo from './logo.svg';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleMenuLeft} from '../../redux/class/class.action';

const MenuLeft = ({toggleMenuLeft}) => {
  const links = [
    {id: 1, path: '/', name: 'Dashboard', class: 'fas fa-chart-line'},
    {id: 2, path: '/trade', name: 'Trade', class: 'far fa-edit'},
  ];
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setTimeout(()=>(toggleMenuLeft()), 700);
  },[]);
  
  return(
    <div className='menu-left-container'>
      <div className="menu-left-header">
        <img src={Logo}/>
        <span className="title">inance Bot</span>
      </div>
      <div className="nav-block">
      {
        links.map((link)=>(
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
      <div className="hide-show-menu" onClick={()=>{setIsActive(!isActive);toggleMenuLeft()}}>
        <div className={"hamburger hamburger--spring js-hamburger " + ((isActive) ? "is-active": "")}>
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
    
const mapDispatchToProps = dispatch => ({
  toggleMenuLeft: () => dispatch(toggleMenuLeft())
});
export default connect(null, mapDispatchToProps)(MenuLeft);