import * as React from "react";

interface Interface {
  numbers: number[][];
  onNumberClick: (row: number, col: number) => void;
  selectedRow?: number;
  selectedCol?: number;
}

class Board extends React.Component<Interface> {
  get numbers() {
    return this.props.numbers;
  }

  public render() {
    return (
      <div className="Board">
        {this.numbers.map((row, rowIndex) => {
          const rowSelected = rowIndex === this.props.selectedRow;
          return (
            <div className="row" key={rowIndex}>
              {row.map((theNumber, colIndex) => {
                let buttonClasses = "number btn btn-dark btn-sm rounded-0";
                let buttonDisabled = false;
                if (rowSelected &&
                  colIndex === this.props.selectedCol) {
                  buttonClasses += " selected";
                } else if (theNumber === 0) {
                  buttonClasses += " crossed-out";
                  buttonDisabled = true;
                }

                return (
                  <div className="col-" key={rowIndex * 33 + colIndex}>
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
