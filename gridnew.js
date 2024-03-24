import { Game } from "./game.js";
import { clamp } from "./util.js";

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
    this.width = numberOfColumns * columnWidth;
    this.height = numberOfRows * rowHeight;
    this.game = game;
  }
  draw() {
    if (
      this.game.offset.x + this.width < 0 ||
      this.game.offset.x > this.game.width
    ) {
      return;
    }
    this.game.context.beginPath();
    this.game.context.strokeStyle = "#9a83fd";
    let firstColumnToRender = 0;
    let lastColumnToRender = this.numberOfColumns;
    let firstRowToRender = 0;
    let lastRowToRender = this.numberOfRows;
    let renderedVerticalLines = 0;
    let renderedHorizontalLines = 0;
    let excessColumns = this.game.offset.x + this.width - this.game.width;
    if (this.game.offset.x > 0 && this.width < this.game.width) {
      firstColumnToRender = 0;
    } else if (this.game.offset.x <= 0 && this.width < this.game.width) {
      firstColumnToRender = clamp(
        -Math.floor(this.game.offset.x / this.columnWidth),
        0,
        this.numberOfColumns
      );
    }
    if (this.game.offset.x + this.width > this.game.width) {
      lastColumnToRender =
        this.numberOfColumns - Math.floor(excessColumns / this.columnWidth);
    }
    for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
      this.game.context.moveTo(
        i * this.columnWidth,
        firstRowToRender * this.rowHeight
      );
      this.game.context.lineTo(
        i * this.columnWidth,
        lastRowToRender * this.rowHeight
      );
      renderedVerticalLines++;
    }
    console.log(
      "renderedVerticalLines",
      renderedVerticalLines,
      "firstColumnToRender",
      firstColumnToRender
    );

    this.game.context.stroke();
    this.game.context.closePath();
  }

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
