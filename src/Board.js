import {Component} from "react";
import React from "react";

export class Board extends Component {
  render() {
    return (
      <div className="Board">
        {this.props.numbers.map((row, row_index) =>
          <div className="row" key={row_index}>
            {row.map((number, col_index) =>
              <div className="col-" key={col_index}>
                <button type="button"
                        className="btn btn-dark btn-sm rounded-0"
                        onClick={
                          () => this.props.onNumberClick(row_index, col_index)
                        }>
                  {number}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
