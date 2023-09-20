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
}

function draw() {
  background(0);
  mouseTrack();
  mouseShape();
  text('Jillian', 12, 12);
  textFont('Georgia');
  drawAndMoveBall();
}

//draw different shape
function mouseShape() {
  if (mouseIsPressed) {
    if (key === "a") {
      overlay.rect(mouseX, mouseY, 50, 25);
    }
    if (key === "s") {
      overlay.ellipse(mouseX, mouseY, 30, 50);
    }
    if (key === "d") {
      overlay.triangle(mouseX, mouseY, mouseX + 28, mouseY - 55, mouseX + 56, mouseY);
    }
  }
  if (key === " ") {
    overlay.clear();
  }
  image(overlay, 0, 0);
  overlay.fill(random(255), random(255));
}

//show the shape 
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
  extraCanvas.fill(random(255), random(255));
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