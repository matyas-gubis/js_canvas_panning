const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const hud = document.getElementById("hud");
/** @type {CanvasRenderingContext2D} */
const hudctx = hud.getContext("2d");
let wordPosition = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragDistance = { x: 0, y: 0 };
let drawnElements = [];
let scale = 1;
console.log(ctx);
console.log(hudctx);

function draw() {
  // if (isDragging) console.log();
  ctx.translate(dragDistance.x, dragDistance.y);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;

  hud.width = window.innerWidth;
  hud.height = window.innerHeight;

  hudctx.width = window.innerWidth;
  hudctx.height = window.innerHeight;

  ctx.scale(scale, scale);
  hudctx.scale(scale, scale);

  ctx.fillRect(0, 0, ctx.width, ctx.height);

  ctx.translate(
    wordPosition.x - dragDistance.x,
    wordPosition.y - dragDistance.y
  );
  // ctx.scale(10, 10);
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 10, 10);

  ctx.beginPath();
  for (let i = 0; i < 10000; i++) {
    ctx.moveTo(0, i * 10);
    ctx.lineTo(10000, i * 10);
    ctx.moveTo(i * 10, 0);
    ctx.lineTo(i * 10, 10000);
  }
  ctx.strokeStyle = "#242424";
  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "blue";
  drawnElements.forEach((element) => {
    ctx.fillRect(element.x, element.y, element.w, element.h);
  });

  hudctx.font = "3px serif";
  hudctx.textAlign = "center";
  hudctx.fillStyle = "white";
  for (let i = 0; i < 10000; i++) {
    // y axis numbers
    hudctx.fillText(
      i,
      5,
      (i + 1 / 2) * 10 + wordPosition.y - dragDistance.y,
      10
    );
    // x axis numbers
    hudctx.fillText(
      i,
      (i + 1 / 2) * 10 + wordPosition.x - dragDistance.x,
      3,
      10
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hudctx.clearRect(0, 0, hud.width, hud.height);
  draw();
  requestAnimationFrame(animate);
}

window.addEventListener("load", draw);
window.addEventListener("resize", draw);
window.addEventListener("mousedown", (event) => {
  if (event.button == 2) {
    isDragging = true;
    dragStart.x = event.clientX;
    dragStart.y = event.clientY;
    // console.log("wp", wordPosition, "\nds", dragStart, "\ndd", dragDistance);
  }
});
window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    dragDistance.x = (dragStart.x - e.clientX) / scale;
    dragDistance.y = (dragStart.y - e.clientY) / scale;
    // console.log("wp", wordPosition, "\nds", dragStart, "\ndd", dragDistance);
  }
});
window.addEventListener("mouseup", (e) => {
  if (e.button == 2) {
    wordPosition.x -= dragDistance.x;
    wordPosition.y -= dragDistance.y;
    dragDistance.x = 0;
    dragDistance.y = 0;
    isDragging = false;
  }
});
canvas.addEventListener("click", (e) => {
  drawnElements.push({
    x: Math.floor((e.clientX / scale - wordPosition.x) / 10) * 10,
    y: Math.floor((e.clientY / scale - wordPosition.y) / 10) * 10,
    w: 10,
    h: 10,
  });
  // log the clicked tile
  console.log(
    Math.floor((e.clientX / scale - wordPosition.x) / 10),
    Math.floor((e.clientY / scale - wordPosition.y) / 10)
  );
});
window.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("wheel", (e) => {
  if (scale - e.deltaY / 100 < 1) scale = 1;
  else if (scale - e.deltaY / 100 > 5) scale = 5;
  else scale -= e.deltaY / 100;
  console.log(wordPosition.x, wordPosition.y, scale, e.clientX, e.clientY);
});

animate();
