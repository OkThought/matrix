import * as React from "react";

import Cell from "./Cell";

interface FieldProps {
  rows: number[][]
  onCellClick: (row: number, col: number) => void
  previousSelectedCell?: {
    row: number
    col: number
  }
}

class Field extends React.Component<FieldProps> {
  public render() {
    return (
      <div className="game-field overflow-scroll">
        {this.props.rows.map((row, rowIndex) => {
          const selectedRow = this.props.previousSelectedCell && this.props.previousSelectedCell.row
          const rowSelected = rowIndex === selectedRow;
          return (
            <div className="row flex-nowrap mx-0" key={rowIndex}>
              {row.map((value, colIndex) => {
                const selectedCol = this.props.previousSelectedCell && this.props.previousSelectedCell.col
                const selected = rowSelected && colIndex === selectedCol;
                const crossedOut = !selected && value === 0;
                return (
                  <div className="col-" key={(rowIndex << 10) + colIndex}>
                    <Cell onClick={() => this.props.onCellClick(rowIndex, colIndex)}
                          selected={selected}
                          crossedOut={crossedOut}
                          value={value.toString()}
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

export default Field;
