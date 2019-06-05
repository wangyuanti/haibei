import React , { Component } from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import asyncComponent from '@/component/AsyncComponent.js';
const AsyncLogin = asyncComponent(() => import('@/containers/login'));
const AsyncAdmin = asyncComponent(() => import('@/containers/admin'));
class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin/login"  component={AsyncLogin} />
                    <Route path="/login" component={AsyncLogin} />
                    <Route path="/admin" component={AsyncAdmin} />
                    <Redirect path="/" to={{pathname: '/login'}} />
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}


export default App;
