import {observer} from "mobx-react";
import * as React from "react";
import Matrix from "./game/matrix";

@observer
class App extends React.Component {
  public render() {
    return (
      <main role="main" className="container">
        <Matrix/>
      </main>
    );
  }
}

export default App;
