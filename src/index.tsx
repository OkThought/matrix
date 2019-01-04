import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './index.module.css';
import AppRouter from "./router/router";

const root = document.getElementById('root');
const Index = () => (
  <div className={styles.index}>
    <AppRouter/>
  </div>
);

ReactDOM.render(<Index/>, root);
// registerServiceWorker();
