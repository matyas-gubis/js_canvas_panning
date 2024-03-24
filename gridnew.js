import { Game } from './game.js';
import { clamp } from './util.js';

export class Grid {
    /**
     *
     * @param {number} numberOfRows
     * @param {number} numberOfColumns
     * @param {number} rowHeight
     * @param {number} columnWidth
     * @param {Game} game
     */
    constructor(numberOfRows, numberOfColumns, rowHeight, columnWidth, game) {
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        this.rowHeight = rowHeight;
        this.columnWidth = columnWidth;
        this.game = game;
    }
    draw() {
        const gridWidth = this.getGridWidth();
        const gridHeight = this.getGridHeight();
        const offsetX = this.game.offset.x;
        const offsetY = this.game.offset.y;
        const gameWidth = this.game.width;
        const gameHeight = this.game.height;
        const columnWidth = this.columnWidth;
        const rowHeight = this.rowHeight;
        const scale = this.game.scale;

        if (offsetX + gridWidth < 0 || offsetX > gameWidth || offsetY + gridHeight < 0 || offsetY > gameHeight) {
            return;
        }

        let firstColumnToRender =
            offsetX > 0 ? 0 : clamp(-Math.floor(offsetX / columnWidth / scale), 0, this.numberOfColumns);

        let lastColumnToRender = this.numberOfColumns;
        if (offsetX + gridWidth > gameWidth) {
            lastColumnToRender -= Math.floor((offsetX + gridWidth - gameWidth) / columnWidth / scale);
        }

        let firstRowToRender = offsetY > 0 ? 0 : clamp(-Math.floor(offsetY / rowHeight / scale), 0, this.numberOfRows);

        let lastRowToRender = this.numberOfRows;
        if (offsetY + gridHeight > gameHeight) {
            lastRowToRender -= Math.floor((offsetY + gridHeight - gameHeight) / rowHeight / scale);
        }

        let renderedVerticalLines = 0;
        let renderedHorizontalLines = 0;
        this.game.context.beginPath();
        this.game.context.strokeStyle = '#9a83fd';
        for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
            this.game.context.moveTo(i * this.columnWidth, firstRowToRender * this.rowHeight);
            this.game.context.lineTo(i * this.columnWidth, lastRowToRender * this.rowHeight);
            renderedVerticalLines++;
        }
        for (let i = firstRowToRender; i <= lastRowToRender; i++) {
            this.game.context.moveTo(firstColumnToRender * this.columnWidth, i * this.rowHeight);
            this.game.context.lineTo(lastColumnToRender * this.columnWidth, i * this.rowHeight);
            renderedHorizontalLines++;
        }

        console.log('renderedVerticalLines', renderedVerticalLines, 'firstColumnToRender', firstColumnToRender);

        this.game.context.stroke();
        this.game.context.closePath();
    }

    update() {}

    getGridWidth() {
        return this.numberOfColumns * this.columnWidth * this.game.scale;
    }
    getGridHeight() {
        return this.numberOfRows * this.rowHeight * this.game.scale;
    }

    /**
     * Returns the row index and column index of a cell, based on world coordinates. Indexing start from 0.
     * @param {number} x world space coordinate x
     * @param {number} y world space coordinate y
     */
    getCellByCoordinates(x, y) {
        const col = Math.floor(x / this.columnWidth);
        const row = Math.floor(y / this.rowHeight);
        if (col >= this.numberOfColumns || row >= this.numberOfRows || col < 0 || row < 0) {
            return null;
        } else {
            return { columnIndex: col, rowIndex: row };
        }
    }
}
