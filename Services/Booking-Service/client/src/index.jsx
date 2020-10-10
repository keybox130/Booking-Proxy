import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    div, a, h1, h2, h3, h4, h5, h6, p, input, button, option, select, form {
    font-family: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("calendar"),
);