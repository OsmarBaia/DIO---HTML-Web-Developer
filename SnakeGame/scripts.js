//Variaveis do BG
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
// Variaveis da cobrinha
let snake = [];

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";

function randomPosition() {
  return Math.floor(Math.random() * 15 + 1) * box;
}

//  Variaveis comida
let food = {
  x: randomPosition(),
  y: randomPosition(),
};

/**
 * It creates a light green background for the canvas
 */
function drawBackground() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

/**
 * It loops through the snake array and draws a green rectangle for each element in the array
 */
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Spammar Comida
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

//  Controles
document.addEventListener("keydown", playerInput);

function playerInput(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";

  event.preventDefault();
}

// Reposicionamento da cobrinha no frame
function snake_translateSides() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
}

function snake_changeDirection() {
  //    Posição Atual da cabeça
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //    Muda a direnção do quadradinho atual
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  //    Remove o ultimo quadrado da calda
  //snake.pop();
  snakeSize(snakeX, snakeY);

  //    Cria uma nova posição 'cabeça'
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

function snakeSize(x, y) {
  if (x != food.x || y != food.y) {
    //  Remove o ultimo quadrado da calda
    snake.pop();
  } else {
    //  Aumenta a cobrinha e spamma comida
    food.x = randomPosition();
    food.y = randomPosition();
  }
}

//  Loop de Jogo
function gameLoop() {
  snake_translateSides();
  gameOver();

  drawBackground();
  drawSnake();
  drawFood();

  snake_changeDirection();
}

function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert("Game Over! =(");
    }
  }
}

let game = setInterval(gameLoop, 100);
