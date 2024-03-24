import { Game } from './game.js';

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
        this.hudContext.clearRect(0, 0, this.game.width, this.game.height);
        this.hudContext.fillStyle = 'white';

        // horizontal coordinates
        this.hudContext.save();
        this.hudContext.rotate((-90 * Math.PI) / 180);
        for (let i = 0; i < this.game.grid.numberOfColumns; i++) {
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(
                i,
                -10,
                (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) * this.game.scale +
                    this.game.offset.x +
                    3
            );
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(
                i,
                -this.game.height + 10,
                (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) * this.game.scale +
                    this.game.offset.x +
                    3
            );
        }
        this.hudContext.restore();

        // vertical coordinates
        for (let i = 0; i < this.game.grid.numberOfRows; i++) {
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(
                i,
                10,
                (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) * this.game.scale +
                    this.game.offset.y +
                    3
            );
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(
                i,
                this.game.width - 10,
                (i * this.game.grid.columnWidth + this.game.grid.columnWidth / 2) * this.game.scale +
                    this.game.offset.y +
                    3
            );
        }
    }
    /**
     * @param {CanvasRenderingContext2D} hudContext
     */
    setContext(hudContext) {
        this.hudContext = hudContext;
    }
}
