import * as React from "react";

import Cell from "./cell";

interface IBoardProps {
  numbers: number[][];
  onCellClick: (row: number, col: number) => void;
  previousSelectedNumberRow?: number;
  previousSelectedNumberCol?: number;
}

class Board extends React.Component<IBoardProps> {
  get numbers() {
    return this.props.numbers;
  }

  public render() {
    return (
      <div className="Board">
        {this.numbers.map((row, rowIndex) => {
          const rowSelected = rowIndex === this.props.previousSelectedNumberRow;
          return (
            <div className="row" key={rowIndex}>
              {row.map((theNumber, colIndex) => {
                const selected = rowSelected && colIndex === this.props.previousSelectedNumberCol;
                const crossedOut = !selected && theNumber === 0;
                return (
                  <div className="col-" key={(rowIndex << 10) + colIndex}>
                    <Cell onClick={() => this.props.onCellClick(rowIndex, colIndex)}
                          selected={selected}
                          crossedOut={crossedOut}
                          value={theNumber.toString()}
                    />
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
