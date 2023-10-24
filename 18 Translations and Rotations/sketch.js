// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(225);
  drawBasicGrid(100);
  push();
  scale(5);
  translate(100, 100);
  clock(0, 0);
  pop();

  push();
  scale(5);
  rotate(radians(frameCount), 100, 100); 
  timeSec(100, 100);
  pop();
}

function clock(x, y){
  translate(x, y);
  ellipseMode(CENTER);
  ellipse(0,0,80,80);
  stroke(0);
  for (let a = 0; a < 360; a += 6){
    push();
    fill(255);
    rotate(radians(a));
    rect(x, y-40, 0.01, 5);
    pop();
  }
  for (let b = 0; b < 360; b += 30){
    push();
    fill(255);
    rotate(radians(b));
    rect(x, y-40, 0.1, 8);
    pop();
  }

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}

function timeSec(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(100);
  rect(x, y, 1, 45);

}