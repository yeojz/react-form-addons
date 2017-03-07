import 'bulma/css/bulma.css';
import 'highlight.js/styles/solarized-dark.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';

const elem = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(elem, document.getElementById('root'));
