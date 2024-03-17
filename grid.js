export class Grid {
  constructor(rowCount, columnCount, cellWidth, cellHeight) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
  }
  /**@param {CanvasRenderingContext2D} ctx  */
  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#142540";
    for (let i = 0; i <= this.columnCount; i++) {
      ctx.moveTo(i * this.cellWidth, 0);
      ctx.lineTo(i * this.cellWidth, this.cellHeight * this.rowCount);
    }
    for (let i = 0; i <= this.rowCount; i++) {
      ctx.moveTo(0, i * this.cellHeight);
      ctx.lineTo(this.cellWidth * this.columnCount, i * this.cellHeight);
    }
    ctx.stroke();
  }

  /**
   * Returns the row and column number of a given cell, based on world coordinates. Indexing start from 0.
   * @param {number} x world space coordinate x
   * @param {number} y world space coordinate y
   */
  getCellByWorldCoordinates(x, y) {
    const col = Math.floor(x / this.cellWidth);
    const row = Math.floor(y / this.cellHeight);
    if (col >= this.columnCount || row >= this.rowCount || col < 0 || row < 0) {
      return null;
    } else {
      return { col: col, row: row };
    }
  }

  getGridWidth() {
    return this.columnCount * this.cellWidth;
  }
  getGridHeight() {
    return this.rowCount * this.cellHeight;
  }
}
