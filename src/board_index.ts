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

  get neighborOffsets() {
    return [-this.boardWidth, -1, 1, +this.boardWidth];
  }

  get singleIndex() {
    return this.row * DEFAULT_BOARD_WIDTH + this.col;
  }

  get neighbors(): BoardIndex[] {
    const singleIndex = this.singleIndex;
    return this.neighborOffsets
      .map((offset) => singleIndex + offset)
      .filter((i) => i >= 0)
      .map((i) => BoardIndex.bySingleIndex(i, this.boardWidth));
  }

  public isNeighborWith(that) {
    return this.neighbors.find((e: BoardIndex) => {
      return e.equals(that);
    }) !== undefined;
  }

  public equals(that: BoardIndex) {
    return this.row === that.row && this.col === that.col;
  }

  public toString() {
    return `${this.row}:${this.col}`;
  }
}

export default BoardIndex;
