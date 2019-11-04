import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MenuLeft from './components/MenuLeft/MenuLeft.component';
import Chartpage from './page/ChartPage/ChartPage.component';
import TradePage from './page/TradePage/TradePage.component';
import './App.scss';

class App extends React.Component{
  state = {
    appDisplay : 'fullscreen'
  };

  /*<Route exact path='/sign/' render={() => 
    this.props.currentUser 
      ? (<Redirect to='/' />) 
      : (<Sign />) 
  }/>*/
  changeDisplay = () => {
      (this.state.appDisplay === '')
          ? this.setState({appDisplay: 'fullscreen'})
          : this.setState({appDisplay: ''});
  }

  render(){
    const {appDisplay} = this.state;
    return(
      <div className={`${appDisplay} App`}>
        <MenuLeft changeDisplay={this.changeDisplay}/>
        <div className="pages">
          <Switch>
            <Route exact path='/' component={Chartpage}/>
            <Route exact path='/trade' component={TradePage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
