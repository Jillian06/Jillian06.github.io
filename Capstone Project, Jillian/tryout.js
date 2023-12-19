// Nausicaa
// Jillian
// 2023.12.11

let gameStart;
let nausicaa;
// let starter = 8;
let ifGameStart = false;
let runFront, runFrontMask, runLeft, runLeftMask, runRight, runRightMask, runBack;
let gameMap;

function setup() {
  createCanvas(2388, 1668);
  nausicaa = new Sprite(250, 80, 120);
  gameStart = loadAni("gameStart/IMG_01.png", 21);
  loadplayerRun();
  // testingBall();
}

function loadplayerRun(){
  nausicaa.addAni("down", "playerRun/IMG_runFront.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("left", "playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("right", "playerRun/IMG_runRight.png", { frameSize: [256, 256], frames: 4 });
  nausicaa.addAni("up", "playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
}

function draw() {
  clear();
  testingBall();
  ballClicked();
  nausicaa.debug = mouse.pressing();
  if(kb.pressing("left")){
    nausicaa.changeAni("left");
    nausicaa.x -= 2;
  }
  else if(kb.pressing("right")){
    nausicaa.changeAni("right");
    nausicaa.x += 2;
  }
  else if(kb.pressing("down")){
    nausicaa.changeAni("down");
    nausicaa.y += 2;
  }
  else if(kb.pressing("up")){
    nausicaa.changeAni("up");
    nausicaa.y -= 2;
  }
  if (kb.pressing('space')){
    nausicaa.ani.stop();
} else {
    nausicaa.ani.play();
}
  // clear();
  // pressStart();
  // if(ifGameStart === false){
  // animation(gameStart, 1194, 834);
  // }
  // pressStart();
  if(ifGameStart === true){
    // image(gameMap, 0, 0);
    // playerRun();
    // testingBall();
  }
  // }
  // else{
  // playerRun();
  // }
}

function playerRun(){
  if(keyIsPressed === true && keyCode === ENTER){
    scale(0.3);
    animation(runFrontMask, 2500, 2500);
  }
  if(keyIsPressed === true && keyCode === DOWN_ARROW){
    scale(0.3);
    animation(runFront, 2500, 2500);
  }
  else if(keyIsPressed === true && keyCode === UP_ARROW){
    scale(0.3);
    animation(runBack, 2500, 2500);
  }
  else if(keyIsPressed === true && keyCode === LEFT_ARROW){
    scale(0.3);
    animation(runLeft, 2500, 2500);
  }
  else if(keyIsPressed === true && keyCode === RIGHT_ARROW){
    scale(0.3);
    animation(runRight, 2500, 2500);
  }

}

function pressStart(){
  // if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
  //   timer --;
  // }
  // textSize(60);
  fill(255);
  textFont('Courier New', 60);
  stroke(0);
  strokeWeight(4);
  text('Press ENTER to Start the Game', 1350, 1660);
  // if(ifGameStart === true){
  //   gameBegin();
  // }
}

function keyPressed(){
  if(ifGameStart === false && keyCode === ENTER){
    ifGameStart = true;
  }
}

function preload(){
  gameMap = loadImage("gameMap/gameMap.png");
}

// function gameBegin(){
//   image(gameMap, 0, 0, 2388, 1668);
// }

function gameBegin(){
  createCanvas(2388, 1668);
  gameMap = createGraphics(gameMap, 0, 0, 2388, 1668);
}

function testingBall(){
  fill(255);
  circle(200, 200, 100);
}

function ballClicked(){
  if(keyPressed && keyCode === ENTER ){
  
  // && 0 < mouseX < 1000 && 0 < mouseY < 1000 ){
    fill(255, 0, 0);
    rect(100, 100, 200, 10);
    for(let i = 0; i < 10; i ++){
      if(keyPressed && keyCode === SPACE){
        fill(0);
        rect(300, 100, 200 - i, 10);
      }
    }
  }
}


// function draw() {
//   //background(0);
//   animation(gameStart, 250, 80);
//   //image(gameStart, mouseX,mouseY);
// }


// let cloudAni;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   cloudAni = loadAni('gameStart/IMG_01.png', 9);
// }

// function draw() {
//   background(220);
//   clear();
//   animation(cloudAni, width/2, height/2);
// }
