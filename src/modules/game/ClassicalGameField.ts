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
      if (this.size >= this.initialFieldSize) {
        if (this.size > this.initialFieldSize) {
          this.cells.splice(this.initialFieldSize) // cut extra
        }
        break
      }
      const digitChars = i.toString(this.radix).split('')
      console.log(digitChars)
      if (digitChars.indexOf('0') !== -1) {
        continue
      }
      const digits: number[] = digitChars.map((digit) => parseInt(digit, this.radix))
      this.cells.push(...digits)
    }
  }
}
