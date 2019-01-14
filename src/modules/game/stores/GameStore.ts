import {action, autorun, computed, observable} from "mobx";
import GameField from "../GameField";
import ClassicalGameField from "../ClassicalGameField";
import CellIndex from "../CellIndex";
import * as _ from "lodash";
import RandomGameField from "../RandomGameField";

class GameStore {
  public static readonly INITIAL_HISTORY = []

  public static readonly INITIAL_POSITION_IN_HISTORY = 0

  public static readonly INITIAL_CROSSOUTS_MADE = 0

  @observable
  public rowSize: number

  @observable
  public radix: number

  @observable
  public seed?: string

  @observable
  public initialSize: number

  private _field: GameField

  @observable
  public history: number[][] = GameStore.INITIAL_HISTORY

  @observable
  public positionInHistory: number = GameStore.INITIAL_POSITION_IN_HISTORY

  @observable
  public previousSelectedCellIndex?: CellIndex

  @observable
  public crossoutsMade: number = GameStore.INITIAL_CROSSOUTS_MADE

  public constructor(radix: number = 10,
                     rowSize: number = radix - 1,
                     initialSize: number = rowSize * 3,
                     seed?: string) {
    this.radix = radix
    this.rowSize = rowSize
    this.initialSize = initialSize
    this.seed = seed
    // to compute the field
    // noinspection TsLint
    this._field = this.field
    autorun(() => this.field.reset())
  }

  @computed
  public get field(): GameField {
    let field: GameField
    if (this.seed === undefined) {
      field = new ClassicalGameField(this.rowSize, this.initialSize, this.radix)
    } else {
      field = new RandomGameField(this.rowSize, this.initialSize, this.radix, this.seed)
    }
    return field
  }

  @computed
  public get cells() {
    return this.field.cells
  }

  // @observable
  // public field: GameField = new ClassicalGameField(this.rowSize, this.radix)

  // comment out because otherwise doesn't update on changes
  @computed
  public get rows(): number[][] {
    const result = [];
    for (let sliceStart = 0; sliceStart < this.field.size; sliceStart += this.field.rowSize) {
      const sliceEnd = Math.min(sliceStart + this.field.rowSize, this.field.size);
      result.push(this.cells.slice(sliceStart, sliceEnd));
    }
    return result;
  }

  @computed
  public get previousSelectedCell() {
    return (
      this.previousSelectedCellIndex &&
      this.field.cell(this.previousSelectedCellIndex)
    )
  }

  @computed
  public get previousSelectedNumberRow() {
    return (
      this.previousSelectedCellIndex &&
      this.previousSelectedCellIndex.row
    )
  }

  @computed
  public get previousSelectedNumberCol() {
    return (
      this.previousSelectedCellIndex &&
      this.previousSelectedCellIndex.col
    )
  }

  @action
  public handleCellClick(row: number, col: number) {
    const clickedCellIndex = new CellIndex(row, col);
    const clickedCell = this.field.cell(clickedCellIndex);

    if (clickedCell === 0) {
      return
    }

    if (!clickedCell || clickedCell < 0 || clickedCell >= this.radix) {
      throw Error(`Unexpected number ${clickedCell}`);
    }

    if (this.previousSelectedCellIndex === undefined) {
      this.previousSelectedCellIndex = clickedCellIndex;
      return;
    }

    if (_.isEqual(this.previousSelectedCellIndex, clickedCellIndex)) {
      this.previousSelectedCellIndex = undefined;
      return;
    }

    if (!this.field.canBeCrossedOut(this.previousSelectedCellIndex, clickedCellIndex)) {
      this.previousSelectedCellIndex = clickedCellIndex
      return
    }

    this.crossOut(this.previousSelectedCellIndex, clickedCellIndex);
  }

  @action
  private crossOut(cellIndex1: CellIndex, cellIndex2: CellIndex) {
    this.field.crossOut(cellIndex1)
    this.field.crossOut(cellIndex2)
    this.previousSelectedCellIndex = undefined
    this.field.removeZeroRows()
    this.recordFieldInHistory()
    this.crossoutsMade++
  }

  @computed
  public get canUndo() {
    return this.positionInHistory > 0;
  }

  @action
  public undo() {
    this.positionInHistory--
    this.setFieldFromHistory(this.positionInHistory)
    this.crossoutsMade--
  }

  @computed
  public get canRedo() {
    return this.positionInHistory < this.history.length - 1
  }

  @action
  public redo() {
    this.positionInHistory++
    this.setFieldFromHistory(this.positionInHistory)
    this.crossoutsMade++
  }

  @action
  private setFieldFromHistory(positionInHistory: number) {
    this.field.set(this.history[positionInHistory])
  }

  @action
  public nextLevel() {
    this.field.copyPositiveCells()
    this.resetHistory()
  }

  @action
  public reset() {
    this.field.reset()
    this.resetHistory()
    this.crossoutsMade = GameStore.INITIAL_CROSSOUTS_MADE
  }

  @action
  private recordFieldInHistory() {
    this.history.splice(this.positionInHistory + 1, this.history.length, ...[[...this.field.cells]]);
    this.positionInHistory++;
  }

  @action
  private resetHistory() {
    this.history = [[...this.field.cells]]
    this.positionInHistory = GameStore.INITIAL_POSITION_IN_HISTORY
  }
}

export default GameStore
