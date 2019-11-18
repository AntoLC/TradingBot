import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import classReducer from './class/class.reducer';
import dataSocketReducer from './dataSocket/dataSocket.reducer';
import userReducer from './user/user.reducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    blacklist: ['dataSocket']
};

const rootReducer = combineReducers({
    class: classReducer,
    dataSocket: dataSocketReducer,
    user: userReducer
});

export default persistReducer(persistConfig, rootReducer);