import {observer} from "mobx-react";
import {Component} from "react";
import {computed, decorate, observable} from "mobx";
import {BoardIndex} from "./BoardIndex";
import {Board} from "./Board.js";
import React from "react";

export const Matrix = observer(
  class Matrix extends Component {
    numbers = INITIAL_BOARD.slice();
    selectedNumberIndex = new BoardIndex();

    get selectedNumber() {
      if (this.selectedNumberIndex.defined) {
        const row = this.selectedNumberIndex.row_index;
        const col = this.selectedNumberIndex.col_index;
        return this.numbers[row][col];
      }
      return undefined;
    }

    render() {
      return (
        <div className="Game container">
          <div className="d-flex justify-content-center">
            <div className="flex-column">
              <div className="btn-group mt-2" role="group">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.handleReset()}>
                  Reset
                </button>
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.handleNextLevel()}>
                  Next Level
                </button>
              </div>

              <div className="mt-1">
                <Board numbers={this.numbers}
                       onNumberClick={(row_index, col_index) =>
                         this.handleNumberClick(row_index, col_index)}/>
              </div>
            </div>
          </div>
        </div>
      );
    }

    handleNumberClick(row_index, col_index) {
      const clickedNumber = this.numbers[row_index][col_index];
      const clickedNumberIndex = new BoardIndex(row_index, col_index);
      if (clickedNumber > 0 && clickedNumber < 10) {
        if (this.selectedNumberIndex.defined) {
          if (clickedNumberIndex.isNeighborWith(this.selectedNumberIndex) &&
            numbers_match(clickedNumber, this.selectedNumber)) {
            this.crossOut(clickedNumberIndex, this.selectedNumberIndex);
          } else {
            this.selectedNumberIndex.unset();
          }
        } else {
          this.selectedNumberIndex.set(clickedNumberIndex);
        }
      } else if (clickedNumber === 0) {
        // do nothing
      } else {
        throw Error(`Unexpected number ${clickedNumber}`);
      }
    }

    crossOut(index1, index2) {
      this.numbers[index1.row_index][index1.col_index] = 0;
      this.numbers[index2.row_index][index2.col_index] = 0;
    }

    handleNextLevel() {
      const all_positive = this.numbers.reduce((rows, row) =>
        rows.concat(row)
      ).filter(n => n > 0);

      this.numbers.replace(all_positive.reduce((board, number) => {
        const last_row_index = board.length - 1;
        const last_row_size = board[last_row_index].length;
        if (last_row_size < 9) {
          board[last_row_index] = board[last_row_index].concat([number]);
          return board;
        } else {
          return board.concat([[number]])
        }
      }, this.numbers));
    }

    handleReset() {
      this.numbers.replace(INITIAL_BOARD)
    }
  }
);

decorate(Matrix, {
  selectedNumberIndex: observable,
  board: observable,
  selectedNumber: computed,
});

const INITIAL_BOARD = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 1, 1, 2, 1, 3, 1, 4, 1],
  [5, 1, 6, 1, 7, 1, 8, 1, 9],
];

function numbers_match(a, b) {
  return a + b === 10 || a === b;
}
