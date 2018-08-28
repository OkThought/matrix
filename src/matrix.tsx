import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import Board from "./board";

@observer
class Matrix extends React.Component {
  @observable
  private history: number[][] = [INITIAL_BOARD.slice()];

  @observable
  private positionInHistory: number = 0;

  @observable
  private previousSelectedNumberIndex: number;

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
                    onClick={() => this.handleUndo()}
                    disabled={!this.canUndo}>
              Undo
            </button>
            <button type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleRedo()}
                    disabled={!this.canRedo}>
              Redo
            </button>
            <button type="button"
                    className="btn btn-secondary"
                    onClick={() => this.handleNextLevel()}>
              Next Level
            </button>
          </div>

          <div className="mt-1">
            <Board numbers={this.numbersTable}
                   previousSelectedNumberRow={this.previousSelectedNumberRow}
                   previousSelectedNumberCol={this.previousSelectedNumberCol}
                   onNumberClick={(row, col) =>
                     this.handleNumberClick(row, col)}/>
          </div>
        </div>
      </div>
    );
  }

  @computed
  private get numbers() {
    return this.history[this.positionInHistory];
  }

  @computed
  private get numbersTable() {
    const result = [];
    for (let i = 0; i < this.numbers.length; i += BOARD_WIDTH) {
      const sliceEnd = Math.min(i + BOARD_WIDTH, this.numbers.length);
      result.push(this.numbers.slice(i, sliceEnd));
    }
    return result;
  }

  @computed
  private get previousSelectedNumber() {
    if (this.previousSelectedNumberIndex >= 0 &&
      this.previousSelectedNumberIndex < this.numbers.length) {
      return this.numbers[this.previousSelectedNumberIndex];
    }
    return undefined;
  }

  @computed
  private get previousSelectedNumberRow() {
    return Math.floor(this.previousSelectedNumberIndex / BOARD_WIDTH);
  }

  @computed
  private get previousSelectedNumberCol() {
    return this.previousSelectedNumberIndex % BOARD_WIDTH;
  }

  @action
  public handleNumberClick(row, col) {
    const clickedNumberIndex = row * BOARD_WIDTH + col;
    const clickedNumber = this.numbers[clickedNumberIndex];
    if (clickedNumber > 0 && clickedNumber < 10) {
      if (this.previousSelectedNumberIndex !== undefined) {
        if (this.previousSelectedNumberIndex === clickedNumberIndex) {
          this.previousSelectedNumberIndex = undefined;
        } else if (this.areNeighbors(clickedNumberIndex, this.previousSelectedNumberIndex)) {
          if (numbersMatch(clickedNumber, this.previousSelectedNumber)) {
            this.crossOut(this.previousSelectedNumberIndex, clickedNumberIndex);
          } else {
            this.previousSelectedNumberIndex = clickedNumberIndex;
          }
        } else {
          this.previousSelectedNumberIndex = clickedNumberIndex;
        }
      } else {
        this.previousSelectedNumberIndex = clickedNumberIndex;
      }
    } else if (clickedNumber === 0) {
      // do nothing
    } else {
      throw Error(`Unexpected number ${clickedNumber}`);
    }
  }

  @action
  private crossOut(index1: number, index2: number) {
    const numbers = this.numbers.slice();
    numbers[index1] = 0;
    numbers[index2] = 0;
    this.previousSelectedNumberIndex = undefined;

    this.history = this.history.slice(0, this.positionInHistory + 1).concat([numbers]);
    this.positionInHistory++;
    this.removeZeroRows();
  }

  @action
  private removeZeroRows() {
    const rowsToRemove: number[] = [];
    for (let i = 0; i < this.numbers.length - BOARD_WIDTH; i += BOARD_WIDTH) {
      const row = this.numbers.slice(i, i + BOARD_WIDTH);
      if (row.every((n) => n === 0)) {
        rowsToRemove.push(i);
      }
    }
    rowsToRemove.reverse().forEach((i) => {
      this.numbers.splice(i, BOARD_WIDTH);
    });
  }

  private get canUndo() {
    return this.positionInHistory > 0;
  }

  @action
  private handleUndo() {
    this.positionInHistory--;
  }

  private get canRedo() {
    return this.positionInHistory < this.history.length - 1;
  }

  @action
  private handleRedo() {
    this.positionInHistory++;
  }

  @action
  private handleNextLevel() {
    const numbers = this.numbers.slice();
    const positiveNumbers = numbers.filter((n) => n > 0);
    numbers.push(...positiveNumbers);
    this.history = [numbers];
    this.positionInHistory = 0;
  }

  @action
  private handleReset() {
    this.history = [INITIAL_BOARD.slice()];
    this.positionInHistory = 0;
  }

  private areNeighbors(index1: number, index2: number) {
    return this.neighbors(index1).indexOf(index2) >= 0;
  }

  private neighbors(index: number) {
    const neighbors = [];
    [-BOARD_WIDTH, -1, +1, +BOARD_WIDTH].forEach((offset) => {
      let i = index;
      while (true) {
        i += offset;
        if (i < 0 || i >= this.numbers.length) {
          break;
        }
        if (this.numbers[i] !== 0) {
          neighbors.push(i);
          break;
        }
      }
    });
    return neighbors;
  }
}

const BOARD_WIDTH = 9;

const INITIAL_BOARD = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  1, 1, 1, 2, 1, 3, 1, 4, 1,
  5, 1, 6, 1, 7, 1, 8, 1, 9,
];

function numbersMatch(a, b) {
  return a + b === BOARD_WIDTH + 1 || a === b;
}

export default Matrix;
