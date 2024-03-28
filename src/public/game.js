import { Grid } from './grid.js';
import { Hud } from './hud.js';
import { InputHandler } from './inputHandler.js';

export class Game {
    /**
     *
     * @param {number} width
     * @param {number} height
     * @param {HTMLCanvasElement} context
     * @param {HTMLCanvasElement} hudContext
     */
    constructor(width, height, canvas, hudCanvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.hudCanvas = hudCanvas;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.context = this.canvas.getContext('2d');
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.hudContext = this.hudCanvas.getContext('2d');
        this.input = new InputHandler(this);
        this.offset = {
            x: 50,
            y: 50,
        };
        this.scale = 1;
        this.grid = new Grid(10000, 10000, 50, 50, this);
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
        this.hud.draw();
        this.context.restore();
        // this.hud.draw(this.hudContext);

        // console.log(this.frameTimer, this.frameInterval, deltaTime);
    }

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLCanvasElement} hudCanvas
     */
    init() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.hudCanvas.width = this.canvas.width;
            this.hudCanvas.height = this.canvas.height;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.render();
        });
        this.hud.setContext(this.hudContext);
        this.render();
    }

    screenToWorld(x, y) {
        return {
            x: (x - this.offset.x) / this.scale,
            y: (y - this.offset.y) / this.scale,
        };
    }

    setWordBordeers() {
        const topAndLeft = this.screenToWorld(0, 0);
        const bottomAndRight = this.screenToWorld(window.innerWidth, window.innerHeight);
        this.wordBorders.left = topAndLeft.x;
        this.wordBorders.top = topAndLeft.y;
        this.wordBorders.right = bottomAndRight.x;
        this.wordBorders.bottom = bottomAndRight.y;
    }
}
