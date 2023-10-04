// Drawing with Single and Nested Loops
// Jillian
// Sept 25, 2023
//Gener

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variable
let numSegments = 10;
let segmentHeight; //height/numSegments.
const GRID_SPACING = 30;


function setup() {
  createCanvas(windowWidth, windowHeight);
  segmentHeight = height/numSegments;
}

function drawGride(){
  //draw some elememts using nested loops
  for (let x = 0; x < width; x = x + GRID_SPACING){
    for(let y = 0; y < height; y = y + GRID_SPACING){
      if(dist(x, y, mouseX, mouseY) < 50){
        fill(255, 0, 0);
      }
      else{
        fill(0);
      }
      
      //test 1
      //noCursor();
      //line(mouseX, mouseY, x, y);
    }
  }
}

function draw() {
  gradient();
  drawGride();
}

function gradient(){
  //use a loop to create a gradient background
  noStroke();
  for(let i = 0; i < numSegments; i++){
    let y = i * segmentHeight;
    let fillValue = map(y, 0, height, 0, 255);
    fill(fillValue, fillValue, fillValue);
    rect(0, y, width, segmentHeight);
  }
  stroke(0);
}

