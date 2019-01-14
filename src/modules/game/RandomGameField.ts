import GameField from "./GameField";
import {prng} from "seedrandom";
import * as seedrandom from "seedrandom";
import {action} from "mobx";

export default class RandomGameField extends GameField {
  public readonly seed: string
  private randomGenerator: prng

  public constructor(rowSize: number, radix: number, seed: string) {
    super();
    this._rowSize = rowSize
    this._radix = radix
    this.seed = seed
    this.randomGenerator = seedrandom.alea(this.seed)
  }

  @action
  public init() {
    this.randomGenerator = seedrandom.alea(this.seed)
    for (let i = 0; i < this.initialFieldSize; ++i) {
      this.cells.push(this.randomCell)
      if (this.size === this.initialFieldSize) {
        break
      }
    }
  }

  private get randomCell(): number {
    const min = 1
    const max = this.radix - 1
    return (Math.abs(this.randomGenerator.int32()) % max) + min
  }
}
