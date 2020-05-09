import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';
import './index.scss';

import { Calculator } from './Calculator';

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root'),
);
