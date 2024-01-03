// Nausicaa
// Jillian
// 2023.12.11

// setup github and VS code at home
let gameStart;
let nausicaa;
let ifGameStart = false;
let runFront, runLeft, runRight, runBack;
let gameMap;
let ballAnimation = false;
let ballAnimationWidth = 0;

function setup() {
  createCanvas(2388, 1668);
  gameStart = loadAni("gameStart/IMG_01.png", 21);
  nausicaa = new Sprite(250, 80, 120);
  loadplayerRun();
}

function loadplayerRun() {
  nausicaa.addAni("down", "playerRun/IMG_runFront.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("left", "playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("right", "playerRun/IMG_runRight.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("up", "playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
}

function preload() {
  gameMap = loadImage("gameMap/gameMap.png");
  textFont1 = loadFont('textFont/8-bitanco.ttf');
}

function draw() {
  // clear();
  testingBall();
  ballClicked();
  if (ifGameStart === false) {
    animation(gameStart, 1194, 834);
    pressStart();
  }
  else if (ifGameStart === true) {
    image(gameMap, 0, 0);
    playerRun();
    testingBall();
    nausicaa.debug = mouse.pressing();
    if (kb.pressing("left")) {
      nausicaa.changeAni("left");
      nausicaa.x -= 2;
    }
    else if (kb.pressing("right")) {
      nausicaa.changeAni("right");
      nausicaa.x += 2;
    }
    else if (kb.pressing("down")) {
      nausicaa.changeAni("down");
      nausicaa.y += 2;
    }
    else if (kb.pressing("up")) {
      nausicaa.changeAni("up");
      nausicaa.y -= 2;
    }
    if (kb.pressing('space')) {
      nausicaa.ani.stop();
    }
    else {
      nausicaa.ani.play();
    }
  }
}

function playerRun() {
  if (keyIsPressed === true && keyCode === DOWN_ARROW) {
    scale(0.3);
    animation(runFront, 2500, 2500);
  }
  else if (keyIsPressed === true && keyCode === UP_ARROW) {
    scale(0.3);
    animation(runBack, 2500, 2500);
  }
  else if (keyIsPressed === true && keyCode === LEFT_ARROW) {
    scale(0.3);
    animation(runLeft, 2500, 2500);
  }
  else if (keyIsPressed === true && keyCode === RIGHT_ARROW) {
    scale(0.3);
    animation(runRight, 2500, 2500);
  }
}

function pressStart() {
  fill(255);
  textFont(textFont1, 60);
  stroke(0);
  strokeWeight(4);
  text('Press ENTER to Start the Game', 1300, 1600);
  if (ifGameStart === true) {
    gameBegin();
  }
}

function keyPressed() {
  if (ifGameStart === false && keyCode === ENTER) {
    ifGameStart = true;
  }
}

function testingBall() {
  fill(255);
  circle(200, 200, 100);
}

function ballClicked() {
  if (keyPressed && keyCode === ENTER) {
    fill(255, 0, 0);
    rect(100, 100, 200, 10);
  }
  if (keyIsPressed && keyCode === CONTROL && ballAnimation === false) {
    if (ballAnimationWidth <= 0) {
      ballAnimationWidth = 200;
    }
    else if (ballAnimationWidth > 0) {
      ballAnimationWidth -= 5;
    }
    else {
      ballAnimation = 0;
    }
  }
  fill(255, 0, 0);
  rect(100, 100, ballAnimationWidth, 10);
}
