var balls = [];
var blocks = [];
var ballTypes = [
  { name: "white", id: 0 },
  { name: "red", id: 1 },
  { name: "green", id: 2 },
  { name: "yellow", id: 3 },
];
var money = 0;

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
  balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 0, 2, 2, 5));
  let level = blockCords[1];
  for (let i = 0; i < level.length; i++) {
    blocks[i] = new Block(level[i].x, level[i].y, level[i].id);
  }
  document.getElementById("money").textContent = "Money:" + money;
  intializeFields();
}

function mousePressed() {
  blocks.forEach((block) => {
    if (!block.alive) return;
    if (
      mouseX >= block.x &&
      mouseX <= block.x + block.width &&
      mouseY >= block.y &&
      mouseY <= block.y + block.height
    ) {
      block.health -= 1;
      if (block.health <= 0) {
        document.getElementById("money").textContent =
          "Money:" +
          (parseInt(
            document.getElementById("money").textContent.split(":")[1]
          ) +
            10);
        block.alive = false;
      }
    }
  });
}

function draw() {
  background(25);
  money = +document.getElementById("money").textContent.split(":")[1];
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].show();
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
  }
  for (let m = 0; m < 5; m++) {
    //checking for collisions 5 times per draw
    for (let i = 0; i < balls.length; i++) {
      for (let j = 0; j < blocks.length; j++) {
        let block = blocks[j];
        let ball = balls[i];
        ball.checkCollides(block);
      }
    }
  }

  ballTypes.forEach((ball) => {
    if (
      +document
        .getElementById(`${ball.name}BallPrice`)
        .textContent.split("$")[1] > money
    ) {
      document
        .getElementById(`${ball.name}BallsCount`)
        .classList.add("cantAfford");
    } else {
      document
        .getElementById(`${ball.name}BallsCount`)
        .classList.remove("cantAfford");
    }
    if (
      +document
        .getElementById(`${ball.name}BallSpeedPrice`)
        .textContent.split("$")[1] > money
    ) {
      document
        .getElementById(`${ball.name}BallsSpeed`)
        .classList.add("cantAfford");
    } else {
      document
        .getElementById(`${ball.name}BallsSpeed`)
        .classList.remove("cantAfford");
    }
    if (
      +document
        .getElementById(`${ball.name}BallPowerPrice`)
        .textContent.split("$")[1] > money
    ) {
      document
        .getElementById(`${ball.name}BallsPower`)
        .classList.add("cantAfford");
    } else {
      document
        .getElementById(`${ball.name}BallsPower`)
        .classList.remove("cantAfford");
    }
  });
}
