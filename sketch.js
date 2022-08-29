let balls = [];
let blocks = [];

let buttonsDiv;

let addRedBall;
let addGreenBall;
let addWhiteBall;

let moneyText;
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  createCanvas(848, 480);
  for (let i = 0; i < 20; i++) {
    balls[i] = new Ball(randomIntFromInterval(20, width - 20), height - 20, 0);
  }
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
  addWhiteBall.addEventListener("click", () => {
    balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 0));
  });
  addWhiteBall.classList.add("addBall");
  buttonsDiv.appendChild(addWhiteBall);

  addRedBall = document.createElement("button");
  addRedBall.textContent = "Add Red Ball";
  addRedBall.addEventListener("click", () => {
    balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 1));
  });
  addRedBall.classList.add("addBall");
  buttonsDiv.appendChild(addRedBall);

  addGreenBall = document.createElement("button");
  addGreenBall.textContent = "Add Green Ball";
  addGreenBall.addEventListener("click", () => {
    balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 2));
  });
  addGreenBall.classList.add("addBall");
  buttonsDiv.appendChild(addGreenBall);

  addYellowBall = document.createElement("button");
  addYellowBall.textContent = "Add Yellow Ball";
  addYellowBall.addEventListener("click", () => {
    balls.push(new Ball(randomIntFromInterval(20, width - 20), 20, 3));
  });
  addYellowBall.classList.add("addBall");
  buttonsDiv.appendChild(addYellowBall);

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
