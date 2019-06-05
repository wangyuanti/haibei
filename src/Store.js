import {createStore,combineReducers} from 'redux';

import loginReducer from './containers/login/reducer.js';

const reducer = combineReducers({
    userInfo: loginReducer,
});


export default createStore(reducer, {});