import { clamp } from './util.js';
export function calculateRenderRange(offset, size, gridSize, gameSize, cellSize, scale) {
    let firstToRender = 0;
    let lastToRender = gridSize;

    if (offset + size < 0 || offset > gameSize) {
        return [firstToRender, 0];
    }

    const excess = offset + size - gameSize;
    if (offset > 0 && size < gameSize) {
        firstToRender = 0;
    } else if (offset <= 0) {
        firstToRender = clamp(-Math.ceil(offset / cellSize / scale), 0, gridSize);
    }
    if (offset + size > gameSize) {
        lastToRender = gridSize - Math.floor(excess / cellSize / scale);
    }

    return [firstToRender, lastToRender];
}
