import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  document.getElementById('table')

);
