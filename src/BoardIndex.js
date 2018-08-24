export const DEFAULT_BOARD_WIDTH = 9;

export class BoardIndex {
  static bySingleIndex(index, board_width = DEFAULT_BOARD_WIDTH) {
    const row_index = index / board_width;
    const col_index = index % board_width;
    return new BoardIndex(row_index, col_index, board_width);
  }

  constructor(row_index, col_index, board_width = DEFAULT_BOARD_WIDTH) {
    this.row_index = row_index;
    this.col_index = col_index;
    this.board_width = board_width;
  }

  get neighbor_offsets() {
    return [-this.board_width, -1, 1, +this.board_width];
  }

  get defined() {
    return this.row_index && this.col_index;
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

  offset(offset) {
    const index = this.singleIndex + offset;
    return BoardIndex.bySingleIndex(index, this.board_width);
  }

  set(that) {
    this.row_index = that.row_index;
    this.col_index = that.col_index;
  }

  unset() {
    this.row_index = this.col_index = undefined;
  }

  isNeighborWith(that) {
    return this.neighbors.indexOf(that) >= 0;
  }
}
