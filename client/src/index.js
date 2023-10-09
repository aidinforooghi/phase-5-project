import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);