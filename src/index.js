import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import styles from './index.scss';
import App from "./components/App/App";


let root = document.createElement('root');
root.id = 'root';
document.body.appendChild(root);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    render(App)
  });
}