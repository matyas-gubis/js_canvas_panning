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

        let firstColumnToRender = 0;
        let firstRowToRender = 0;
        let lastColumnToRender = this.numberOfColumns;
        let lastRowToRender = this.numberOfRows;
        if (offsetX + gridWidth < 0 || offsetX > gameWidth || offsetY + gridHeight < 0 || offsetY > gameHeight) {
            return;
        }

        // calculating number of columns to render
        const excessColumns = offsetX + gridWidth - gameWidth;
        if (offsetX > 0 && gridWidth < gameWidth) {
            firstColumnToRender = 0;
        } else if (offsetX <= 0) {
            firstColumnToRender = clamp(-Math.ceil(offsetX / columnWidth / scale), 0, this.numberOfColumns);
        }
        if (offsetX + gridWidth > gameWidth) {
            lastColumnToRender = this.numberOfColumns - Math.floor(excessColumns / columnWidth / scale);
        }

        //calculating number of rows to render
        const excessRows = offsetY + gridHeight - gameHeight;
        if (offsetY > 0 && gridHeight < gameHeight) {
            firstRowToRender = 0;
        } else if (offsetY <= 0) {
            firstRowToRender = clamp(-Math.ceil(offsetY / rowHeight / scale), 0, this.numberOfRows);
        }
        if (offsetY + gridHeight > gameHeight) {
            lastRowToRender = this.numberOfRows - Math.floor(excessRows / rowHeight / scale);
        }

        let renderedVerticalLines = 0;
        let renderedHorizontalLines = 0;
        this.game.context.beginPath();
        this.game.context.strokeStyle = '#9a83fd';
        for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
            this.game.context.moveTo(i * columnWidth, firstRowToRender * rowHeight);
            this.game.context.lineTo(i * columnWidth, lastRowToRender * rowHeight);
            renderedVerticalLines++;
        }
        for (let i = firstRowToRender; i <= lastRowToRender; i++) {
            this.game.context.moveTo(firstColumnToRender * rowHeight, i * rowHeight);
            this.game.context.lineTo(lastColumnToRender * rowHeight, i * rowHeight);
            renderedHorizontalLines++;
        }
        this.game.context.stroke();
        this.game.context.closePath();
        /*         console.log(
            'renderedVerticalLines',
            renderedVerticalLines,
            '\nrenderedHorizontalLines',
            renderedHorizontalLines,
            '\nfirstColumnToRender',
            firstColumnToRender,
            '\nlastColumnToRender',
            lastColumnToRender,
            '\nfirstRowToRender',
            firstRowToRender,
            '\nlastRowToRender',
            lastRowToRender
        ); */
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
