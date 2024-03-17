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
}
