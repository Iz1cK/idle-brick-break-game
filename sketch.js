var balls = [];
var blocks = [];

let buttonsDiv;

let addRedBall;
let addGreenBall;
let addWhiteBall;

let speedUpRedBall;
let speedUpGreenBall;
let speedUpWhiteBall;

let powerUpRedBall;
let powerUpGreenBall;
let powerUpWhiteBall;

let moneyText;

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
  let blockCords = [
    { x: 50, y: 90, id: 0 },
    { x: 50, y: 130, id: 0 },
    { x: 50, y: 170, id: 0 },
    { x: 50, y: 210, id: 0 },
    { x: 50, y: 250, id: 0 },
    { x: 75, y: 50, id: 0 },
    { x: 75, y: 290, id: 0 },
    { x: 100, y: 50, id: 0 },
    { x: 125, y: 50, id: 0 },
    { x: 150, y: 50, id: 0 },
    { x: 175, y: 50, id: 2 },
    { x: 100, y: 290, id: 0 },
    { x: 125, y: 290, id: 0 },
    { x: 150, y: 290, id: 0 },
    { x: 175, y: 290, id: 0 },
    { x: 200, y: 90, id: 0 },
    { x: 200, y: 250, id: 0 },
    { x: 200, y: 210, id: 0 },
    { x: 175, y: 210, id: 0 },
    { x: 150, y: 210, id: 1 },
  ];
  for (let i = 0; i < blockCords.length; i++) {
    blocks[i] = new Block(blockCords[i].x, blockCords[i].y, blockCords[i].id);
  }
  money = 0;

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttonsDiv");

  addWhiteBall = document.createElement("button");
  addWhiteBall.textContent = "Add White Ball";
  addWhiteBall.addEventListener("click", () => balls.push(generateBall(0)));
  addWhiteBall.classList.add("addBall");

  addRedBall = document.createElement("button");
  addRedBall.textContent = "Add Red Ball";
  addRedBall.addEventListener("click", () => balls.push(generateBall(1)));
  addRedBall.classList.add("addBall");

  addGreenBall = document.createElement("button");
  addGreenBall.textContent = "Add Green Ball";
  addGreenBall.addEventListener("click", () => balls.push(generateBall(2)));
  addGreenBall.classList.add("addBall");

  addYellowBall = document.createElement("button");
  addYellowBall.textContent = "Add Yellow Ball";
  addYellowBall.addEventListener("click", () => balls.push(generateBall(3)));
  addYellowBall.classList.add("addBall");

  speedUpWhiteBall = document.createElement("button");
  speedUpWhiteBall.textContent = "Speed Up White Ball";
  speedUpWhiteBall.addEventListener("click", () => speedUpBall(0));
  speedUpWhiteBall.classList.add("addBall");

  speedUpGreenBall = document.createElement("button");
  speedUpGreenBall.textContent = "Speed Up Green Ball";
  speedUpGreenBall.addEventListener("click", () => speedUpBall(2));
  speedUpGreenBall.classList.add("addBall");

  speedUpRedBall = document.createElement("button");
  speedUpRedBall.textContent = "Speed Up Red Ball";
  speedUpRedBall.addEventListener("click", () => speedUpBall(1));
  speedUpRedBall.classList.add("addBall");

  speedUpYellowBall = document.createElement("button");
  speedUpYellowBall.textContent = "Speed Up Yellow Ball";
  speedUpYellowBall.addEventListener("click", () => speedUpBall(3));
  speedUpYellowBall.classList.add("addBall");

  powerUpWhiteBall = document.createElement("button");
  powerUpWhiteBall.textContent = "Power Up White Ball";
  powerUpWhiteBall.addEventListener("click", () => powerUpBall(0));
  powerUpWhiteBall.classList.add("addBall");

  powerUpGreenBall = document.createElement("button");
  powerUpGreenBall.textContent = "Power Up Green Ball";
  powerUpGreenBall.addEventListener("click", () => powerUpBall(2));
  powerUpGreenBall.classList.add("addBall");

  powerUpRedBall = document.createElement("button");
  powerUpRedBall.textContent = "Power Up Red Ball";
  powerUpRedBall.addEventListener("click", () => powerUpBall(1));
  powerUpRedBall.classList.add("addBall");

  powerUpYellowBall = document.createElement("button");
  powerUpYellowBall.textContent = "Power Up Yellow Ball";
  powerUpYellowBall.addEventListener("click", () => powerUpBall(3));
  powerUpYellowBall.classList.add("addBall");

  buttonsDiv.appendChild(addWhiteBall);
  buttonsDiv.appendChild(addYellowBall);
  buttonsDiv.appendChild(addGreenBall);
  buttonsDiv.appendChild(addRedBall);

  buttonsDiv.appendChild(speedUpWhiteBall);
  buttonsDiv.appendChild(speedUpYellowBall);
  buttonsDiv.appendChild(speedUpGreenBall);
  buttonsDiv.appendChild(speedUpRedBall);

  buttonsDiv.appendChild(powerUpWhiteBall);
  buttonsDiv.appendChild(powerUpYellowBall);
  buttonsDiv.appendChild(powerUpGreenBall);
  buttonsDiv.appendChild(powerUpRedBall);

  moneyText = document.createElement("span");
  moneyText.textContent = "Money:" + money;
  moneyText.id = "money";
  buttonsDiv.appendChild(moneyText);
  document.getElementById("controls").appendChild(buttonsDiv);
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
