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
