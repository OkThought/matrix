import $ from "jquery";
import {observe} from "mobx";
import {inject, observer} from "mobx-react";
import * as React from "react";

import GameFieldComponent from "./GameFieldComponent";
import GameStore from "../stores/GameStore";

interface GameProps {
  gameStore?: GameStore
}

@inject('gameStore')
@observer
class GameComponent extends React.Component<GameProps> {
  public render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="mt-2 sticky-top d-flex flex-column align-items-center">
          <div className="btn-group" role="group">
            <button className="btn btn-control"
                    onClick={() => this.store.reset()}>
              Reset
            </button>
            <button className="btn btn-control"
                    onClick={() => this.store.undo()}
                    disabled={!this.store.canUndo}>
              Undo
            </button>
            <button className="btn btn-control"
                    onClick={() => this.store.redo()}
                    disabled={!this.store.canRedo}>
              Redo
            </button>
            <button className="btn btn-control"
                    onClick={() => this.store.nextLevel()}>
              Next Level
            </button>
          </div>
          <p className="scoreText">Crossouts: {this.store.crossoutsMade}</p>
        </div>
          <GameFieldComponent rows={this.store.rows}
                              previousSelectedNumberRow={this.store.previousSelectedNumberRow}
                              previousSelectedNumberCol={this.store.previousSelectedNumberCol}
                              onCellClick={(row, col) => this.store.handleCellClick(row, col)}/>
      </div>
    );
  }

  public componentDidMount(): void {
    if (super.componentDidMount) {
      super.componentDidMount();
    }

    // this.store.reset()

    observe(this.store, 'crossoutsMade',  () => {
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

  private get store() {
    return this.props.gameStore!
  }
}

export default GameComponent;
