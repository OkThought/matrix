import GameField from "./GameField";
import {action} from "mobx";

export default class ClassicalGameField extends GameField {
  public constructor(rowSize: number, initialSize: number, radix: number) {
    super();
    this._rowSize = rowSize
    this._initialSize = initialSize
    this._radix = radix
  }

  @action
  public init() {
    for (let i = 1; ; ++i) {
      if (this.size >= this.initialSize) {
        if (this.size > this.initialSize) {
          this.cells.splice(this.initialSize) // cut extra
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
