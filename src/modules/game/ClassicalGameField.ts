import GameField from "./GameField";
import {action} from "mobx";

export default class ClassicalGameField extends GameField {
  public constructor(rowSize: number, radix: number) {
    super();
    this._rowSize = rowSize
    this._radix = radix
  }

  @action
  public init() {
    for (let i = 1; ; ++i) {
      const digits = i.toString()
      if (digits.indexOf('0') !== -1) {
        continue
      }
      this.cells.push(
        ...(
          digits
          .split('')
          .map((digit) => parseInt(digit, this.radix))
        )
      )
      if (this.size === this.initialFieldSize) {
        break
      }
    }
  }
}
