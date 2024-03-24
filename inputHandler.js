import { Game } from "./game.js";
import { clamp } from "./util.js";

export class InputHandler {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /**@type {Game} */
    this.game = game;
    this.panning = {
      isPanning: false,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      pannedDistance: { x: 0, y: 0 },
    };

    window.addEventListener("click", (e) => {
      const mousePos = this.game.screenToWorld(e.clientX, e.clientY);
      console.log(this.game.grid.getCellByCoordinates(mousePos.x, mousePos.y));
    });

    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        this.panning.isPanning = true;
        this.setPanningStart(e.clientX, e.clientY);
        document.body.style.cursor = "grabbing";
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (this.panning.isPanning) {
        this.setPanningEnd(e.clientX, e.clientY);
        this.calculatePanningDistance();
        this.game.offset.x += this.panning.pannedDistance.x;
        this.game.offset.y += this.panning.pannedDistance.y;
        this.setPanningStart(e.clientX, e.clientY);
        this.game.render();
      }
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button == 2) {
        this.panning.isPanning = false;
        document.body.style.cursor = "default";
      }
    });

    window.addEventListener("wheel", (e) => {
      const wordMouseBefore = this.game.screenToWorld(e.clientX, e.clientY);
      let zoomValue =
        Math.floor((this.game.scale - e.deltaY / 1000) * 100) / 100;
      this.game.scale = clamp(zoomValue, 0.1, 5);
      const wordMouseAfter = this.game.screenToWorld(e.clientX, e.clientY);
      this.game.offset.x += Math.floor(
        (wordMouseAfter.x - wordMouseBefore.x) * this.game.scale
      );
      this.game.offset.y += Math.floor(
        (wordMouseAfter.y - wordMouseBefore.y) * this.game.scale
      );
      this.game.render();
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.game.centerScreenToWordCenter();
        // TODO: center screen to player
      }
    });
  }
  calculatePanningDistance() {
    this.panning.pannedDistance = {
      x: Math.floor(this.panning.end.x - this.panning.start.x),
      y: Math.floor(this.panning.end.y - this.panning.start.y),
    };
  }
  setPanningStart(x, y) {
    this.panning.start.x = x;
    this.panning.start.y = y;
  }
  setPanningEnd(x, y) {
    this.panning.end.x = x;
    this.panning.end.y = y;
  }
}
