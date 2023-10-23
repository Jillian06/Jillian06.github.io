// Cars Cars Cars!
// Jillian
// Oct 18, 2023

let vehicles = [];
let eastBound = [];
let weatBond = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(createVehicle, 1000); // Create a vehicle every second
}

function draw() {
  background(225);
  drawRoad();
  for (let i = vehicles.length - 1; i >= 0; i--) {
    let vehicle = vehicles[i];
    vehicle.action();
  }
}

function createVehicle() {
  if (random(1) > 0.5) {
    // Create vehicles in the top half, moving from left to right
    const y = random(height / 2 - 15, height / 6 + 10);
    vehicles.push(new DrawVehicle(-100, y, 1));
  }
  else {
    const y = random(height / 2 + 15, height * 5 / 6 - 10);
    vehicles.push(new DrawVehicle(width + 100, y, -1));
  }

}

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
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.c = color(random(255), random(255), random(255));
    this.dir = dir;
    this.speed = 10;
  }

  action() {
    this.move();
    this.display();
  }

  move() {
    this.x += this.speed * this.dir;
  }

  display() {
    let a = random(0, 1);
    if (a >= 0.5) {
      fill(this.c);
      rect(this.x, this.y, 50, 20);
    }
    else if (a < 0.5) {
      fill(this.c);
      rect(this.x, this.y, 30, 10);
    }
  }

  isOffCanvas() {
    return (this.x < -100 || this.x > width + 100);
  }
}
