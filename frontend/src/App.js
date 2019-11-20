import React, {useEffect, useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import MenuLeft from './components/MenuLeft/MenuLeft.component';
import CursorFollow from './components/CursorFollow/CursorFollow.component';
import Chartpage from './page/ChartPage/ChartPage.component';
import TradePage from './page/TradePage/TradePage.component';
import './App.scss';

// REDUX
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClassMenuLeft } from './redux/class/class.selector';
import { setNewUser } from './redux/user/user.action';
import { connectionSocket } from './redux/dataSocket/dataSocket.action';


const App = ({classMenuLeft, setNewUser, connectionSocket}) => {
  const [menuLeft, setMenuLeft] = useState('fullscreen');
  const [pageSmooth, setPageSmooth] = useState('');

  /**
   *  When Mounted
   */
  useEffect(() => {
    setNewUser();
    connectionSocket();
    
    /*
    *  The css property calc() slow down the animation
    *  So we listen when the animation is done to add calc on it
    */
    const el = document.querySelector('.pages');
    el.addEventListener('transitionend', () => {
      let AppID = document.getElementById('App');
      setPageSmooth(AppID.className.includes("fullscreen") ? '' : 'smooth');
    });
  }, [setNewUser, connectionSocket]);

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
          <Route path='trade' component={TradePage}/>
          <Route path='' component={Chartpage}/>
        </Switch>
      </div>
      <CursorFollow/>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  classMenuLeft: selectClassMenuLeft,
});
const mapDispatchToProps = dispatch => ({
  setNewUser: () => dispatch(setNewUser()),
  connectionSocket: () => dispatch(connectionSocket())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
