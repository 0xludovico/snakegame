const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 10;
let snake = [{ x: 150, y: 150 }];
let direction = "right";
let food = createFood();
let score = 0;

function createFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

function drawFood() {
    ctx.fillStyle = "#00F";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach(segment => {
        ctx.fillStyle = "#00F";
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
    drawFood();
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

function updateSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= gridSize;
            break;
        case "down":
            head.y += gridSize;
            break;
        case "left":
            head.x -= gridSize;
            break;
        case "right":
            head.x += gridSize;
            break;
    }

    if (checkCollision(head, food)) {
        snake.unshift({ ...food });
        food = createFood();
        score += 100;
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

function checkCollision(head, food) {
    return head.x === food.x && head.y === food.y;
}

function handleKeydown(event) {
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
}

function gameLoop() {
    updateSnake();
    drawSnake();
}

document.addEventListener("keydown", handleKeydown);
setInterval(gameLoop, 100);
