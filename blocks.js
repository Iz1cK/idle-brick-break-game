function Block(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
  this.width = this.id == 0 ? 32 : this.id == 1 ? 56 : this.id == 2 ? 62 : 20;
  this.height = this.id == 0 ? 20 : this.id == 1 ? 35 : this.id == 2 ? 38 : 12;
  this.alive = true;
  this.health =
    this.id == 0 ? 50 : this.id == 1 ? 200 : this.id == 2 ? 1000 : 50;
  this.color =
    id == 0
      ? color(0, 255, 0)
      : id == 1
      ? color(0, 0, 255)
      : id == 2
      ? color(255, 0, 0)
      : this.color(0, 255, 0);

  this.show = () => {
    if (this.alive) {
      fill(25);
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = this.color;
      console.log(this.width, this.height, this.id);
      stroke(this.color);
      rect(this.x, this.y, this.width, this.height);
      stroke(0);
      drawingContext.shadowBlur = 0;
      drawingContext.shadowColor = this.color;
      textFont("Georgia");
      textAlign(CENTER);
      // rectMode(CENTER);
      fill(255);
      textSize(12);
      text(this.health, this.x + this.width / 2, this.y + this.height / 2);
    }
  };
}
