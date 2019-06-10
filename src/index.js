import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Store.js';
import './css/public.css';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
