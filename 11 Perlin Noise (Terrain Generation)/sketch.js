// Jillian
// Oct 11, 2023
// Perlin Terrain
// program for generating smooth terrain and labeling highest points and averages


let topX, topY;
let terHeight, terWidth = 1;
let heightTime = 0;
let noiseShift = 0.01;
let heightShift = 1;
let totalHeight, averageHeight;
let rectCount;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  generateTerrain();
}

// Smooth terrain component using noise function and calulating average and top
function generateTerrain() {
  noStroke();
  fill(0);
  topX = 0;
  topY = 0;
  totalHeight = 0;
  rectCount = 0;
  for (let x = 0; x < width; x += terWidth) {
    terHeight = noise(heightTime);
    terHeight = map(terHeight, 0, 1, 0, height * 0.8);
    if (terHeight > topY) {
      topY = terHeight;
      topX = x;
    }
    heightTime += noiseShift;
    rect(x, height, x + terWidth, height - terHeight);
    totalHeight += terHeight;
    rectCount += 1;
  }
  averageHeight = totalHeight / rectCount;
  drawAverage();
  drawFlag(topX, height - topY);
}

// Draw a horizontal band for the average height
function drawAverage() {
  fill(0, 0, 255);
  rect(0, height - averageHeight, width, height - averageHeight + 5);
}

// Draw the flag
function drawFlag(x, y) {
  stroke(255, 0, 0);
  fill(255, 0, 0);
  line(x, y, x, y - 30);
  triangle(x, y - 30, x - 10 / 2, y - 30, x, y - 30 - 10);
}

// Update makes screen scroll
function draw() {
  background(255);
  heightTime = 0 + heightShift;
  heightShift += 0.1;
  generateTerrain();
}