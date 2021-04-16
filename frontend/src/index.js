import './bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Start from './Start'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

// axios.defaults.baseURL = 'http://7aafffd7d946.ngrok.io/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  // <React.StrictMode>
  <Start />,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
