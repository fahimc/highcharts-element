import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactDemo } from './react-demo';
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
        <div>
            <h1>React Rendering Chart</h1>
            <ReactDemo></ReactDemo>
        </div>,
        document.getElementById('react-root')
      );

});
