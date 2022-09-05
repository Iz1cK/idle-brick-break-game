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
          +document
            .getElementById(`${ball.name}BallPrice`)
            .textContent.split("$")[1],
          +document.getElementById("money").textContent.split(":")[1],
          +document.getElementById("money").textContent.split(":")[1] -
            +document
              .getElementById(`${ball.name}BallPrice`)
              .textContent.split("$")[1]
        );
        document.getElementById("money").textContent =
          "Money:" +
          (+document.getElementById("money").textContent.split(":")[1] -
            +document
              .getElementById(`${ball.name}BallPrice`)
              .textContent.split("$")[1]);
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
        document.getElementById("money").textContent =
          "Money:" +
          (+document.getElementById("money").textContent.split(":")[1] -
            +document
              .getElementById(`${ball.name}BallSpeedPrice`)
              .textContent.split("$")[1]);
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
        document.getElementById("money").textContent =
          "Money:" +
          (+document.getElementById("money").textContent.split(":")[1] -
            +document
              .getElementById(`${ball.name}BallPowerPrice`)
              .textContent.split("$")[1]);
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
