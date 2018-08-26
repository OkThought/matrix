export const DEFAULT_BOARD_WIDTH = 9;

class BoardIndex {
  readonly row_index: number;
  readonly col_index: number;
  private readonly board_width: number;

  static bySingleIndex(index, board_width = DEFAULT_BOARD_WIDTH) {
    const row_index = index / board_width;
    const col_index = index % board_width;
    return new BoardIndex(row_index, col_index, board_width);
  }

  constructor(row_index, col_index,
              board_width=DEFAULT_BOARD_WIDTH) {
    this.row_index = row_index;
    this.col_index = col_index;
    this.board_width = board_width;
  }

  get neighbor_offsets() {
    return [-this.board_width, -1, 1, +this.board_width];
  }

  get singleIndex() {
    return this.row_index * DEFAULT_BOARD_WIDTH + this.col_index;
  }

  get neighbors() {
    const singleIndex = this.singleIndex;
    return this.neighbor_offsets
      .map(offset => singleIndex + offset)
      .filter(i => i >= 0)
      .map(i => BoardIndex.bySingleIndex(i, this.board_width));
  }

  isNeighborWith(that) {
    return this.neighbors.indexOf(that) >= 0;
  }
}

export default BoardIndex;
