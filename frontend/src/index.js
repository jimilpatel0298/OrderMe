import './bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Manage from './Manage'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios'

// axios.defaults.baseURL = 'http://7aafffd7d946.ngrok.io/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Switch>
      <Route path='/manage' exact>
        <Manage />
      </Route>
      <Route path='/'>
        <App />
      </Route>
    </Switch>
  </BrowserRouter>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
