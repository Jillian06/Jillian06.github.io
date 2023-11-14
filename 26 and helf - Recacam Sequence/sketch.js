// Recaman Sequence
// Jillian Yang
// Nov 14, 2023
// OOP practice + Interesting Number Sequence
let cX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // temporary code:
  cX = lerp(cX, mouseX, 0.5);
  circle(cX, height/2, 20);
}
