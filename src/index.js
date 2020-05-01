import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './component/login';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const Routing = (
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={Login}/>
      <Route exact path="/movies" component={App}/>
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(Routing,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
