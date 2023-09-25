// State Variables and Fading
// Jillian
// Sept 22, 2023
// A look at state variables and a fading 

//Globel Variables
let mouseSide; //0 -> left side, 1 -> right side
//"left" -> left, "right" 
let fillValue = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  updateMouseState();
}

function draw() {
  background(220);
  updateMouseState();
  renderSquares();
}

function updateMouseState() {
  //Looks at the mouse position and updates
  //our "system variable" mouseSide.
  if (mouseX > width / 2) {
    mouseSide = "right";
  }
  else mouseSide = "left";
  print(mouseSide);
}

function renderSquares() {
  // draw our two rectangles on the screen
  if (mouseSide === "left") fill(0);
  else fill(255);
  rect(0, 0, width / 2, height); //left rect.

  if (mouseSide === "right") {
    fillValue = 0;
  }
  else {
    fillValue += 3;
  }
  fillValue = constrain(fillValue, 0, 255);
  fill(fillValue);
  print(fillValue);
  rect(width / 2, 0, width / 2, height); //right rect.
}
