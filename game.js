import { Grid } from "./gridnew.js";
import { InputHandler } from "./inputHandler.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new InputHandler(this);
    this.grid = new Grid(200, 200, 50, 50);
    this.offset = { x: 0, y: 0 };
    this.scale = 1;
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} deltaTime
   */
  render(context, deltaTime) {
    context.clearRect(0, 0, this.width, this.height);
    this.grid.draw(context);
    this.grid.update(deltaTime);
  }

  init() {}

  screenToWorld(x, y) {
    return {
      x: (x - this.offset.x) / this.scale,
      y: (y - this.offset.y) / this.scale,
    };
  }
}
