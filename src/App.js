import React, { Component } from 'react';
import './App.css';
import {observer} from "mobx-react";
import {Matrix} from "./Matrix";

const App = observer(
  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Matrix</h1>
          </header>
          <Matrix/>
        </div>
      );
    }
  }
);

export default App;
