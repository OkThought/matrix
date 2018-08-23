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
            <div className="flex-column">
              <div className="btn-group mt-2" role="group">
                <button type="button"
                        className="btn btn-secondary">
                  Reset
                </button>
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.handleNextLevel()}>
                  Next Level
                </button>
              </div>

              <div className="mt-1">
                <Board board={this.board}/>
              </div>
            </div>
          </div>
        </div>
      );
    }

    handleNextLevel() {
      const all_positive = this.board.reduce((rows, row) =>
        rows.concat(row)
      ).filter(n => n > 0);

      this.board.replace(all_positive.reduce((board, number) => {
        const last_row_index = board.length - 1;
        const last_row_size = board[last_row_index].length;
        if (last_row_size < 9) {
          board[last_row_index] = board[last_row_index].concat([number]);
          return board;
        } else {
          return board.concat([[number]])
        }
      }, this.board));
    }
  }
);

const Board = observer(
  class Board extends Component {
    render() {
      return (
        <div className="Board">
          {this.props.board.map((row, row_index) =>
            <div className="row" key={row_index}>
              {row.map((number, col_index) =>
                <div className="col-" key={col_index}>
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
