import CellIndex from "./CellIndex";
import {action, computed, observable} from "mobx";

export default abstract class GameField {
  public static readonly RADIX_MIN = 4
  public static readonly RADIX_MAX = 32
  public static readonly RADIX_DEFAULT = 10

  public static readonly ROW_SIZE_MIN = 4
  public static readonly ROW_SIZE_MAX = 32
  public static ROW_SIZE_DEFAULT(radix: number) {
    return radix - 1
  }

  public static readonly INITIAL_SIZE_MIN = 1
  public static readonly INITIAL_SIZE_MAX = 99
  public static INITIAL_SIZE_DEFAULT(rowSize: number) {
    return rowSize * 3
  }

  @observable
  public cells: number[] = []

  @observable
  protected _radix: number = GameField.RADIX_DEFAULT

  @observable
  protected _rowSize: number = GameField.ROW_SIZE_DEFAULT(this._radix)

  @observable
  protected _initialSize: number = GameField.INITIAL_SIZE_DEFAULT(this._rowSize)

  @computed
  get rowSize(): number {
    return this._rowSize;
  }

  @computed
  get initialSize(): number {
    return this._initialSize
  }

  @computed
  get radix(): number {
    return this._radix;
  }

  public abstract init(): void

  @computed
  get size(): number {
    return this.cells.length;
  }

  @action
  public clear() {
    this.set([])
  }

  @action
  public reset() {
    this.clear()
    this.init()
  }

  @action
  public set(newCells: number[]) {
    this.cells.splice(0, this.size, ...newCells)
  }

  public crossOut(cellIndex: CellIndex): void {
    this.cells[cellIndex.serial(this.rowSize)] = 0
  }

  public canBeCrossedOut(cellIndex1?: CellIndex, cellIndex2?: CellIndex): boolean {
    return (
      cellIndex1 !== undefined &&
      cellIndex2 !== undefined &&
      this.cellsMatch(cellIndex1, cellIndex2) &&
      this.areNeighbors(cellIndex1, cellIndex2)
    )
  }

  public areNeighbors(cellIndex1: CellIndex, cellIndex2: CellIndex): boolean {
    const serial1 = cellIndex1.serial(this.rowSize)
    const serial2 = cellIndex2.serial(this.rowSize)
    return this.neighborsSerials(serial1).indexOf(serial2) >= 0
  }

  protected neighborsSerials(serial: number): number[] {
    const neighbors: number[] = []
    const offsets = [-this.rowSize, -1, +1, +this.rowSize]
    offsets.forEach(offset => {
      let potentialNeighborSerialIndex = serial
      while (true) {
        potentialNeighborSerialIndex += offset
        if (potentialNeighborSerialIndex < 0 || potentialNeighborSerialIndex >= this.size) {
          break
        }
        if (this.cells[potentialNeighborSerialIndex] !== 0) {
          neighbors.push(potentialNeighborSerialIndex)
          break
        }
      }
    })
    return neighbors
  }

  public cellsMatch(cellIndex1: CellIndex, cellIndex2: CellIndex): boolean {
    const n1 = this.cell(cellIndex1)
    const n2 = this.cell(cellIndex2)
    return (
      n1 !== undefined &&
      n2 !== undefined &&
      this.numbersMatch(n1, n2)
    )
  }

  public numbersMatch(n1: number, n2: number): boolean {
    return (
      n1 === n2 ||
      n1 + n2 === this.radix
    )
  }

  public cell(cellIndex: CellIndex): number | undefined {
    return this.cells[cellIndex.serial(this.rowSize)]
  }

  @action
  public copyPositiveCells() {
    const positiveNumbers = this.cells.filter((n) => n > 0);
    this.cells = this.cells.concat(...positiveNumbers);
  }

  @action
  public removeZeroRows() {
    const rowsToRemove: number[] = [];
    for (let i = 0; i < this.size - this.rowSize; i += this.rowSize) {
      const row = this.cells.slice(i, i + this.rowSize);
      if (row.every((n) => n === 0)) {
        rowsToRemove.push(i);
      }
    }

    rowsToRemove.reverse().forEach((i) => {
      this.cells.splice(i, this.rowSize);
    });
  }
}
