import React , { Component } from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import asyncComponent from '@/component/AsyncComponent.js';
const AsyncLogin = asyncComponent(() => import('@/containers/login'));
const AsyncAdmin = asyncComponent(() => import('@/containers/admin'));
const AsyncUser = asyncComponent(() => import('@/containers/user'));
class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin/login"  component={AsyncLogin} />
                    <Route path="/login" component={AsyncLogin} />
                    <Route path="/admin" component={AsyncAdmin} />
                    <Route path="/" component={AsyncUser} />
                    {/*<Redirect path="/" to={{pathname: '/login'}} />*/}
                    <Redirect from="/*" to='/login' />
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}


export default App;
