// Art Replication
// Jillian
// 2023.10.26
// A program to draw the work "Vertical-Horizontal No. 3"


let a, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  a = random(200, width - 200);
  b = random(50, height - 50);
  drawLines();
}

// draw 100 lines
function drawLines() {
  background(220);
  for (let i = 0; i < 100; i++) {
    let x = random(200, width - 200);
    let y = random(50, height - 50);
    if (i % 2 === 0) {
      // Draw a horizontal line
      line(a, b, x, b);
      a = x;
    } 
    else {
      // Draw a vertical line
      line(a, b, a, y);
      b = y;
    }
  }
}
