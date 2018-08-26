import * as React from 'react';
import Matrix from './matrix';
import {observer} from "mobx-react";

@observer
class App extends React.Component {
  render() {
    return (
      <main role="main" className="container">
        <Matrix/>
      </main>
    );
  }
}

export default App;
