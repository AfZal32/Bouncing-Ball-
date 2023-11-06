const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");
const bounceCountElement = document.getElementById("bounceCount");

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  dx: 5,
  dy: 5,
};

let bounceCount = 0;

function drawBall() {
  const ballImage = new Image();
  ballImage.src = "ball.jpg"; 
  ctx.drawImage(
    ballImage,
    ball.x - ball.radius,
    ball.y - ball.radius,
    ball.radius * 2,
    ball.radius * 2
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();

  if (ball.x + ball.radius + ball.dx > canvas.width || ball.x - ball.radius + ball.dx < 0) {
    ball.dx = -ball.dx;
    bounceCount++;
  }
  if (ball.y + ball.radius + ball.dy > canvas.height || ball.y - ball.radius + ball.dy < 0) {
    ball.dy = -ball.dy;
    bounceCount++;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  bounceCountElement.innerText = "Bounce Count: " + bounceCount;

  requestAnimationFrame(update);
  
}


canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  ball.x = clickX;
  ball.y = clickY;
});

resetButton.addEventListener("click", () => {
  bounceCount = 0;
  bounceCountElement.innerText = "Bounce Count: " + bounceCount;
});

update();