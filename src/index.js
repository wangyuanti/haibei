import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store, persistor} from './Store';
import './css/public.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { PersistGate } from 'redux-persist/lib/integration/react';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </LocaleProvider>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
