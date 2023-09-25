// Mouse Distance
// Jillian
// Spet 20, 2023
//

//arrays, maths, functions, scroll wheel, colors

//Global Variables
let colorArray = []; //red, green, blue
let colorIndex = 0;  // 0     1      2

function createColors() { //simplest: no inputs, no 
  colorArray.push(color("red"));
  colorArray.push(color(200, 200, 255));
  colorArray.push(color("midnightblue"));
}

function mouseWheel(event) {
  //up -> negative down -> positive
  print(event.delta);
  if (event.delta < 0) {  //UP
    colorIndex += 1;
    //wrap around...
    if (colorIndex > colorArray.length - 1) {
      colorIndex = 0;
    }
  }
}

function mouseDistance(x1, x2, y1, y2){
  //given two ordered pairs, returen the straight line distance
  let a = Math.abs(x1 - x2);
  let b = Math.abs(y1 - y2);
  let c = Math.sqrt(a*a + b*b);
  return c;
}

function drawNodes() {
  //draw two "nodes" (circles) at center and mouse
  //and connect with a single edge
  fill(colorArray[colorIndex]);
  stroke(colorArray[colorIndex]);
  circle(width / 2, height / 2, 20);
  circle(mouseX, mouseY, 20);
  line(width / 2, height / 2, mouseX, mouseY);
  let d = mouseDistance(mouseX, mouseY, width/2, height/2);
  textSize(30);
  textAlign(CENTER);
  text(round(d, 1), width/2, height * 0.6);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createColors();
}

function draw() {
  background(220);
  drawNodes();
}
