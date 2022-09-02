var balls = [];
var blocks = [];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateBall(id) {
  let firstBallOfId = balls.find((ball) => ball.id == id);
  let newSpeedX = firstBallOfId?.speedx;
  let newSpeedY = firstBallOfId?.speedy;
  let power = firstBallOfId?.power;
  return new Ball(
    randomIntFromInterval(20, width - 20),
    20,
    id,
    newSpeedX,
    newSpeedY,
    power
  );
}

function speedUpBall(id) {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].id == id) {
      balls[i].speedx += balls[i].speedx > 0 ? 0.5 : -0.5;
      balls[i].speedy += balls[i].speedy > 0 ? 0.5 : -0.5;
    }
  }
}

function powerUpBall(id) {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].id == id) {
      balls[i].power += 5;
    }
  }
}

function setup() {
  createCanvas(848, 480);
  // for (let i = 0; i < 1; i++) {
  balls.push(generateBall(0));
  // }
  let level = blockCords[1];
  for (let i = 0; i < level.length; i++) {
    blocks[i] = new Block(level[i].x, level[i].y, level[i].id);
  }
  money = 0;

  document.getElementById("whiteBallsCount").addEventListener("click", () => {
    balls.push(generateBall(0));
    document.getElementById("whiteBallAmount").textContent =
      +document.getElementById("whiteBallAmount").textContent + 1;
  });
}

function draw() {
  background(25);
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].show();
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      let block = blocks[j];
      let ball = balls[i];
      ball.checkCollides(block);
    }
  }
}
