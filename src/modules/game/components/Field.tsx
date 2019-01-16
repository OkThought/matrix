import * as React from "react";

import Cell from "./Cell";

interface FieldProps {
  rows: number[][]
  selectedCells: Array<{
    row: number
    col: number
  }>
  onCellClick?: (row: number, col: number) => void
}

class Field extends React.Component<FieldProps> {
  public render() {
    return (
      <div className="game-field overflow-scroll">
        {this.props.rows.map((cellRow, rowIndex) => {
          return (
            <div className="row flex-nowrap mx-0" key={rowIndex}>
              {cellRow.map((value, colIndex) => {
                const selected = this.props.selectedCells.some(
                  ({row, col}) => row === rowIndex && col === colIndex)
                const crossedOut = !selected && value === 0;
                return (
                  <div className="col-" key={(rowIndex << 10) + colIndex}>
                    <Cell onClick={() => this.onCellClick(rowIndex, colIndex)}
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

  private get onCellClick() {
    return this.props.onCellClick || ((row, cell) => {})
  }
}

export default Field;
