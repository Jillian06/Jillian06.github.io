// Cars Cars Cars!
// Jillian
// Oct 18, 2023
// Traffic Simulation Program

let eastbound = [];
let westbound = [];
let trafficLight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    const y = random(height / 2 - 20, height / 6 + 12);
    eastbound.push(new DrawVehicle(random(0, width), y, random(0, 1), 1, random(2, 15)));
  }
  for (let i = 0; i < 20; i++) {
    const y = random(height / 2 + 20, height * 5 / 6 - 12);
    westbound.push(new DrawVehicle(random(0, width), y, random(0, 1), 0, random(-15, -2)));
  }
  trafficLight = new TrafficLight();
}

function draw() {
  background(225);
  drawRoad();
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action();
  }
  trafficLight.display();
}

// drawing a black road and white dash in the middle
function drawRoad() {
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, width, height / 1.5);
  fill(255);
  for (let x = 20; x < width; x += 60) {
    rect(x, height / 2, 20, 5);
  }
}

class DrawVehicle {
  constructor(x, y, carType, dir, xSpeed) {
    this.x = x;
    this.y = y;
    this.carType = carType;
    this.c = color(random(255), random(255), random(255));
    this.dir = dir;
    this.xSpeed = xSpeed;
  }

  // creating two types of vehicles and draw different trucks based on their direction
  display() {
    rectMode(CENTER);
    stroke(0);
    if (this.carType > 0.5) {
      fill(255);
      rect(this.x - 15, this.y, 10, 25);
      rect(this.x + 15, this.y, 10, 25);
      fill(this.c);
      rect(this.x, this.y, 50, 20);
    }
    else {
      // truck
      if (this.dir === 1) {
        fill(this.c);
        rect(this.x, this.y, 50, 20);
        rect(this.x + 15, this.y, 1, 20);
      }
      else {
        fill(this.c);
        rect(this.x, this.y, 50, 20);
        rect(this.x - 15, this.y, 1, 20);
      }
    }
  }

  // situation when the car is off the screen
  move() {
    this.x += this.xSpeed;
    if (this.dir === 0) {
      if (this.x <= 0) {
        this.x = width;
      }
    }
    else {
      if (this.x > width) {
        this.x = 0;
      }
    }
  }

  //speeding up and speeding down using maximum and minimum
  speedUp() {
    if (this.dir === 1) {
      this.xSpeed = min(15, this.xSpeed + 0.5);
    }
    else {
      this.xSpeed = max(-15, this.xSpeed - 0.5);
    }
  }

  speedDown() {
    if (this.dir === 1) {
      this.xSpeed = max(0, this.xSpeed - 0.5);
    }
    else {
      this.xSpeed = min(this.xSpeed + 0.5, 0);
    }
  }

  changeColor() {
    this.c = color(random(255), random(255), random(255));
  }

  action() {
    if (trafficLight.type === 0) {
      this.move();
      const chance = random(0, 100);
      if (chance < 40) {
        this.speedUp();
      }
      if (chance > 60) {
        this.speedDown();
      }
      if (random(0, 100) < 2) {
        this.changeColor();
      }
    }
    this.display();
  }
}

//left click: add an eastbound car
//shift + left click: add a westbound car
function mousePressed() {
  if (keyCode === SHIFT && keyIsPressed && mouseButton === LEFT) {
    const y = random(height / 2 + 20, height * 5 / 6 - 12);
    westbound.push(new DrawVehicle(random(0, width), y, random(0, 1), 0, random(-15, 2)));
  }
  else if(mouseButton === LEFT){
    const y = random(height / 2 - 20, height / 6 + 12);
    eastbound.push(new DrawVehicle(random(0, width), y, random(0, 1), 1, random(2, 15)));
  }
}

// adding the traffic light
class TrafficLight {
  constructor() {
    this.type = 0;
    this.frame = 0;
  }  
 
  // green when this type is 0, red when this type is 1
  draw() {
    if (this.type === 0) {
      fill(0, 255, 0);
    }
    else if (this.type === 1) {
      fill(255, 0, 0);
    }
    circle(width - 100, height - 50, 30);
  }

  //turn back to green after 120 frames of red, else keep counting
  display() {
    this.draw();
    if (this.type === 1) {
      if (this.frame >= 120) {
        this.type = 0;
        this.frame = 0;
      }
      else {
        this.frame++;
      }
    }
  }
 
  // if this type is not 1 then it change to 1
  switchLight() {
    if (this.type !== 1){
      this.type = 1;
    }
  }
}

// when space key is pressed the traffic light switch
function keyPressed() {
  if (key === " ") {
    trafficLight.switchLight();
  }
}







