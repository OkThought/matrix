import $ from "jquery";
import {observe} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";

import GameFieldComponent from "./GameFieldComponent";
import GameStore from "../stores/GameStore";

interface GameProps {
  store?: GameStore
}

@inject('store')
@observer
class GameComponent extends React.Component<GameProps> {
  public componentDidMount(): void {
    if (super.componentDidMount) {
      super.componentDidMount();
    }

    observe(this.props.store!, 'crossoutsMade',  () => {
      const scoreText = $('.scoreText');
      if (scoreText.hasClass('animation2')) {
        scoreText.addClass('animation1')
        scoreText.removeClass('animation2')
      } else {
        scoreText.addClass('animation2')
        scoreText.removeClass('animation1')
      }
    });
  }

  public render() {
    const store = this.props.store!

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="mt-2 sticky-top d-flex flex-column align-items-center">
          <div className="btn-group" role="group">
            <button className="btn btn-control"
                    onClick={() => store.reset()}>
              Reset
            </button>
            <button className="btn btn-control"
                    onClick={() => store.undo()}
                    disabled={!store.canUndo}>
              Undo
            </button>
            <button className="btn btn-control"
                    onClick={() => store.redo()}
                    disabled={!store.canRedo}>
              Redo
            </button>
            <button className="btn btn-control"
                    onClick={() => store.nextLevel()}>
              Next Level
            </button>
          </div>
          <p className="scoreText">Crossouts: {store.crossoutsMade}</p>
        </div>
          <GameFieldComponent rows={store.rows}
                              previousSelectedNumberRow={store.previousSelectedNumberRow}
                              previousSelectedNumberCol={store.previousSelectedNumberCol}
                              onCellClick={(row, col) => store.handleNumberClick(row, col)}/>
      </div>
    );
  }
}

export default GameComponent;
