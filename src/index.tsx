import "bootstrap/js/src/index"
import "bootstrap/js/src/util"
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/styles.sass';
import RouterComponent from "./modules/router/components/RouterComponent";
import RootStore from "./modules/router/stores/RootStore";
import {Provider} from "mobx-react";

const root = document.getElementById('root');

const rootElement = (
  <Provider store={new RootStore()}>
    <RouterComponent/>
  </Provider>
);

ReactDOM.render(rootElement, root);
// registerServiceWorker();
