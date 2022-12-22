const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const GRID = 40;
const STAGE = canvas.width / GRID;

class Player {
  x = 0;
  y = 0;
  img = new Image();
  constructor() {
    this.img.src = "trump.png";
  }
  update() {
    ctx.save();
    ctx.drawImage(this.img, this.x * GRID + 5, this.y * GRID + 5, 30, 30);
    ctx.restore();
  }
}

class Item {
  x = Math.floor(Math.random() * STAGE);
  y = Math.floor(Math.random() * STAGE);
  constructor() {}
  update() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
  }
}

let player = new Player();
let item = new Item();

const glidLine = () => {
  for (let i = 0; i < STAGE - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, GRID * (i + 1) - 1);
    ctx.lineTo(canvas.width, GRID * (i + 1) - 1);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(GRID * (i + 1) - 1, 0);
    ctx.lineTo(GRID * (i + 1) - 1, canvas.width);
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

glidLine();
player.img.onload = () => player.update();
item.update();

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  item.update();
  player.update();
  glidLine();

  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x >= STAGE) player.x = STAGE - 1;
  if (player.y >= STAGE) player.y = STAGE - 1;

  if (player.x === item.x && player.y === item.y) {
    item.x = Math.floor(Math.random() * STAGE);
    item.y = Math.floor(Math.random() * STAGE);
  }
};

setInterval(loop, 1000 / 15);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "h":
      
    player.x += -1;
    player.y += 0;
      break;
    case "ArrowRight":
    case "l":
      player.x += 1;
      player.y += 0;
      break;
    case "ArrowUp":
    case "k":
      player.x += 0;
      player.y += -1;
      break;
    case "ArrowDown":
    case "j":
      player.x += 0;
      player.y += 1;
      break;
  }
});
