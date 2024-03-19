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
const mouse = {
  x: 0,
  y: 0,
};
const panning = {
  startX: 0,
  startY: 0,
};
const scale = {
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
    x: x * scale.x + offset.x,
    y: y * scale.y + offset.y,
  };
}

function wordCenterToScreenCenter() {
  offset.x = window.innerWidth / 2 - (grid.getGridWidth() * scale.x) / 2;
  offset.y = window.innerHeight / 2 - (grid.getGridHeight() * scale.y) / 2;
  console.log(offset);
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
  console.log("Screen position:", { x: e.clientX, y: e.clientY });
  console.log("Screen to word position:", screenToWorld(e.clientX, e.clientY));
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
  const wordMouseBefore = screenToWorld(mouse.x, mouse.y);
  scale.x = clamp(scale.x - e.deltaY / 1000, 0.1, 5);
  scale.y = clamp(scale.y - e.deltaY / 1000, 0.1, 5);
  const wordMouseAfter = screenToWorld(mouse.x, mouse.y);
  offset.x += (wordMouseAfter.x - wordMouseBefore.x) * scale.x;
  offset.y += (wordMouseAfter.y - wordMouseBefore.y) * scale.y;
});
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    wordCenterToScreenCenter();
  }
});

animate();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
