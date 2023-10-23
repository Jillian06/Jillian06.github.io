// Multi-Coloured Grid
// Jillian
// Sept 28, 2023
// Resizable random colors square grid program

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  drawGrid();
}

//changing the size smaller by click left mouse button, bigger by click right mouse button
let rectSize = 10;
function mousePressed() {
  if (mouseButton === "left") {
    if (rectSize > 5) {
      rectSize = rectSize - 5;
    }
  }
  else {
    rectSize = rectSize + 5;
  }
  drawGrid();
}

//changing color by re-draw the grid
function keyPressed() {
  drawGrid();
}

//draw the grid using for loops
function drawGrid() {
  background(0);
  for (let x = 0; x < width - rectSize; x = x + rectSize) {
    for (let y = 0; y < height - rectSize; y = y + rectSize) {
      noStroke();
      rect(x, y, rectSize);
      fill(random(255), 255, 255);
    }
  }
}