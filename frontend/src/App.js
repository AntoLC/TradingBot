import React, {useEffect, useState} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MenuLeft from './components/MenuLeft/MenuLeft.component';
import Chartpage from './page/ChartPage/ChartPage.component';
import TradePage from './page/TradePage/TradePage.component';
import './App.scss';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClassMenuLeft } from './redux/class/class.selector';


const App = ({classMenuLeft}) => {
  const [menuLeft, setMenuLeft] = useState('fullscreen');

  useEffect(() => {
    setMenuLeft(classMenuLeft ? '' : 'fullscreen');
  },[classMenuLeft]);

  return(
    <div className={`${menuLeft} App`}>
      <MenuLeft />
      <div className="pages">
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
