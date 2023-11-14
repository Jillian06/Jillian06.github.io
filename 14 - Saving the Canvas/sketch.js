// Saving the Canvas
// Jillian Yang
// October 27, 2023
// Saving Canvas as PNG, canvas size


// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  // resolution is fairly high
  createCanvas(3000, 1500);
  background(50);
  art();
}

function art(){
  noFill();
  stroke(255);
  rectMode(CENTER);
  strokeWeight(10);
  for (let d = 300; d < 1400; d += 50){
    square(width/2, height/2, d);
  }
}

function keyPressed(){
  if(key === "s") save("CS30 Image.png");
}

