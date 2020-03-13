import React from 'react';
import {render} from 'react-dom';

const root = document.querySelector('#root');

const App = () => {
  return (
    <div>Acme Schools!</div>
  );
};
render(<App />, root);
