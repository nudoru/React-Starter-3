import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './js/Bootstrap';

// Bootstrap 4 styles with some variables tweaked
require('./sass/index.sass');

// Additional global CSS styles
require('./js/theme/GlobalStyles');

// Application container optionally loads config.json and sets up routing
ReactDOM.render(<Bootstrap />, document.querySelector('#app'));