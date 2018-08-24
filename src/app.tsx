import * as React from 'react';
import Matrix from './matrix';
import {observer} from "mobx-react";

@observer
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Matrix</h1>
        </header>
        <Matrix/>
      </div>
    );
  }
}

export default App;
