import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import Board from "./board";
import BoardIndex from "./board_index";

@observer
class Matrix extends React.Component {
  @observable
  public numbers = INITIAL_BOARD.slice();

  @observable
  public selectedNumberIndex = undefined;

  @computed
  get selectedNumber() {
    if (this.selectedNumberIndex) {
      const row = this.selectedNumberIndex.row;
      const col = this.selectedNumberIndex.col;
      return this.numbers[row][col];
    }
    return undefined;
  }

  public render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="h1">Matrix</div>
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
                   selectedNumberIndex={this.selectedNumberIndex}
                   onNumberClick={(row, col) =>
                     this.handleNumberClick(row, col)}/>
          </div>
        </div>
      </div>
    );
  }

  public handleNumberClick(row, col) {
    const clickedNumber = this.numbers[row][col];
    const clickedNumberIndex = new BoardIndex(row, col);
    if (clickedNumber > 0 && clickedNumber < 10) {
      if (this.selectedNumberIndex) {
        if (clickedNumberIndex.isNeighborWith(this.selectedNumberIndex)) {
          if (numbersMatch(clickedNumber, this.selectedNumber)) {
            console.log('match');
            this.crossOut(clickedNumberIndex, this.selectedNumberIndex);
          } else {
            this.selectedNumberIndex = clickedNumberIndex;
          }
        } else {
          this.selectedNumberIndex = clickedNumberIndex;
        }
      } else {
        this.selectedNumberIndex = clickedNumberIndex;
      }
    } else if (clickedNumber === 0) {
      // do nothing
    } else {
      throw Error(`Unexpected number ${clickedNumber}`);
    }
  }

  public crossOut(index1, index2) {
    const numbers = this.numbers.slice();
    numbers[index1.row][index1.col] = 0;
    numbers[index2.row][index2.col] = 0;
    this.numbers = numbers;
  }

  public handleNextLevel() {
    const allPositive = this.numbers.reduce((rows, row) =>
      rows.concat(row),
    ).filter((n) => n > 0);

    this.numbers = (allPositive.reduce((board, theNumber) => {
      const lastRow = board.length - 1;
      const lastRowSize = board[lastRow].length;
      if (lastRowSize < 9) {
        board[lastRow] = board[lastRow].concat([theNumber]);
        return board;
      } else {
        return board.concat([[theNumber]]);
      }
    }, this.numbers));
  }

  public handleReset() {
    this.numbers = INITIAL_BOARD;
  }
}

const INITIAL_BOARD = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 1, 1, 2, 1, 3, 1, 4, 1],
  [5, 1, 6, 1, 7, 1, 8, 1, 9],
];

function numbersMatch(a, b) {
  return a + b === 10 || a === b;
}

export default Matrix;
