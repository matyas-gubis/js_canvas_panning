import { Grid } from "./gridnew.js";
import { Hud } from "./hud.js";
import { InputHandler } from "./inputHandler.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new InputHandler(this);
    this.offset = {
      x: 0,
      y: 0,
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
    this.grid = new Grid(50, 60, 50, 50, this);
    this.hud = new Hud(this);
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} deltaTime
   */
  render(context, deltaTime, hudContext) {
    // context.clearRect(0, 0, this.width, this.height);
    if (this.frameTimer > this.frameInterval) {
      context.save();
      context.translate(this.offset.x, this.offset.y);
      context.scale(this.scale, this.scale);
      // console.log(this.offset);
      this.grid.draw(context);
      this.grid.update(context, deltaTime);
      context.restore();
      if (this.input.panning.isPanning) {
        hudContext.clearRect(0, 0, this.width, this.height);
        this.hud.draw(hudContext);
      }
    } else {
      this.frameTimer += deltaTime;
    }
    // console.log(this.frameTimer, this.frameInterval, deltaTime);
  }

  /**
   * @param {HTMLCanvasElement} canvas
   */
  init(canvas, hudContext) {
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    this.hud.setContext(hudContext);
    this.hud.draw();
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
