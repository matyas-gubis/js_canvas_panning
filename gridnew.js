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
    this.columnsToRender = this.getNumberOfColumnsToRender();
    this.firstColumnToRender = this.getFirstColumnToRender();
    this.lastColumnToRender = this.getLastColumnToRender();
    this.rowsToRender = this.getNumberOfRowsToRender();
    this.firstRowToRender = this.getFirstRowToRender();
    this.lastRowToRender = this.getLastRowToRender();
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
    this.columnsToRender = this.getNumberOfColumnsToRender();
    this.firstColumnToRender = this.getFirstColumnToRender();
    this.lastColumnToRender = this.getLastColumnToRender();

    this.rowsToRender = this.getNumberOfRowsToRender();
    this.firstRowToRender = this.getFirstRowToRender();
    this.lastRowToRender = this.getLastRowToRender();

    for (let i = 0; i <= this.columnsToRender; i++) {
      if (i + this.firstColumnToRender >= 0) {
        ctx.moveTo(
          (i + this.firstColumnToRender) * this.columnWidth,
          this.firstRowToRender * this.rowHeight
        );
        ctx.lineTo(
          (i + this.firstColumnToRender) * this.columnWidth,
          (this.firstRowToRender + this.lastRowToRender) * this.rowHeight
        );
      }
    }

    for (let i = 0; i <= this.rowsToRender; i++) {
      if (i + this.firstRowToRender >= 0) {
        ctx.moveTo(
          this.firstColumnToRender * this.columnWidth,
          (i + this.firstRowToRender) * this.rowHeight
        );
        ctx.lineTo(
          (this.firstColumnToRender + this.lastColumnToRender) *
            this.columnWidth,
          (i + this.firstRowToRender) * this.rowHeight
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

  getFirstColumnToRender() {
    const firstColumnToRender = Math.floor(
      -this.game.offset.x / (this.columnWidth * this.game.scale)
    );
    if (firstColumnToRender < 0) {
      return 0;
    }
    return firstColumnToRender;
  }
  getFirstRowToRender() {
    let firstRowToRender = Math.floor(
      -this.game.offset.y / (this.rowHeight * this.game.scale)
    );
    if (firstRowToRender < 0) {
      firstRowToRender = 0;
    }
    return firstRowToRender;
  }
  getLastColumnToRender() {
    return this.numberOfColumns - this.firstColumnToRender;
  }
  getLastRowToRender() {
    return this.numberOfRows - this.firstRowToRender;
  }
  getNumberOfRowsToRender() {
    const rowsToRender = Math.ceil(
      this.game.height / (this.rowHeight * this.game.scale)
    );
    if (this.lastRowToRender < rowsToRender) {
      return this.lastRowToRender;
    }
    return rowsToRender;
  }
  getNumberOfColumnsToRender() {
    const columnsToRender = Math.ceil(
      this.game.width / (this.columnWidth * this.game.scale)
    );
    if (this.lastColumnToRender < columnsToRender) {
      return this.lastColumnToRender;
    }
    return columnsToRender;
  }
  getPositionOfFirstColumnToRender() {}
  getPostionOfLastColumnToRender() {}
  getPositonOfFirstRowToRender() {}
  getPositionOfLastRowToRender() {}
}
