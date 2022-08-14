import React from 'react';
import App from './App';

import { render } from 'react-dom';
const container = document.getElementById('app');
render( <React.StrictMode><App /> </React.StrictMode>, container);