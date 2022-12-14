function Ball(
  x,
  y,
  id,
  sx = id == 0 ? 2 : id == 1 ? 1 : id == 2 ? 1.25 : id == 3 ? 1.1 : 2,
  sy = id == 0 ? 2 : id == 1 ? 1 : id == 2 ? 1.25 : id == 3 ? 1.1 : 2,
  pow = id == 0 ? 5 : id == 1 ? 10 : id == 2 ? 1.5 : id == 3 ? 0.1 : 5
) {
  this.x = x;
  this.y = y;
  this.speedx = sx;
  this.speedy = sy;
  this.power = pow;
  this.id = id;
  this.history = [];

  this.show = () => {
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = color(0, 0, 0);
    noStroke();

    if (this.history.length > 5) {
      this.history.shift();
    }
    for (let i = 1; i < this.history.length; i++) {
      switch (this.id) {
        case 0:
          fill(`rgba(255, 255, 255, ${i / 5})`);
          break;
        case 1:
          fill(`rgba(255, 0, 0, ${i / 5})`);
          break;
        case 2:
          fill(`rgba(0, 255, 0, ${i / 5})`);
          break;
        case 3:
          fill(`rgba(255, 255, 0, ${i / 5})`);
          break;
      }
      ellipse(this.history[i].x, this.history[i].y, 16, 16);
    }
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

    this.history.push({ x: this.x, y: this.y });

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
        this.speedx *= -1;
        this.x += 4;
      } else if (
        this.x <= block.x &&
        this.y >= block.y &&
        this.y <= block.y + block.height
      ) {
        this.speedx *= -1;
        this.x -= 4;
      } else if (
        this.y <= block.y &&
        this.x >= block.x &&
        this.x <= block.x + block.width
      ) {
        this.speedy *= -1;
        this.y -= 4;
      } else if (
        this.y >= block.y &&
        this.x >= block.x &&
        this.x <= block.x + block.width
      ) {
        this.speedy *= -1;
        this.y += 4;
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
        sketch.money += Math.round(block.health * this.power);
      }
      if (block.health <= 0) {
        sketch.money += this.power;
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
