// Puzzle Game
// Jillian Yang
// Nov 9, 2023
// A small fun flipping square game

let grid = [];
let overlay;

const NUM_ROWS = 4;
const NUM_COLS = 5;

let rectWidth = 50;
let rectHeight = 50;

let col, row; // x and y positon of the mouse (grid)

function setup() {
  createCanvas(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
  overlay = createGraphics(rectWidth * NUM_COLS, rectHeight * NUM_ROWS);
  randomBw();
}

function draw() {
  col = getCurrentX();
  row = getCurrentY();
  background(220);
  renderGrid();
  print(col, row);
  mouseTrack();
  youWin();
}

// press space to change between flipping in a cross pattern or a square pattern.
let changeType = 0; // cross
function keyPressed(){
  if(key === " " ){
    if(changeType === 0){
      changeType = 1; // square
    }
    else{
      changeType = 0;
    }
  }
}

// colored overlay to indicate which rectangles will be impacted on a click.
function mouseTrack() {
  overlay.fill(50, 168, 82, 100);
  if (keyIsPressed && keyCode === SHIFT) { // Cheater Cheater
    overlay.rect(col * 50, row * 50, 50, 50);
  }
  else if (changeType === 1) { // square
    overlay.rect(col * 50, row * 50, 50, 50);
    overlay.rect(col * 50, (row + 1) * 50, 50, 50);
    overlay.rect((col + 1) * 50, row * 50, 50, 50);
    overlay.rect((col + 1) * 50, (row + 1) * 50, 50, 50);
  }
  else { // cross
    overlay.rect(col * 50, row * 50, 50, 50);
    overlay.rect(col * 50, (row - 1) * 50, 50, 50);
    overlay.rect((col - 1) * 50, row * 50, 50, 50);
    overlay.rect(col * 50, (row + 1) * 50, 50, 50);
    overlay.rect((col + 1) * 50, row * 50, 50, 50);
  }
  image(overlay, 0, 0);
  overlay.clear();
}

// randomize black and white color(0 and 255), and push them into the array
function randomBw() {
  for (let i = 0; i < NUM_ROWS; i++) {
    let a = [];
    for (let i = 0; i < NUM_COLS; i++) {
      a.push(int(random(2)) * 255);
    }
    grid.push(a);
  }
}

function mousePressed() {
  // when the mouse is pressed, flip the corresponding 2d array value
  // also going to flip 4 candinal neighbours (N, S, E, W)
  if (keyIsPressed && keyCode === SHIFT) { // Cheater Cheater: shift - click 
    // will only flip the square the mouse is over.
    flip(col, row);
  }
  else if (changeType === 1) { // flipping a square while press space
    flip(col, row);
    if (col < NUM_COLS - 1) {
      flip(col + 1, row);
    }
    if (row < NUM_ROWS) {
      flip(col, row + 1);
    }
    if (col < NUM_COLS - 1 && row < NUM_ROWS) {
      flip(col + 1, row + 1);
    }
  }
  else {
    flip(col, row);
    // flip the neighbouring tiles too
    if (row > 0) {
      flip(col, row - 1);
    } //filp the tile above
    if (col < NUM_COLS - 1) {
      flip(col + 1, row);
    }
    if (row < NUM_ROWS) {
      flip(col, row + 1);
    }
    if (col > 0) {
      flip(col - 1, row);
    }
  }
}

// Win Condition
function youWin() {
  let allSameto = grid[0][0];
  let i = 0;
  for (let a = 0; a < NUM_ROWS; a++) {
    for (let b = 0; b < NUM_COLS; b++) {
      if (allSameto === grid[a][b]) {
        // determine if the contents in array identical to the first one
        // if it is equal then add a score
        i++;
        if (i === 20) {
          // If all the 20 block has the same color, display the message "You Win"
          fill(0, 200, 255);
          textSize(20);
          text("YOU WIN!", 75, 100);
        }
      }
    }
  }
}

function flip(x, y) {
  // at a given x,y. filp the value in our 2D arrray
  // 0 to 255, 255 to 0
  if (grid[y][x] === 0) {
    grid[y][x] = 255;
  }
  else {
    grid[y][x] = 0;
  }
}

function getCurrentX() {//return the current colume mouse is in
  let constrainX = constrain(mouseX, 0, width - 1);
  return int(constrainX / rectWidth);
}

function getCurrentY() {//return the current row mouse is in
  let constrainY = constrain(mouseY, 0, height - 1);
  return int(constrainY / rectWidth);
}

function renderGrid() {
  //creates a 2D grid of square using information from our
  //2D array for the corresponding fill values.
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      let fillValue = grid[y][x];
      fill(fillValue);
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}
