import GameField from "./GameField";
import {action} from "mobx";

export default class ClassicalGameField extends GameField {
  public constructor(
    radix: number = GameField.RADIX_DEFAULT,
    rowSize: number = GameField.ROW_SIZE_DEFAULT(radix),
    initialSize: number = GameField.INITIAL_SIZE_DEFAULT(rowSize),
  ) {
    super();
    this._radix = radix
    this._rowSize = rowSize
    this._initialSize = initialSize
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
      if (digitChars.indexOf('0') !== -1) {
        continue
      }
      const digits: number[] = digitChars.map((digit) => parseInt(digit, this.radix))
      this.cells.push(...digits)
    }
  }
}
