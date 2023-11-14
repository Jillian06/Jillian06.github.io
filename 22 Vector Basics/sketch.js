// Vector Basics
// Jillian
// Nov 1, 2023
// Using Vectors for motion(pos, vel, accel)


// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  movers.push(new Mover(mouseX, mouseY));
}

function draw() {
  movers.push(new Mover(mouseX, mouseY));
  background(220);
  for(let i = 0; i < movers.length; i ++){
    let m = movers[i];
    m.move();
    m.display();
    if(m.alive === false){
      movers.splice(i, 1);
    }
  }
}

class Mover{
  constructor(x, y){
    this.pos = createVector(x, y); // this.pos.x  this.pos.y
    this.c = color(50, 50, random(150, 255), 150);
    this.vel = createVector(random(-3, 3), random(-2, -5));
    this.gravity = createVector(0, 0.1);
    this.alive = true;
    this.lifetime = Math.floor(random(60, 120));
  }
  //class method

  move(){
    //update velocity by forces first 
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.lifetime --;
    if(this.lifetime < 0){
      this.alive = false;
    }
  }

  display(){
    fill(this.c); 
    noStroke();
    push();
    translate(this.x, this.y);
    circle(this.pos.x, this.pos.y, 20);
    pop();
  }
}

function overlay(){
  
}
