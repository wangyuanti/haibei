import {createStore,combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import loginReducer from './containers/login/reducer.js';

const reducer = combineReducers({
    userInfo: loginReducer,
});
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};
const persistReducerNew = persistReducer(persistConfig, reducer);
export const store = createStore(persistReducerNew);
export const persistor = persistStore(store);

// export default createStore(reducer, {});