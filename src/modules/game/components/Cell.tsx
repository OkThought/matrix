import * as React from "react";
import {Component} from "react";

interface CellProps {
  crossedOut: boolean;
  selected: boolean;
  value: string;
  onClick?: () => void;
}

class Cell extends Component<CellProps> {
  public render() {
    const {selected, crossedOut, onClick, value} = this.props;
    const buttonClasses = ['Cell'];
    if (selected) {
      buttonClasses.push('selected');
    }
    if (crossedOut) {
      buttonClasses.push('crossedOut');
    }
    return (
      <button type="button"
              className={buttonClasses.join(' ')}
              onClick={onClick}
              disabled={crossedOut}>
        {value}
      </button>
    );
  }
}

export default Cell;
