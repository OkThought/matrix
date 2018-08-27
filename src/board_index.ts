export const DEFAULT_BOARD_WIDTH = 9;

class BoardIndex {
  public static bySingleIndex(index, boardWidth = DEFAULT_BOARD_WIDTH) {
    const row = Math.floor(index / boardWidth);
    const col = index % boardWidth;
    return new BoardIndex(row, col, boardWidth);
  }

  public readonly row: number;
  public readonly col: number;
  private readonly boardWidth: number;

  constructor(row, col,
              boardWidth = DEFAULT_BOARD_WIDTH) {
    this.row = row;
    this.col = col;
    this.boardWidth = boardWidth;
  }

  get singleIndex() {
    return this.row * DEFAULT_BOARD_WIDTH + this.col;
  }

  public offset(row: number, col: number) {
    const newRow = this.row + row;
    if (newRow < 0) {
      return undefined;
    }
    const newCol = this.col + col;
    if (newCol < 0) {
      return undefined;
    }
    return new BoardIndex(this.row + row, this.col + col);
  }

  public singleOffset(offset: number) {
    const index = this.singleIndex + offset;
    if (index < 0) {
      return undefined;
    }
    return BoardIndex.bySingleIndex(index);
  }

  public up() {
    return this.offset(-1, 0);
  }

  public down() {
    return this.offset(+1, 0);
  }

  public right() {
    return this.singleOffset(+1);
  }

  public left() {
    return this.singleOffset(-1);
  }

  public toString() {
    return `${this.row}:${this.col}`;
  }
}

export default BoardIndex;
