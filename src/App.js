import React, { Component } from 'react';
import './App.css';
import {observer} from "mobx-react";
import {observable} from "mobx";

const App = observer(
  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Matrix</h1>
          </header>
          <Game/>
        </div>
      );
    }
  }
);

const Game = observer(
  class Game extends Component {
    board = observable(
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 1, 1, 2, 1, 3, 1, 4, 1],
        [5, 1, 6, 1, 7, 1, 8, 1, 9],
      ]
    );

    render() {
      return (
        <div className="Game container">
          <div className="d-flex justify-content-center">
            <Board board={this.board}/>
          </div>
        </div>
      );
    }
  }
);

const Board = observer(
  class Board extends Component {
    render() {
      return (
        <div className="Board">
          {this.props.board.map((row, row_index) =>
            <div className="row">
              {row.map((number, col_index) =>
                <div className="col-">
                  <button type="button" className="btn btn-dark btn-sm rounded-0">
                    {number}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  }
);

export default App;
