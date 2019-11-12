import React from 'react';
import './MenuLeft.scss';
import Logo from './logo.svg';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleMenuLeft} from '../../redux/class/class.action';

class MenuLeft extends React.Component{
  links = [
    {id: 1, path: '/', name: 'Dashboard', class: 'fas fa-chart-line'},
    {id: 2, path: '/trade', name: 'Trade', class: 'far fa-edit'},
  ];
  
  componentDidMount(){
    const {toggleMenuLeft}= this.props;
    setTimeout(()=>(toggleMenuLeft()), 700);
  }
  
  render(){
    const {toggleMenuLeft}= this.props;
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
        <div className="hide-show-menu" onClick={()=>toggleMenuLeft()}>
          <i className="fas fa-sign-in-alt"></i>
        </div>
      </div>
    );
  }
}
    
const mapDispatchToProps = dispatch => {
  return {
    toggleMenuLeft: () => dispatch(toggleMenuLeft())
  }
}
export default connect(null,mapDispatchToProps)(MenuLeft);