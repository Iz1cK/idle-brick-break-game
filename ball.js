function Ball(x, y, id) {
  this.x = x;
  this.y = y;
  this.speedx = id == 0 ? 2 : id == 1 ? 1 : id == 2 ? 1.25 : id == 3 ? 1.1 : 2;
  this.speedy = id == 0 ? 2 : id == 1 ? 1 : id == 2 ? 1.25 : id == 3 ? 1.1 : 2;
  this.speed = Math.sqrt(8);
  this.power = id == 0 ? 5 : id == 1 ? 10 : id == 2 ? 1.5 : id == 3 ? 0.39 : 5;
  this.id = id;

  this.show = () => {
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(0, 0, 0);
    switch (this.id) {
      case 0:
        fill(255);
        break;
      case 1:
        fill(255, 0, 0);
        break;
      case 2:
        fill(0, 255, 0);
        break;
      case 3:
        fill(255, 255, 0);
        break;
    }
    ellipse(this.x, this.y, 16, 16);
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.x >= width - 8 || this.x <= 8) {
      this.speedx *= -1;
    }
    if (this.y <= 8 || this.y >= height - 8) {
      this.speedy *= -1;
    }
  };

  this.checkCollides = (block) => {
    if (
      circleRect(
        this.x,
        this.y,
        16,
        block.x,
        block.y,
        block.width,
        block.height
      ) &&
      block.alive
    ) {
      if (
        this.x >= block.x + block.width &&
        this.y >= block.y &&
        this.y <= block.y + block.height
      ) {
        console.log("right");
        this.speedx *= -1;
        this.x += 5;
      } else if (
        this.x <= block.x &&
        this.y >= block.y &&
        this.y <= block.y + block.height
      ) {
        console.log("left");
        this.speedx *= -1;
        this.x -= 5;
      } else if (
        this.y <= block.y &&
        this.x >= block.x &&
        this.x <= block.x + block.width
      ) {
        console.log("top");
        this.speedy *= -1;
        this.y -= 5;
      } else if (
        this.y >= block.y &&
        this.x >= block.x &&
        this.x <= block.x + block.width
      ) {
        console.log("bottom");
        this.speedy *= -1;
        this.y += 5;
      }
      if (this.id == 0 || this.id == 1) {
        block.health -= Math.round(
          block.poisoned ? this.power * 1.25 : this.power
        );
      }
      if (this.id == 2) {
        block.poisoned = true;
      }
      if (this.id == 3) {
        document.getElementById("money").textContent =
          "Money:" +
          (parseInt(
            document.getElementById("money").textContent.split(":")[1]
          ) +
            Math.round(block.health * this.power));
      }
      if (block.health <= 0) {
        console.log(1, document.getElementById("money").textContent);
        document.getElementById("money").textContent =
          "Money:" +
          (parseInt(
            document.getElementById("money").textContent.split(":")[1]
          ) +
            this.power);
        block.alive = false;
      }
    }
  };
}

let circleRect = function (cx, cy, radius, rx, ry, rw, rh) {
  let testX = cx;
  let testY = cy;

  if (cx < rx) testX = rx;
  else if (cx > rx + rw) testX = rx + rw;
  if (cy < ry) testY = ry;
  else if (cy > ry + rh) testY = ry + rh;

  let distX = cx - testX;
  let distY = cy - testY;
  let distance = sqrt(distX * distX + distY * distY);

  return distance <= radius - 8;
};
