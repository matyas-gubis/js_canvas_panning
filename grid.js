export class Grid {
  constructor(rowCount, columnCount, cellWidth, cellHeight) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.verticalLinesDrawn = 0;
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} wordBorders
   */
  render(ctx, wordBorders) {
    this.verticalLinesDrawn = 0;
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
    ctx.stroke();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} wordPosition
   */
  drawCoordinates(ctx, wordPosition) {
    const fontSize = 20;
    ctx.fillStyle = "#5cbba7";
    ctx.textAlign = "left";
    ctx.font = fontSize + "px Arial";
    for (let i = 0; i < this.rowCount; i++) {
      ctx.fillText(
        i,
        wordPosition.x + 10,
        i * this.cellHeight + (this.cellHeight + fontSize) / 2
      );
    }
    ctx.fillText(
      this.verticalLinesDrawn,
      wordPosition.x + 10,
      wordPosition.y + 30
    );
    this.verticalLinesDrawn = 0;
    ctx.save();
    ctx.translate(wordPosition.x, wordPosition.y);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.textAlign = "right";
    for (let i = 0; i < this.columnCount; i++) {
      ctx.fillText(
        i,
        -10,
        -wordPosition.x + i * this.cellWidth + (this.cellWidth + fontSize) / 2
      );
    }
    ctx.restore();
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
