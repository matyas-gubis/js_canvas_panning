import { Game } from './game.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const hudCanvas = document.getElementById('hud');
hudCanvas.width = window.innerWidth;
hudCanvas.height = window.innerHeight;
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
const hudCtx = hudCanvas.getContext('2d');

const game = new Game(canvas.width, canvas.height, ctx, hudCtx);

game.init(canvas);

let lastTime = 0;
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(deltaTime);
    game.render(ctx, deltaTime, hudCtx);
    requestAnimationFrame(animate);
}
// animate(lastTime);
