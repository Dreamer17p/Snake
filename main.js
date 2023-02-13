let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const score = document.getElementById('score');
const interval = 500;
const intervalfood = 600;
let accumulator = 1;
let divs;
let idInterval;
let foodIndex;
let scoreCount = 0;

playButton.addEventListener('click', () => {
  startGame();
});

pauseButton.addEventListener('click', () => {
  alert('pausa')
});

//up
const up = () => {
    return accumulator = -size;
}
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    up()
  } 
});

//down
const down = () => {
    return accumulator = size
}
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowDown') {
    down()
  }
}
);

//left
const left = () =>{ 
    return accumulator = -1;
}
document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    left()
  }
});

// right
const right = () => { 
    return accumulator = 1;
}
document.addEventListener('keyup', (event) => {
  if(event.key === 'ArrowRight') {
    right() }
});

function createBox() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      box.appendChild(div);
    }
  }
}

function drawSnake() {
  divs = document.querySelectorAll('.box div');
  snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {
  const tail = snake.shift();
  divs[tail].classList.remove('snake');
  const head = snake[snake.length - 1] + accumulator;
  if (isCollision(head)) {
    alert('game over');
    clearGame();
    return;
  }


  snake.push(head);
  divs[head].classList.add('snake');

  // food
  eatFood(tail);
}

let idintervalfood;
function eatFood(tail) {
  if (snake[snake.length - 1] === foodIndex) {
    divs[foodIndex].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');
    // linea de velocidad
    idintervalfood = setInterval(() => {
      moveSnake()
    }, intervalfood); 
    ////
    score.innerText = ++scoreCount;
    randomFood();
  }
}

function isCollision(index) {
  if (
    index >= size * size
    || index < 0 
    || (accumulator === 1 && index % size === 0)
    || (accumulator === -1 && (index + 1) % size === 0)
  ) 
  {
    alert("game over"); 
    clearGame();
    return true;
  } 
  else if (snake.includes(index)) {
    clearGame();
    return true;
  }
  return false;
}

function startGame() {
  clearGame();
  idInterval = setInterval(() => {
    moveSnake();
  }, interval);
}

function clearGame() {
  snake = [0, 1, 2];
  box.innerHTML = '';
  accumulator = 1;
  scoreCount = 0;
  score.innerText = scoreCount;
  clearInterval(idInterval);
  clearInterval(idintervalfood);
  createBox();
  drawSnake();
  randomFood();
}

function randomFood() {
  foodIndex = Math.floor(Math.random() * divs.length);
  while (snake.includes(foodIndex)) {
    foodIndex = Math.floor(Math.random() * divs.length);
  }
  divs[foodIndex].classList.add('food');
}

clearGame();
