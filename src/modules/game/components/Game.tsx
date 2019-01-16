import $ from "jquery";
import {observe} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";

import Field from "./Field";
import GameStore from "../stores/GameStore";

interface GameProps {
  gameStore: GameStore
}

@observer
class Game extends React.Component<GameProps> {
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
          <p className="game-score">Crossouts: {this.store.crossoutsMade}</p>
        </div>
        <Field rows={this.store.rows}
               previousSelectedCell={this.store.previousSelectedCellIndex}
               onCellClick={(row, col) => this.store.handleCellClick(row, col)}/>
      </div>
    );
  }

  public componentDidMount(): void {
    if (super.componentDidMount) {
      super.componentDidMount();
    }

    observe(this.store, 'crossoutsMade',  () => {
      const scoreText = $('.game-score');
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
    return this.props.gameStore
  }
}

export default Game;
