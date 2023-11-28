// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;


let coords;

let colors = ["#F8F4D7", "#F4DEC2", "#F4B36C", "#E98977"];

function setup() {
  createCanvas(4000, 4000);
  drawMany();
  angleMode(DEGREES);
}

function flyingBird(){
  fill(255);
  circle(x, y, 20);
}

function drawMany(){
  for(let i = 1; i < 10; i++){
    x = 350 * i;
    for(let j = 1; j < 10; j++){
      y = 350 * j;
      push();
      translate(x, y);
      rotate(i / 3 +j / 3);
      drawCurve();
      pop();
    }
  }
}

function draw() {
  background("#F2B4A8");
  drawMany();
}

function drawCurve() {
  fill(colors[Math.floor(random(colors.length))]);
  noStroke();
  beginShape();
  curveVertex(0, 148);
  curveVertex(0, 148);
  curveVertex(-3, 140);
  curveVertex(-5, 115);
  curveVertex(-7, 135);
  curveVertex(-13, 140);
  curveVertex(-13, 105);
  curveVertex(-20, 135);
  curveVertex(-25, 125);
  curveVertex(-20, 95);
  curveVertex(-25, 90);
  curveVertex(-30, 95);
  curveVertex(-35, 90);
  curveVertex(-45, 95);
  curveVertex(-55, 90);
  curveVertex(-65, 95);
  curveVertex(-75, 90);
  curveVertex(-85, 95);
  curveVertex(-115, 90);
  curveVertex(-145, 95);
  curveVertex(-140, 85);
  curveVertex(-120, 55);
  curveVertex(-90, 45);
  curveVertex(-18, +65);
  curveVertex(-5, 45);
  curveVertex(-10, 35);
  curveVertex(-5, 25);
  curveVertex(-5, 7);
  curveVertex(0, 0);
  curveVertex(5, 7);
  curveVertex(5, 25);
  curveVertex(10, 35);
  curveVertex(5, 45);
  curveVertex(18, 65);
  curveVertex(90, 45);
  curveVertex(120, 55);
  curveVertex(140, 85);
  curveVertex(145, 95);
  curveVertex(115, 90);
  curveVertex(85, 95);
  curveVertex(75, 90);
  curveVertex(65, 95);
  curveVertex(55, 90);
  curveVertex(45, 95);
  curveVertex(35, 90);
  curveVertex(30, 95);
  curveVertex(25, 90);
  curveVertex(20, 95);
  curveVertex(25, 125);
  curveVertex(20, 135);
  curveVertex(13, 105);
  curveVertex(13, 140);
  curveVertex(7, 135);
  curveVertex(5, 115);
  curveVertex(3, 140);
  curveVertex(0, 148);
  curveVertex(0, 148);
  endShape();
}

function keyPressed() {
  if (key === "s") {
    save("picture.png");
  }
}