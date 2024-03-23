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
  draw() {}
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} deltaTime
   */
  update(ctx, deltaTime) {
    this.verticalLinesDrawn = 0;
    ctx.beginPath();
    ctx.strokeStyle = "#9a83fd";
    /* for (let i = 0; i <= this.numberOfColumns; i++) {
      ctx.moveTo(i * this.columnWidth, 0);
      ctx.lineTo(i * this.columnWidth, this.numberOfRows * this.rowHeight);
    } */
    /* for (let i = 0; i <= this.numberOfRows; i++) {
      ctx.moveTo(0, i * this.rowHeight);
      ctx.lineTo(this.numberOfColumns * this.columnWidth, i * this.rowHeight);
    } */
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = "green";
    ctx.beginPath();
    let columnsToRender = Math.ceil(
      this.game.width / (this.columnWidth * this.game.scale)
    );
    let firstColumnToRender = Math.floor(
      -this.game.offset.x / (this.columnWidth * this.game.scale)
    );
    if (firstColumnToRender < 0) {
      firstColumnToRender = 0;
    }
    const lastColumnToRender = this.numberOfColumns - firstColumnToRender;
    if (lastColumnToRender < columnsToRender) {
      columnsToRender = lastColumnToRender;
    }
    let rowsToRender = Math.ceil(
      this.game.height / (this.rowHeight * this.game.scale)
    );
    let firstRowToRender = Math.floor(
      -this.game.offset.y / (this.rowHeight * this.game.scale)
    );
    if (firstRowToRender < 0) {
      firstRowToRender = 0;
    }
    const lastRowToRender = this.numberOfRows - firstRowToRender;
    if (lastRowToRender < rowsToRender) {
      rowsToRender = lastRowToRender;
    }

    for (let i = 0; i <= columnsToRender; i++) {
      if (i + firstColumnToRender >= 0) {
        ctx.moveTo(
          (i + firstColumnToRender) * this.columnWidth,
          firstRowToRender * this.rowHeight
        );
        ctx.lineTo(
          (i + firstColumnToRender) * this.columnWidth,
          (firstRowToRender + lastRowToRender) * this.rowHeight
        );
      }
    }

    for (let i = 0; i <= rowsToRender; i++) {
      if (i + firstRowToRender >= 0) {
        ctx.moveTo(
          firstColumnToRender * this.columnWidth,
          (i + firstRowToRender) * this.rowHeight
        );
        ctx.lineTo(
          (firstColumnToRender + lastColumnToRender) * this.columnWidth,
          (i + firstRowToRender) * this.rowHeight
        );
      }
    }

    ctx.stroke();
  }

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
