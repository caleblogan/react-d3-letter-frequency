import React from 'react';
import {render} from 'react-dom';

import styles from './index.scss';
import App from "./components/App/App";


let root = document.createElement('root');
root.id = 'root';
document.body.appendChild(root);

render(<App/>, root);
