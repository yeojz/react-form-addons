import 'bulma/css/bulma.css';
import 'highlight.js/styles/github-gist.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import marked from 'marked';
import App from './App';
import store from './store';

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const elem = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(elem, document.getElementById('root'));
