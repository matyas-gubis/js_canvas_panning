import { Game } from './game.js';
import { calculateRenderRange } from './common.js';

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
        const { grid, offset, width, height, scale } = this.game;
        const { columnWidth, rowHeight, numberOfColumns, numberOfRows } = grid;

        const [firstColumnToRender, lastColumnToRender] = calculateRenderRange(
            offset.x,
            grid.getGridWidth(),
            numberOfColumns,
            width,
            columnWidth,
            scale
        );
        const [firstRowToRender, lastRowToRender] = calculateRenderRange(
            offset.y,
            grid.getGridHeight(),
            numberOfRows,
            height,
            rowHeight,
            scale
        );

        this.hudContext.clearRect(0, 0, width, height);
        this.hudContext.fillStyle = 'white';

        // Render horizontal coordinates
        this.hudContext.save();
        this.hudContext.rotate((-90 * Math.PI) / 180);
        for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(i, -10, (i * columnWidth + columnWidth / 2) * scale + offset.x + 3);
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(i, -height + 10, (i * columnWidth + columnWidth / 2) * scale + offset.x + 3);
        }
        this.hudContext.restore();

        // Render vertical coordinates
        for (let i = firstRowToRender; i <= lastRowToRender; i++) {
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(i, 10, (i * rowHeight + rowHeight / 2) * scale + offset.y + 3);
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(i, width - 10, (i * rowHeight + rowHeight / 2) * scale + offset.y + 3);
        }
    }
    /**
     * @param {CanvasRenderingContext2D} hudContext
     */
    setContext(hudContext) {
        this.hudContext = hudContext;
    }
}
