import { Grid } from "./grid.js";

const canvas = document.getElementById("canvas");
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");

const grid = new Grid(10, 5, 50, 50);
const offset = {
  x: window.innerWidth / 2 - grid.getGridWidth() / 2,
  y: window.innerHeight / 2 - grid.getGridHeight() / 2,
};
let isPanning = false;
let mouse = {
  x: 0,
  y: 0,
};
let panning = {
  startX: 0,
  startY: 0,
};
let scale = {
  x: 1,
  y: 1,
};

function animate() {
  draw(ctx);
  requestAnimationFrame(animate);
}

/**@param {CanvasRenderingContext2D} ctx */
function draw(ctx) {
  if (isPanning) {
    offset.x += mouse.x - panning.startX;
    offset.y += mouse.y - panning.startY;

    panning.startX = mouse.x;
    panning.startY = mouse.y;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(offset.x, offset.y);
  ctx.scale(scale.x, scale.y);
  grid.render(ctx);
}

function screenToWorld(x, y) {
  return {
    x: (x - offset.x) / scale.x,
    y: (y - offset.y) / scale.y,
  };
}

function wordToScreen(x, y) {
  return {
    x: x / scale.x + offset.x,
    y: y / scale.y + offset.y,
  };
}

function centerToScreen() {
  offset = {
    x: window.innerWidth / 2 - grid.getGridWidth() / 2,
    y: window.innerHeight / 2 - grid.getGridHeight() / 2,
  };
}

window.addEventListener("load", () => {
  console.log("init");
  draw(ctx);
});
window.addEventListener("resize", () => {
  console.log("resize");
  draw(ctx);
});
window.addEventListener("click", (e) => {
  console.log(screenToWorld(e.clientX, e.clientY));
  const wordCoordinates = screenToWorld(e.clientX, e.clientY);
  console.log(
    grid.getCellByWorldCoordinates(wordCoordinates.x, wordCoordinates.y)
  );
});
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
window.addEventListener("mousedown", (e) => {
  if (e.button == 2) {
    isPanning = true;
    panning.startX = mouse.x;
    panning.startY = mouse.y;
    document.body.style.cursor = "grabbing";
  }
});
window.addEventListener("mouseup", (e) => {
  if (e.button == 2) {
    isPanning = false;
    document.body.style.cursor = "default";
  }
});
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("wheel", (e) => {
  scale.x = clamp(scale.x - e.deltaY / 1000, 0.1, 5);
  scale.y = clamp(scale.y - e.deltaY / 1000, 0.1, 5);
  console.log(scale);
});

animate();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
