const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

let rectPosX = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  draw();
  requestAnimationFrame(animate);
}

animate();

function draw() {
  // ctx.fillStyle = "red";
  // ctx.fillRect(rectPosX, 0, 10, 10);
  // rectPosX++;
}
