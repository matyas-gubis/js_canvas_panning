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
    };

    window.addEventListener("click", (e) => {});

    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    window.addEventListener("mousedown", (e) => {
      if (e.button == 2) {
        this.panning.isPanning = true;
        this.panning.start.x = e.clientX;
        this.panning.start.y = e.clientY;
        document.body.style.cursor = "grabbing";
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
      this.game.offset.x +=
        (wordMouseAfter.x - wordMouseBefore.x) * this.game.scale;
      this.game.offset.y +=
        (wordMouseAfter.y - wordMouseBefore.y) * this.game.scale;
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.game.centerScreenToWordCenter();
        // TODO: center screen to player
      }
    });
  }
}
