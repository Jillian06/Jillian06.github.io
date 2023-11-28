// 3D Basics + CSS Centering
// Jillian
// Nov 23, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 5;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}                      //WebGL has 0, 0 at the center

function draw() {
  background(0);
  // rotateZ(frameCount);
  // box(150);
  rotateY(frameCount);
  angle = map(mouseX, 0, width, -120, 120);
  for(let i = 0; i < 360; i += 45){
    push();
    rotateY(i);
    boxes(30);
    pop();
  }
}

function boxes(size){
  if(size > 3){
    rotateZ(angle);
    translate(size*1.5, 0);
    box(size);

    boxes(size*0.8)
  }
}

