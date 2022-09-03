var balls = [];
var blocks = [];
var ballTypes = [
  { name: "white", id: 0 },
  { name: "red", id: 1 },
  { name: "green", id: 2 },
  { name: "yellow", id: 3 },
];
var money = 0;

function intializeFields() {
  ballTypes.forEach((ball) => {
    document.getElementById(`${ball.name}BallAmount`).textContent =
      ball.id == 0 ? 1 : 0;
    document.getElementById(`${ball.name}BallSpeed`).textContent =
      ball.id == 0
        ? 2
        : ball.id == 1
        ? 1
        : ball.id == 2
        ? 1.25
        : ball.id == 3
        ? 1.1
        : 2;
    document.getElementById(`${ball.name}BallPower`).textContent =
      ball.id == 0
        ? 5
        : ball.id == 1
        ? 10
        : ball.id == 2
        ? 1.5
        : ball.id == 3
        ? 0.39
        : 5;
    document
      .getElementById(`${ball.name}BallsCount`)
      .addEventListener("click", () => {
        if (
          +document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split("$")[1] > money
        ) {
          return null;
        }
        balls.push(generateBall(ball.id));
        console.log(
          document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split("$")[1]
        );
        document.getElementById("money").textContent =
          "Money:" +
          document.getElementById("money").textContent.split(":")[1] +
          +document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split("$")[1];
        document.getElementById(`${ball.name}BallAmount`).textContent =
          +document.getElementById(`${ball.name}BallAmount`).textContent + 1;
        document.getElementById(`${ball.name}BallPrice`).textContent =
          "$" +
          (+document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split(`$`)[1] +
            10);
      });
    document
      .getElementById(`${ball.name}BallsSpeed`)
      .addEventListener(`click`, () => {
        if (
          +document
            .getElementById(`${ball.name}BallSpeedPrice`)
            .textContent.split("$")[1] > money
        ) {
          return null;
        }
        document.getElementById("money").textContent -=
          "Money:" +
          +document
            .getElementById(`${ball.name}BallSpeedPrice`)
            .textContent.split("$")[1];
        document.getElementById(`${ball.name}BallSpeed`).textContent =
          +document.getElementById(`${ball.name}BallSpeed`).textContent + 0.5;
        document.getElementById(`${ball.name}BallSpeedPrice`).textContent =
          `$` +
          (+document
            .getElementById(`${ball.name}BallSpeedPrice`)
            .textContent.split(`$`)[1] +
            10);
        speedUpBall(ball.id);
      });
    document
      .getElementById(`${ball.name}BallsPower`)
      .addEventListener(`click`, () => {
        if (
          +document
            .getElementById(`${ball.name}BallPowerPrice`)
            .textContent.split("$")[1] > money
        ) {
          return null;
        }
        document.getElementById("money").textContent -=
          "Money:" +
          +document
            .getElementById(`${ball.name}BallPowerPrice`)
            .textContent.split("$")[1];
        powerUpBall(ball.id);
        document.getElementById(`${ball.name}BallPowerPrice`).textContent =
          `$` +
          (+document
            .getElementById(`${ball.name}BallPowerPrice`)
            .textContent.split(`$`)[1] +
            10);
        document.getElementById(`${ball.name}BallPower`).textContent =
          +document.getElementById(`${ball.name}BallPower`).textContent + 5;
      });
  });
}

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

  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      let block = blocks[j];
      let ball = balls[i];
      ball.checkCollides(block);
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
