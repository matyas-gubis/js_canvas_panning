import { Game } from "./game.js";

export class Hud {
  /**
   * @param {Game} game
   * @param {CanvasRenderingContext2D} hudContext
   */
  constructor(game) {
    this.game = game;
    this.hudContext;
  }

  draw() {
    this.hudContext.fillStyle = "white";
    // this.hudContext.fillText(this.game.grid.verticalLinesDrawn, 5, 10);

    // horizontal coordinates
    this.hudContext.save();
    this.hudContext.rotate((-90 * Math.PI) / 180);
    for (let i = 0; i < this.game.grid.numberOfColumns; i++) {
      this.hudContext.textAlign = "right";
      this.hudContext.fillText(
        i,
        -10,
        (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) *
          this.game.scale +
          this.game.offset.x +
          3
      );
      this.hudContext.textAlign = "left";
      this.hudContext.fillText(
        i,
        -this.game.height + 10,
        (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) *
          this.game.scale +
          this.game.offset.x +
          3
      );
    }
    this.hudContext.restore();

    // vertical coordinates
    for (let i = 0; i < this.game.grid.numberOfRows; i++) {
      this.hudContext.textAlign = "left";
      this.hudContext.fillText(
        i,
        10,
        (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) *
          this.game.scale +
          this.game.offset.y +
          3
      );
      this.hudContext.textAlign = "right";
      this.hudContext.fillText(
        i,
        this.game.width - 10,
        (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) *
          this.game.scale +
          this.game.offset.y +
          3
      );
    }
    const firstToRender = Math.floor(
      -this.game.offset.x / (this.game.grid.columnWidth * this.game.scale)
    );
    const columnsFit = Math.ceil(
      this.game.width / (this.game.grid.columnWidth * this.game.scale)
    );
    const rowsFit = Math.ceil(
      this.game.height / (this.game.grid.rowHeight * this.game.scale)
    );
    // screenwidth/ (columnwidth/scale)
    this.hudContext.font = "20px Arial";
    this.hudContext.textAlign = "center";
    this.hudContext.fillText(
      columnsFit +
        " columns and " +
        rowsFit +
        " rows fit the screen\n The first column to render is: " +
        firstToRender +
        ". The first column's startpoint should be:",
      this.game.width / 2,
      this.game.height / 2
    );
  }
  /**
   * @param {CanvasRenderingContext2D} hudContext
   */
  setContext(hudContext) {
    this.hudContext = hudContext;
  }
}
