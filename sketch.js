var sketch = (function () {
  var balls = [];
  var blocks = [];
  var ballTypes = [
    {
      name: "white",
      id: 0,
      count: 1,
      price: 10,
      speed: 2,
      speedFunc: (level) => -10 / (1 + Math.exp(level / 5 - 3)) + 10,
      speedPrice: 10,
      power: 5,
      powerPrice: 10,
    },
    {
      name: "red",
      id: 1,
      count: 0,
      price: 150,
      speed: 1,
      speedFunc: (level) => -10 / (1 + Math.exp(level / 7 - 3)) + 10,
      speedPrice: 100,
      power: 10,
      powerPrice: 100,
    },
    {
      name: "green",
      id: 2,
      count: 0,
      price: 1500,
      speed: 1.25,
      speedFunc: (level) => -10 / (1 + Math.exp(level / 9 - 3)) + 10,
      speedPrice: 1000,
      power: 1.5,
      powerPrice: 1000,
    },
    {
      name: "yellow",
      id: 3,
      count: 0,
      price: 10000,
      speed: 1.1,
      speedFunc: (level) => -10 / (1 + Math.exp(level / 11 - 3)) + 10,
      speedPrice: 5000,
      power: 0.1,
      powerPrice: 5000,
    },
  ];

  var money = 0;
  const MAX_BALL_COUNT = 25;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function intializeFields() {
    ballTypes.forEach((ball) => {
      document.getElementById(`${ball.name}BallAmount`).textContent =
        ball.id == 0 ? 1 : 0;
      document.getElementById(`${ball.name}BallPrice`).textContent =
        "$" + ball.price;
      document.getElementById(`${ball.name}BallSpeed`).textContent = ball.speed;
      document.getElementById(`${ball.name}BallSpeedPrice`).textContent =
        "$" + ball.speedPrice;
      document.getElementById(`${ball.name}BallPower`).textContent = ball.power;
      document.getElementById(`${ball.name}BallPowerPrice`).textContent =
        "$" + ball.powerPrice;
      document
        .getElementById(`${ball.name}BallsCount`)
        .addEventListener("click", () => {
          if (balls.length >= MAX_BALL_COUNT) return null;
          if (
            +document
              .getElementById(`${ball.name}BallPrice`)
              .textContent.split("$")[1] > money
          ) {
            return null;
          }
          balls.push(generateBall(ball.id));
          ball.count++;
          ball.price += 10;
          money -= +document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split("$")[1];
          document.getElementById(`${ball.name}BallAmount`).textContent =
            ball.count;
          document.getElementById(`${ball.name}BallPrice`).textContent =
            "$" + ball.price;
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
          ball.speed += 0.5;
          money -= +document
            .getElementById(`${ball.name}BallSpeedPrice`)
            .textContent.split("$")[1];
          document.getElementById(`${ball.name}BallSpeed`).textContent =
            ball.speed;
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
          money -= +document
            .getElementById(`${ball.name}BallPowerPrice`)
            .textContent.split("$")[1];
          let newPow = powerUpBall(ball.id);
          document.getElementById(`${ball.name}BallPowerPrice`).textContent =
            `$` +
            (+document
              .getElementById(`${ball.name}BallPowerPrice`)
              .textContent.split(`$`)[1] +
              10);
          document.getElementById(`${ball.name}BallPower`).textContent =
            newPow.toFixed(2);
        });
    });
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
    let newPower = null;
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].id == id) {
        switch (balls[i].id) {
          case 0:
            balls[i].power += 5;
            break;
          case 1:
            balls[i].power += 10;
            break;
          case 2:
            balls[i].power += 0.5;
            break;
          case 3:
            balls[i].power += 0.1;
            break;
        }
      }
      newPower = balls[i].power;
    }
    return newPower;
  }

  function setupLevel(id = 1) {
    let level = blockCords[id];
    for (let i = 0; i < level.length; i++) {
      blocks[i] = new Block(level[i].x, level[i].y, level[i].id);
    }
  }

  function setup() {
    createCanvas(848, 480);
    // balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 0, 2, 2, 5));
    setupLevel();
    document.getElementById("money").textContent = "Money:$" + money;
    intializeFields();
    console.log("speedFunc(1): ", ballTypes[0].speedFunc(1));
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
          money += 10;
          block.alive = false;
        }
      }
    });
  }

  function draw() {
    background(25);
    document.getElementById("money").textContent =
      "Money:$" + formatter.format(money);
    document.getElementById("allBallsCount").textContent =
      "Balls:" + balls.length;
    if (blocks.length == 0) {
      setupLevel(0);
    }
    for (let i = 0; i < blocks.length; i++) {
      if (!blocks[i].alive) {
        blocks.splice(i, 1);
        continue;
      }
      blocks[i].show();
    }
    for (let i = 0; i < balls.length; i++) {
      balls[i].show();
    }
    //checking for collisions 5 times per draw
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
          .textContent.split("$")[1] > money ||
        balls.length >= MAX_BALL_COUNT
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
          .textContent.split("$")[1] > money ||
        ball.count == 0
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
          .textContent.split("$")[1] > money ||
        ball.count == 0
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
  return {
    setup: setup,
    draw: draw,
    mousePressed: mousePressed,
    money,
  };
})();

function setup() {
  sketch.setup();
}

function draw() {
  sketch.draw();
}

function mousePressed() {
  sketch.mousePressed();
}
