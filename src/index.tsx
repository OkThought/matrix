import "bootstrap/js/src/index"
import "bootstrap/js/src/util"
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/styles.sass';
import App from "./modules/app/components/App";
import ApplicationStore from "./modules/app/stores/ApplicationStore";
import {Provider} from "mobx-react";

const root = document.getElementById('root');

const rootElement = (
  <Provider store={new ApplicationStore()}>
    <App/>
  </Provider>
);

ReactDOM.render(rootElement, root);
// registerServiceWorker();
