import { Grid } from './gridnew.js';
import { Hud } from './hud.js';
import { InputHandler } from './inputHandler.js';

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
        this.context.restore();
        // this.hud.draw(this.hudContext);

        // console.log(this.frameTimer, this.frameInterval, deltaTime);
    }

    /**
     * @param {HTMLCanvasElement} canvas
     */
    init(canvas) {
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
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
