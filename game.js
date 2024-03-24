import { Grid } from "./gridnew.js";
import { Hud } from "./hud.js";
import { InputHandler } from "./inputHandler.js";

export class Game {
  /**
   *
   * @param {number} width
   * @param {number} height
   * @param {CanvasRenderingContext2D} context
   * @param {CanvasRenderingContext2D} hudContext
   */
  constructor(width, height, context, hudContext) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.hudContext = hudContext;
    this.input = new InputHandler(this);
    this.offset = {
      x: 10,
      y: 10,
    };
    this.scale = 1;
    this.targetFPS = 30;
    this.frameInterval = 1000 / this.targetFPS;
    this.frameTimer = 0;
    this.wordBorders = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    this.grid = new Grid(5, 6, 50, 50, this);
    this.hud = new Hud(this);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} deltaTime
   */
  render() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.context.save();
    this.context.translate(this.offset.x, this.offset.y);
    this.context.scale(this.scale, this.scale);
    // console.log(this.offset);
    this.grid.draw();
    this.context.restore();
    if (this.input.panning.isPanning) {
      this.hudContext.clearRect(0, 0, this.width, this.height);
      this.hud.draw(this.hudContext);
    }

    // console.log(this.frameTimer, this.frameInterval, deltaTime);
  }

  /**
   * @param {HTMLCanvasElement} canvas
   */
  init(canvas) {
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    this.hud.setContext(this.hudContext);
    this.hud.draw();
    this.grid.draw();
  }

  screenToWorld(x, y) {
    return {
      x: (x - this.offset.x) / this.scale,
      y: (y - this.offset.y) / this.scale,
    };
  }

  setWordBordeers() {
    const topAndLeft = this.screenToWorld(0, 0);
    const bottomAndRight = this.screenToWorld(
      window.innerWidth,
      window.innerHeight
    );
    this.wordBorders.left = topAndLeft.x;
    this.wordBorders.top = topAndLeft.y;
    this.wordBorders.right = bottomAndRight.x;
    this.wordBorders.bottom = bottomAndRight.y;
  }
}
