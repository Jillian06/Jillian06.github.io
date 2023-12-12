// Nausicaa
// Jillian
// 2023.12.11

let gameStart;
// let starter = 8;
let ifGameStart = false;
let runFront, runFrontMask, runLeft, runLeftMask, runRight, runRightMask, runBack;

function setup() {
  createCanvas(2388, 1668);
  gameStart = loadAni("gameStart/IMG_01.png", 21);
  loadplayerRun();
}

function loadplayerRun(){
  runFront = loadAni("playerRun/IMG_runFront.png", { frameSize: [256, 256], frames: 4 });
  runFrontMask = loadAni("playerRun/IMG_runFrontMask.png", { frameSize: [256, 256], frames: 4 });
  runLeft = loadAni("playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
  runLeftMask = loadAni("playerRun/IMG_runLeftMask.png", { frameSize: [256, 256], frames: 4 });
  runRight = loadAni("playerRun/IMG_runRight.png", { frameSize: [256, 256], frames: 4 });
  runRightMask = loadAni("playerRun/IMG_runRightMask.png", { frameSize: [256, 256], frames: 4 });
  runBack = loadAni("playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
}

function draw() {
  clear();
  // pressStart();
  if(ifGameStart === false){
    animation(gameStart, 1194, 834);
    pressStart();
  }
  else{
    playerRun();
  }
}

function playerRun(){
  if(keyIsPressed === true && keyCode === ENTER){
    clear();
    animation(runFrontMask, 100, 100);
  }
  if(keyIsPressed === true && keyCode === DOWN_ARROW){
    clear();
    animation(runFront, 100, 100);
  }
  else if(keyIsPressed === true && keyCode === UP_ARROW){
    clear();
    animation(runBack, 100, 100);
  }
  else if(keyIsPressed === true && keyCode === LEFT_ARROW){
    clear();
    animation(runLeft, 100, 100);
  }
  else if(keyIsPressed === true && keyCode === RIGHT_ARROW){
    clear();
    animation(runRight, 100, 100);
  }

}

function pressStart(){
  // if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
  //   timer --;
  // }
  textSize(60);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text('Press ENTER to Start the Game', 1350, 1660);
  if(ifGameStart === true){
    gameBegin();
  }
}

function keyPressed(){
  if(ifGameStart === false && keyCode === ENTER){
    ifGameStart = true;
  }
}

function gameBegin(){
  clear();
  rect(30, 20, 55, 55);
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

