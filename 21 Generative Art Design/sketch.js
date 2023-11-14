// Generative Art Design
// Jillian
// Oct 30, 2023
//

function setup() {
  createCanvas(2300, 2000);
  beautifulSqu();
  stroke(0, 5);
}


function beautifulSqu() {
  for (let i = 0; i < 10; i++) {
    let x = random(200, 2100);
    let y = random(200, 1800);
    let n = 60;
    let nx = -40;
    let a = random(30, 80);
    for (let i = 0; i < a; i++) {
      push();
      translate(x, y);
      push();
      rotate(radians(n));
      line(nx, 0, nx + 100, 0);
      nx += 1;
      n = n + 4;
      y += random(-1, 1);
      pop();
      pop();
    }
  }
}

function keyPressed() {
  if (key === "s") {
    save("picture.png");
  }
}
function keyPressed() {
  if (key === "s") {
    save("picture.png");
  }
}