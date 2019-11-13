import React, {useEffect, useState} from 'react';
//import ReactDOM from 'react-dom'
import { Route, Switch, Redirect } from 'react-router-dom';
import MenuLeft from './components/MenuLeft/MenuLeft.component';
import Chartpage from './page/ChartPage/ChartPage.component';
import TradePage from './page/TradePage/TradePage.component';
import './App.scss';

// REDUX
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClassMenuLeft } from './redux/class/class.selector';


const App = ({classMenuLeft, connectionSocket}) => {
  const [menuLeft, setMenuLeft] = useState('fullscreen');
  const [pageSmooth, setPageSmooth] = useState('');

  /**
   *  When Mounted
   *  The css property calc() slow down the animation
   *  So we listen when the animation is done to add calc on it
   */
  useEffect(() => {
    const el = document.querySelector('.pages');
    el.addEventListener('transitionend', () => {
      let AppID = document.getElementById('App');
      setPageSmooth(AppID.className.includes("fullscreen") ? '' : 'smooth');
    });
  }, []);

  /**
   *  Add class to hide the menu
   */
  useEffect(() => {
    setMenuLeft(classMenuLeft ? '' : 'fullscreen');
    setPageSmooth('');
  },[classMenuLeft]);

  return(
    <div id="App" className={`${menuLeft} App`}>
      <MenuLeft />
      <div className={`${pageSmooth} pages`}>
        <Switch>
          <Route exact path='/' component={Chartpage}/>
          <Route exact path='/trade' component={TradePage}/>
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  classMenuLeft: selectClassMenuLeft,
});
export default connect(mapStateToProps)(App);
