import { Game } from "./game.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

const game = new Game(200, 200);

game.init();
game.render(ctx);
let lastTime = 0;
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  // ctx.clearRect()
  console.log(deltaTime);
  game.render(ctx, deltaTime);
  requestAnimationFrame(animate);
}
animate(lastTime);
