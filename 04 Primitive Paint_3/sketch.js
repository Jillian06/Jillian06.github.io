// Primitive Paint
// Jillian Yang
// Spet 15, 2023
// Draw simple pictures

let ballSize = 30;
let overlay;
let extraCanvas;

function setup() {
  createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(width, height);
  overlay = createGraphics(width, height);
  colorA = color(random(255), random(255));
}

function draw() {
  background(0);
  mouseTrack();
  image(overlay, 0, 0);
  text('Jillian', 12, 12);
  textFont('Georgia');
  drawAndMoveBall();
}

let colorA;

//Each click of the mouse and corresponding keyboard will draw different patterns in random colors. 
function mousePressed() {
  if (key === "a") {
    overlay.rect(mouseX, mouseY, 50, 25);
  }
  if (key === "s") {
    overlay.ellipse(mouseX, mouseY, 30, 50);
  }
  if (key === "d") {
    overlay.triangle(mouseX, mouseY, mouseX + 28, mouseY - 55, mouseX + 56, mouseY);
  }
  extraCanvas.fill(colorA);
  if (key === " ") {
    overlay.clear();
  }
  overlay.fill(colorA);
  colorA = color(random(255), random(255));
}

//Clicking the mouse and corresponding keys on the keyboard will display the pattern to be drawn.
function mouseTrack() {
  if (key === "a") {
    extraCanvas.rect(mouseX, mouseY, 50, 25);
  }
  if (key === "s") {
    extraCanvas.ellipse(mouseX, mouseY, 30, 50);
  }
  if (key === "d") {
    extraCanvas.triangle(mouseX, mouseY, mouseX + 28, mouseY - 55, mouseX + 56, mouseY);
  }
  image(extraCanvas, 0, 0);
  extraCanvas.clear();
}

//motion function make a ball samll and big
let a = 2;
function drawAndMoveBall() {
  ballSize = ballSize + a;
  if (ballSize > 100 || ballSize < 5) {
    a = -a;
  }
  circle(160, 160, ballSize);
  fill(252);
}