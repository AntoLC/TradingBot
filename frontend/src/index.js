import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store , persistor }  from './redux/store';
import { connectionSocket } from './redux/dataSocket/dataSocket.action';

import './index.css';
import App from './App';

// Connect to SocketIO
store.dispatch(connectionSocket());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);