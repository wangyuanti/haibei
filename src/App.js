import React , { Component } from 'react';
import Login from './containers/login';
import { BrowserRouter, Route } from 'react-router-dom'
import Xxx from '@/containers/xxx'
class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Xxx} />
            </BrowserRouter>
        </div>
    );
  }
}


export default App;
