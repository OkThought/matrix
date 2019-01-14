import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import GameLinkFormStore from "../stores/GameLinkFormStore";
import GameField from "../../GameField";

interface GameLinkFormProps {
  store: GameLinkFormStore
}

@observer
export default class GameLinkForm extends React.Component<GameLinkFormProps> {
  public render(): React.ReactNode {
    return (
      <form className="d-flex flex-column">
        <div className="form-group row align-items-center m-0 flex-nowrap">
          <label className="col-4 text-nowrap small" htmlFor="Radix">Radix</label>
          <div className="col mx-2 my-1">
            <input className="form-control-sm" type="number"
                   id="Radix" placeholder="Radix" aria-label="Radix"
                   value={this.store.radix} min={GameField.RADIX_MIN} max={GameField.RADIX_MAX}
                   onChange={this.handleRadixChange}/>
          </div>
        </div>
        <div className="form-group row align-items-center m-0 flex-nowrap">
          <label className="col-4 text-nowrap small" htmlFor="RowSize">Row Size</label>
          <div className="col mx-2 my-1">
            <input className="form-control-sm" type="number"
                   id="RowSize" placeholder="Row Size" aria-label="Row Size"
                   value={this.store.rowSize} min={GameField.ROW_SIZE_MIN} max={GameField.ROW_SIZE_MAX}
                   onChange={this.handleRowSizeChange}/>
          </div>
        </div>
        <div className="form-group row align-items-center m-0 flex-nowrap">
          <label className="col-4 text-nowrap small" htmlFor="InitialFieldSize">Initial Field Size</label>
          <div className="col mx-2 my-1">
            <input className="form-control-sm" type="number"
                   id="InitialFieldSize" placeholder="Initial Field Size" aria-label="Initial Field Size"
                   value={this.store.initialSize} min={GameField.INITIAL_SIZE_MIN} max={GameField.INITIAL_SIZE_MAX}
                   onChange={this.handleInitialSizeChange}/>
          </div>
        </div>
        <div className="form-group row align-items-center m-0 flex-nowrap">
          <label className="col-4 text-nowrap small" htmlFor="RandomSeed">Random Seed</label>
          <div className="col mx-2 my-1">
            <input className="form-control-sm" type="text"
                   id="RandomSeed" placeholder="Random Seed" aria-label="Random Seed"
                   value={this.store.seed || ""}
                   onChange={this.handleSeedChange}/>
          </div>
        </div>
        <Link className="mx-sm-2 my-sm-1" to={this.store.gameUrl}>
          <input className="btn btn-light" type="submit" value="Generate"/>
        </Link>
      </form>
    )
  }

  private get store() {
    return this.props.store
  }

  private handleRadixChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    this.store.radix = parseInt(target.value)
  }

  private handleRowSizeChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    this.store.rowSize = parseInt(target.value)
  }

  private handleInitialSizeChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    this.store.initialSize = parseInt(target.value)
  }

  private handleSeedChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    this.store.seed = target.value
  }
}
