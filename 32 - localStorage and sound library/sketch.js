// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Global Variables
// loca
let ball;   let totalBounces = 0;
let music, bounceSound;
function preload(){
  music = loadSound("assets/background.mp3");
  bounceSound = loadSound("assets/bounceSound.wav");


}




function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(width/2,height/2);

  if(localStorage.getItem("numBounces") === null){
    localStorage.setItem("numBounces", 0);
  }
  else{
    totalBounces = localStorage.getItem("numBounces");
  }
}

function draw() {
  textSize(30);  textAlign(CENTER);
  
  background(220);
  ball.move();   ball.display();

  text(totalBounces, width/2, height/2);
}

class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-6,6), random(-6,6));
  }
  display(){
    circle(this.pos.x, this.pos.y, 30);
  }
  move(){
    this.pos.add(this.vel);
    if(this.pos.x < 0 || this.pos.x > width){
      this.vel.x *= -1;
      totalBounces++;
      localStorage.setItem("numBounces", totalBounces);
      bounceSound.play();
    }
    if(this.pos.y<0||this.pos.y>height){
      this.vel.y *= -1;
      totalBounces++;
      localStorage.setItem("numBounces", totalBounces);
      bounceSound.play();
    }
  }
}