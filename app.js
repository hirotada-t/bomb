"use strict";
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);
const GRID = 40;
const STAGE = canvas.width / GRID;
class Snake {
    constructor(x, y) {
        this.dx = 1;
        this.dy = 1;
        this.x = x;
        this.y = y;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
    }
}
class Item {
    constructor() {
        this.x = Math.floor(Math.random() * STAGE);
        this.y = Math.floor(Math.random() * STAGE);
    }
    update() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * GRID, this.y * GRID, GRID, GRID);
    }
}
let snake = new Snake(0, 0);
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
const loop = () => {
    item.update();
    snake.update();
    if (snake.x < 0)
        snake.x = STAGE - 1;
    if (snake.y < 0)
        snake.y = STAGE - 1;
    if (snake.x > STAGE)
        snake.x = 0;
    if (snake.y > STAGE)
        snake.y = 0;
    if (snake.x === item.x && snake.y === item.y) {
        item.x = Math.floor(Math.random() * STAGE);
        item.y = Math.floor(Math.random() * STAGE);
    }
};
loop();
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
        case "h":
            snake.dx = -1;
            snake.dy = 0;
            loop();
            break;
        case "ArrowRight":
        case "l":
            snake.dx = 1;
            snake.dy = 0;
            loop();
            break;
        case "ArrowUp":
        case "k":
            snake.dx = 0;
            snake.dy = -1;
            loop();
            break;
        case "ArrowDown":
        case "j":
            snake.dx = 0;
            snake.dy = 1;
            loop();
            break;
    }
});
