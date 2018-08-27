import * as React from "react";
import BoardIndex from "./board_index";

interface Interface {
  numbers: number[][];
  onNumberClick: (row: number, col: number) => void;
  selectedNumberIndex?: BoardIndex;
}

class Board extends React.Component<Interface> {
  public render() {
    return (
      <div className="Board">
        {this.props.numbers.map((row, rowIndex) => {
          const rowSelected = this.props.selectedNumberIndex &&
            rowIndex === this.props.selectedNumberIndex.row;
          return (
            <div className="row" key={rowIndex}>
              {row.map((theNumber, colIndex) => {
                let buttonClasses = "number btn btn-dark btn-sm rounded-0";
                let buttonDisabled = false;
                if (rowSelected &&
                  colIndex === this.props.selectedNumberIndex.col) {
                  buttonClasses += " selected";
                } else if (theNumber === 0) {
                  buttonClasses += " crossed-out";
                  buttonDisabled = true;
                }

                return (
                  <div className="col-" key={colIndex}>
                    <button type="button"
                            className={buttonClasses}
                            onClick={() => this.props.onNumberClick(rowIndex, colIndex)}
                            disabled={buttonDisabled}>
                      {theNumber}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
