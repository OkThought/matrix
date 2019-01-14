import "bootstrap/js/src/index"
import "bootstrap/js/src/util"
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Provider} from "mobx-react";

import './styles/styles.sass';
import RootStore from "./modules/router/stores/RootStore";
import RouterContainer from "./modules/router/containers/RouterContainer";

const root = document.getElementById('root');

const rootElement = (
  <Provider rootStore={new RootStore()}>
    <RouterContainer/>
  </Provider>
);

ReactDOM.render(rootElement, root);
// registerServiceWorker();
