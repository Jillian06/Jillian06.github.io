// Multi-Coloured Grid
// Jillian
// Sept 28, 2023
// 

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  background(0);
  drawGrid();
}

let rectSize = 10;

function mousePressed() {
  if (mouseButton === "left") {
    if (rectSize > 10) {
      rectSize = rectSize - 5;
    }
  }
  else {
    rectSize = rectSize + 5;
  }
  drawGrid();
}


function keyPressed() {
  drawGrid();
}

function drawGrid() {
  for (let x = 0; x < width - rectSize; x = x + rectSize) {
    for (let y = 0; y < height - rectSize; y = y + rectSize) {
      noStroke();
      rect(x, y, rectSize);
      if (x <= width / 2 + 100 && x >= width / 2 - 100 && y <= height / 2 + 100 && y >= height / 2 - 100) {
        fill(random(255));
      }
      else {
        fill(255);
      }
    }
  }
}