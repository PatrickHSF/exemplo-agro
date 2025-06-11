let player;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  player = new Player();
  frameRate(60);
}

function draw() {
  background(30);

  if (!gameOver) {
    player.update();
    player.show();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
      score++;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].hits(player)) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    fill(255);
    textSize(20);
    text("Score: " + score, 10, 30);
  } else {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Score: " + score, width / 2, height / 2 + 30);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

class Player {
  constructor() {
    this.w = 40;
    this.h = 40;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 7;
  }

  move(dir) {
    this.x += dir * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  update() {}

  show() {
    fill(0, 200, 255);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Obstacle {
  constructor() {
    this.w = random(30, 70);
    this.h = 20;
    this.x = random(0, width - this.w);
    this.y = -this.h;
    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 100, 100);
    rect(this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.y > height;
  }

  hits(player) {
    return (
      player.x < this.x + this.w &&
      player.x + player.w > this.x &&
      player.y < this.y + this.h &&
      player.y + player.h > this.y
    );
  }
}
