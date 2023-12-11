// Nausicaa
// Jillian
// 2023.12.11

let gameStart;

function setup() {
  createCanvas(2388, 1668);
  gameStart = loadAni('gameStart/IMG_01.png', 21);
}

function draw() {
  clear();
  // pressStart();
  animation(gameStart, 1194, 834);
  pressStart();
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

