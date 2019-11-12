import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import classReducer from './class/class.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['class']
};

const rootReducer = combineReducers({
    class: classReducer,
});

export default persistReducer(persistConfig, rootReducer);