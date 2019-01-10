import * as React from "react";

import GameCellComponent from "./GameCellComponent";

interface GameFieldProps {
  numbers: number[][];
  onCellClick: (row: number, col: number) => void;
  previousSelectedNumberRow?: number;
  previousSelectedNumberCol?: number;
}

class GameFieldComponent extends React.Component<GameFieldProps> {
  get numbers() {
    return this.props.numbers;
  }

  public render() {
    return (
      <div className="Board overflow-scroll">
        {this.numbers.map((row, rowIndex) => {
          const rowSelected = rowIndex === this.props.previousSelectedNumberRow;
          return (
            <div className="row flex-nowrap mx-0" key={rowIndex}>
              {row.map((theNumber, colIndex) => {
                const selected = rowSelected && colIndex === this.props.previousSelectedNumberCol;
                const crossedOut = !selected && theNumber === 0;
                return (
                  <div className="col-" key={(rowIndex << 10) + colIndex}>
                    <GameCellComponent onClick={() => this.props.onCellClick(rowIndex, colIndex)}
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

export default GameFieldComponent;
