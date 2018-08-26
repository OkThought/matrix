import * as React from 'react';
import BoardIndex from "./board_index";

interface Interface {
  numbers: number[][],
  onNumberClick: (row_index: number, col_index: number) => void,
  selectedNumberIndex?: BoardIndex,
}

class Board extends React.Component<Interface> {
  render() {
    return (
      <div className="Board">
        {this.props.numbers.map((row, row_index) => {
          const row_selected = this.props.selectedNumberIndex &&
            row_index === this.props.selectedNumberIndex.row_index;
          return (
            <div className="row" key={row_index}>
              {row.map((number, col_index) => {
                let button_classes = "number btn btn-dark btn-sm rounded-0";

                if (row_selected &&
                  col_index === this.props.selectedNumberIndex.col_index) {
                  button_classes += " selected";
                } else if (number === 0) {
                  button_classes += " crossed-out"
                }

                return (
                  <div className="col-" key={col_index}>
                    <button type="button"
                            className={button_classes}
                            onClick={() => this.props.onNumberClick(row_index, col_index)}>
                      {number}
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
