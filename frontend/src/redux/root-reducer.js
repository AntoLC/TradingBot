import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import classReducer from './class/class.reducer';
import dataSocketReducer from './dataSocket/dataSocket.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const rootReducer = combineReducers({
    class: classReducer,
    dataSocket: dataSocketReducer
});

export default persistReducer(persistConfig, rootReducer);