import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Store.js';
import './css/public.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
