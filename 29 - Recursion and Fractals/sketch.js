// Recursion and Fractals
// Jillian
// Nov 22, 2023
//
let seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  seed = random(100);
}

function draw() {
  background(255);
  randomSeed(seed);
  // circleInCircle(width/2, height/2, width);
  // cantor(width * 0.1, height * 0.3, width * 0.8, 6);
  //circleFractal(width/2, height/2,  height/2);
  squareFactal(width/2, height/2, width/2);
}

function squareFactal(x, y, len){
  if(len > 10){
    rectMode(CENTER);
    fill(random(255), random(255), random(255));
    push();
    translate(x, y);
    rotate(radians(frameCount));
    square(0, 0, len);
    pop();
    //recursive calls
    squareFactal(x - len/2, y - len/2, len/2);
    squareFactal(x - len/2, y + len/2, len/2);
    squareFactal(x + len/2, y - len/2, len/2);
    squareFactal(x + len/2, y + len/2, len/2);
  }
}


function circleFractal(x, y, d){
  if(d > 2){
    circle(x, y, d);
    
    // recursive call(s);
    circleFractal(x-d/2, y, d/2);
    circleFractal(x + d/2, y, d/2);
    circleFractal(x, y + d/2, d/2);
  }
  // base case
}


function cantor(x, y, len, depth){
  if(depth > 0){
    line(x, y, x+len, y);

    // recursive calls (left third, right third);
    let newY = y + 20;
    cantor(x, newY, len/3, depth - 1);
    cantor(x + len*2/3, newY, len/3, depth - 1);
    // cantor();
  }
  // base case - start to unravel
}





function circleInCircle(x, y, d){
  print(1);
  if (d > 10){
    // recursive case... do some visual work
    circle(x, y, d);
    let den = map(mouseX, 0, width, 1.01, 1.5);
    circleInCircle(x, y, d/den);
  }

  // implicit base case
}