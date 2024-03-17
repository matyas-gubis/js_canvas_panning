import { Grid } from "./grid.js";

const canvas = document.getElementById("canvas");
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

const grid = new Grid(10, 5, 50, 50);

function animate() {
  draw(ctx);
  requestAnimationFrame(animate);
}

function draw(ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  grid.render(ctx);
}

window.addEventListener("load", () => {
  console.log("init");
  draw(ctx);
});
window.addEventListener("resize", () => {
  console.log("resize");
  draw(ctx);
});

// animate();
