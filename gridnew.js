import { Game } from "./game.js";

export class Grid {
  /**
   *
   * @param {number} numberOfRows
   * @param {number} numberOfColumns
   * @param {number} rowHeight
   * @param {number} columnWidth
   * @param {Game} game
   */
  constructor(numberOfRows, numberOfColumns, rowHeight, columnWidth, game) {
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.rowHeight = rowHeight;
    this.columnWidth = columnWidth;
    this.game = game;
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "#9a83fd";

    ctx.stroke();
    ctx.closePath();
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} deltaTime
   */
  update() {}

  getGridWidth() {
    return this.numberOfColumns * this.columnWidth;
  }
  getGridHeight() {
    return this.numberOfRows * this.rowHeight;
  }

  /**
   * Returns the row index and column index of a cell, based on world coordinates. Indexing start from 0.
   * @param {number} x world space coordinate x
   * @param {number} y world space coordinate y
   */
  getCellByCoordinates(x, y) {
    const col = Math.floor(x / this.columnWidth);
    const row = Math.floor(y / this.rowHeight);
    if (
      col >= this.numberOfColumns ||
      row >= this.numberOfRows ||
      col < 0 ||
      row < 0
    ) {
      return null;
    } else {
      return { columnIndex: col, rowIndex: row };
    }
  }
}
