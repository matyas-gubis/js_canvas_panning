import { Game } from './game.js';
import { calculateRenderRange } from './common.js';

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
        const { offset, width, height, context } = this.game;
        const { columnWidth, rowHeight, numberOfColumns, numberOfRows } = this;

        const [firstColumnToRender, lastColumnToRender] = calculateRenderRange(
            offset.x,
            this.getGridWidth(),
            numberOfColumns,
            width,
            columnWidth,
            this.game.scale
        );
        const [firstRowToRender, lastRowToRender] = calculateRenderRange(
            offset.y,
            this.getGridHeight(),
            numberOfRows,
            height,
            rowHeight,
            this.game.scale
        );

        context.beginPath();
        context.strokeStyle = '#9a83fd';
        let renderedVerticalLines = 0;
        let renderedHorizontalLines = 0;
        for (let i = firstColumnToRender; i <= lastColumnToRender; i++) {
            context.moveTo(i * columnWidth, firstRowToRender * rowHeight);
            context.lineTo(i * columnWidth, lastRowToRender * rowHeight);
            renderedVerticalLines++;
        }
        for (let i = firstRowToRender; i <= lastRowToRender; i++) {
            context.moveTo(firstColumnToRender * rowHeight, i * rowHeight);
            context.lineTo(lastColumnToRender * rowHeight, i * rowHeight);
            renderedHorizontalLines++;
        }
        context.stroke();
        context.closePath();
        console.log(
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
        );
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
