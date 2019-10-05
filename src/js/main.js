import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.jsx';

ReactDOM.render(
    <Suspense fallback="progres..">
      <App />
    </Suspense>,
    document.getElementById('root'),
);
  