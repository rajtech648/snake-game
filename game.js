const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let count = 0;
let score = 0;
const scoreEl = document.getElementById("score");

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

let food = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++count < 4) return;
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) snake.x = canvas.width - grid;
  if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  ctx.fillStyle = "#0f0";
  snake.cells.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;
      score++;
      scoreEl.innerText = score;
      food.x = getRandomInt(0, 20) * grid;
      food.y = getRandomInt(0, 20) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        alert("Game Over! Final Score: " + score);
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        score = 0;
        scoreEl.innerText = score;
        food.x = getRandomInt(0, 20) * grid;
        food.y = getRandomInt(0, 20) * grid;
      }
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(gameLoop);
