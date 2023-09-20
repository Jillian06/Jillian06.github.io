// Primitive Paint
// Jillian Yang
// Spet 15, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballX, xSpeed=5, ballSize=30;
let overlay;

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);

}

function draw() {
  background(220);
}

function mouseRectangle(){
  if(keyIsPressed){
    if(key === "a") overlay.rect(mouseX, mouseY, 50, 25);
  }
}