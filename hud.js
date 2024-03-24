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
        const gridWidth = this.game.grid.getGridWidth();
        const gridHeight = this.game.grid.getGridHeight();
        const offsetX = this.game.offset.x;
        const offsetY = this.game.offset.y;
        const gameWidth = this.game.width;
        const gameHeight = this.game.height;
        const columnWidth = this.game.grid.columnWidth;
        const rowHeight = this.game.grid.rowHeight;
        const scale = this.game.scale;

        this.hudContext.clearRect(0, 0, this.game.width, this.game.height);
        this.hudContext.fillStyle = 'white';

        let firstColumnToRender = 0;
        let firstRowToRender = 0;
        let lastColumnToRender = this.game.grid.numberOfColumns;
        let lastRowToRender = this.game.grid.numberOfRows;

        if (offsetX + gridWidth < 0 || offsetX > gameWidth || offsetY + gridHeight < 0 || offsetY > gameHeight) {
            return;
        }

        // Calculate the range of columns and rows to render based on visibility
        const excessColumns = offsetX + gridWidth - gameWidth;
        if (offsetX > 0 && gridWidth < gameWidth) {
            firstColumnToRender = 0;
        } else if (offsetX <= 0 && gridWidth < gameWidth) {
            firstColumnToRender = clamp(-Math.ceil(offsetX / columnWidth / scale), 0, this.game.grid.numberOfColumns);
        }
        if (offsetX + gridWidth > gameWidth) {
            lastColumnToRender = this.game.grid.numberOfColumns - Math.floor(excessColumns / columnWidth / scale);
        }

        const excessRows = offsetY + gridHeight - gameHeight;
        if (offsetY > 0 && gridHeight < gameHeight) {
            firstRowToRender = 0;
        } else if (offsetY <= 0 && gridHeight < gameHeight) {
            firstRowToRender = clamp(-Math.ceil(offsetY / rowHeight / scale), 0, this.game.grid.numberOfRows);
        }
        if (offsetY + gridHeight > gameHeight) {
            lastRowToRender = this.game.grid.numberOfRows - Math.floor(excessRows / rowHeight / scale);
        }

        // Render horizontal coordinates
        this.hudContext.save();
        this.hudContext.rotate((-90 * Math.PI) / 180);
        for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(i, -10, (i * columnWidth + columnWidth / 2) * scale + offsetX + 3);
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(i, -gameHeight + 10, (i * columnWidth + columnWidth / 2) * scale + offsetX + 3);
        }
        this.hudContext.restore();

        // Render vertical coordinates
        for (let i = firstRowToRender; i <= lastRowToRender; i++) {
            this.hudContext.textAlign = 'left';
            this.hudContext.fillText(i, 10, (i * rowHeight + rowHeight / 2) * scale + offsetY + 3);
            this.hudContext.textAlign = 'right';
            this.hudContext.fillText(i, gameWidth - 10, (i * rowHeight + rowHeight / 2) * scale + offsetY + 3);
        }
    }
    /**
     * @param {CanvasRenderingContext2D} hudContext
     */
    setContext(hudContext) {
        this.hudContext = hudContext;
    }
}
