// The Ballon Tree
// Jillian
// 2023.12.04
// A program that can draw simple trees with colorful leaves

let scale = 15;
let leafDepth = 5;
let randomValue;

function setup() {
  createCanvas(500, 500);
  background(255);
  randomValue = random(0, 100);
}

function draw() {
  background(255);
  drawTree(width / 2, height * 0.9, 90, 6);
  randomSeed(randomValue);
}

function drawLine(x1, y1, x2, y2, depth) {
  // Varied Branch Thickness
  let weight = map(depth, 0, 6, 0.5, 5);
  strokeWeight(weight);
  // draw a line segment connecting (x1,y1) to (x2,y2)
  line(x1, y1, x2, y2);
}

function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + cos(radians(angle)) * depth * scale; // calculate endpoints of the current branch
    let y2 = y1 - sin(radians(angle)) * depth * scale; // using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth);
    // Interactive Angles
    let angleChange = map(mouseX, 0, width, 0, 30);
    // for a 3-branch tree:
    drawTree(x2, y2, angle + angleChange, depth - 1);
    drawTree(x2, y2, angle, depth - 1);
    drawTree(x2, y2, angle - angleChange, depth - 1);
    if (depth <= leafDepth) {
      drawLeaf(x2, y2, depth);
    }
  }
}

function drawLeaf(x, y, depth) {
  // Random leaf color
  fill(random(255), random(255), random(255));
  // Random Leaf size based on depth
  let leafSize = random(20, 50 / depth);
  circle(x, y, leafSize);
}

// User choose leaf depth
function keyTyped() {
  if (key === "z" && leafDepth > 0) {
    leafDepth -= 1;
  } 
  else if (key === "x" && leafDepth < 6) {
    leafDepth += 1;
  }
}