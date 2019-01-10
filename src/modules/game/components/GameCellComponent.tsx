import * as React from "react";
import {Component} from "react";

interface ICellProps {
  crossedOut: boolean;
  selected: boolean;
  onClick: () => void;
  value: string;
}

class GameCellComponent extends Component<ICellProps> {
  public render() {
    const {selected, crossedOut, onClick, value} = this.props;
    const buttonClasses = ['GameCellComponent'];
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

export default GameCellComponent;
