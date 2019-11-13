import {all, call} from 'redux-saga/effects';
import {dataSocketSagas} from './dataSocket/dataSocket.sagas';

export default function* rootSaga(){
    yield all([
        call(dataSocketSagas), 
    ]);
}