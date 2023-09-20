// Primitive Paint
// Jillian Yang
// Spet 15, 2023
// Draw simple pictures

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global Variables
let ballSize = 30; //declarations/init
let overlay; //"extra canvas"
//fill(0); //-graysacle
//fill(100,200,255); //RGB
//fill("blue");
let colorA, colorB;



function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);
}

function draw() {
  background(46, 209, 68);
  mouseRectangle();
  drawAndMoveBall();
  changeColor();
}

function mouseRectangle() {
  //draw a rectangle at mouse position 
  if (keyIsPressed) {
    overlay.rect(mouseX, mouseY, 50, 25); 
  }
  image(overlay, 0, 0);
}



function changeColor(){
  if (key === "z") overlay.fill(3, 182, 252);
  if (key === "x") overlay.fill(98, 3, 252);
}












let a = 2;

function drawAndMoveBall() {
  ballSize = ballSize + a;
  if (ballSize > 100 || ballSize < 5) {
    a = -a;
  }
  circle(60, 60, ballSize);
  fill(252, 3, 3);
}
