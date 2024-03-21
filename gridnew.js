export class Grid {
  constructor(numberOfRows, numberOfColumns, rowHeight, columnWidth) {
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    this.rowHeight = rowHeight;
    this.columnWidth = columnWidth;
  }
  draw() {}
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} wordBorders
   */
  update(ctx, wordBorders) {
    /*     this.verticalLinesDrawn = 0;
    ctx.beginPath();
    ctx.strokeStyle = "#9a83fd";
    for (let i = 0; i <= this.columnCount; i++) {
      ctx.moveTo(i * this.cellWidth, 0);
      ctx.lineTo(i * this.cellWidth, this.cellHeight * this.rowCount);
      if (
        i * this.cellWidth < wordBorders.right &&
        i * this.cellWidth > wordBorders.left
      ) {
        this.verticalLinesDrawn++;
      }
    }
    for (let i = 0; i <= this.rowCount; i++) {
      ctx.moveTo(0, i * this.cellHeight);
      ctx.lineTo(this.cellWidth * this.columnCount, i * this.cellHeight);
    }
    ctx.stroke(); */
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
