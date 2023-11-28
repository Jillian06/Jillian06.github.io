// Generative Art Design
// Jillian
// 2023.11.26
// falling angle

let stars = [];
let starsCent = [];
let imgOne, imgTwo, imgThree, imgFour, imgFive;
let currentImage;

let imge1, imge2, imge3, imge4, imge5;
let currentCentImage;

let backgroundMusic;

function preload() {
  imgOne = loadImage('assets/IMG_0986.jpg');
  imgTwo = loadImage('assets/IMG_0987.jpg');
  imgThree = loadImage('assets/IMG_0988.jpg');
  imgFour = loadImage('assets/IMG_0989.jpg');
  imgFive = loadImage('assets/IMG_0990.jpg');
  imge1 = loadImage('assets/IMG_0994.jpg');
  imge2 = loadImage('assets/IMG_0995.jpg');
  imge3 = loadImage('assets/IMG_0996.jpg');
  imge4 = loadImage('assets/IMG_0997.jpg');
  imge5 = loadImage('assets/IMG_0998.jpg');

  //backgroundMusic = loadSound('music/Weathering with You 1.m4a');
}


function setup() {
  createCanvas(2000, 2000);
  //backgroundMusic.play();
  for (let i = 0; i < 400; i++) {
    stars[i] = new Star();
  }
  for (let i = 0; i < 200; i++) {
    starsCent[i] = new StarCent();
  }
  currentImage = imgOne;
  currentCentImage = imge1;
}

function draw() {
  background(0);
  for (let star of stars) {
    star.display();
    star.twinkle();
    star.move();
  }
  for (let starcent of starsCent) {
    starcent.display();
    starcent.twinkle();
    starcent.move();
  }
  image(currentImage, 240, 280, 1360, 1700);
  if (frameCount % 2 === 1) {
    switchImage();
  }

  image(currentCentImage, random(700, width - 700), random(0, 800), 200, 200);
  if (frameCount % 2 === 1) {
    switchCentImage();
  }
}

function switchImage() {
  let randomNumber = floor(random(1, 6));
  if (randomNumber === 1) {
    currentImage = imgOne;
  }
  else if (randomNumber === 2) {
    currentImage = imgTwo;
  }
  else if (randomNumber === 3) {
    currentImage = imgThree;
  }
  else if (randomNumber === 4) {
    currentImage = imgFour;
  }
  else if (randomNumber === 5) {
    currentImage = imgFive;
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 20);
    this.speed = random(1300, 1850);
  }

  display() {
    noStroke();
    fill(255, this.brightness);
    ellipse(this.x, this.y, this.size);
  }

  twinkle() {
    let t = random(0, 6);
    this.brightness = (sin(t) + 1) * 100;
  }

  move() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = height;
      this.x = random(width);
      this.speed = random(5, 25);
    }
  }
}

class StarCent {
  constructor() {
    this.x = random(700, width - 700);
    this.y = random(height - 800, height);
    this.size = random(2, 20);
    this.speed = random(1300, 1850);
  }
  display() {
    noStroke();
    fill(150, this.brightness);
    let shapeType = random(0, 1);
    if (shapeType <= 1) {
      ellipse(this.x, this.y, this.size);
    }
  }
  twinkle() {
    let t = random(0, 6);
    this.brightness = (sin(t) + 1) * 100;
  }
  move() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = height;
      this.x = random(500, width - 500);
      this.speed = random(5, 25);
    }
  }
}

function switchCentImage() {
  let randomNumber = floor(random(1, 6));
  if (randomNumber === 1) {
    currentCentImage = imge1;
  }
  else if (randomNumber === 2) {
    currentCentImage = imge2;
  }
  else if (randomNumber === 3) {
    currentCentImage = imge3;
  }
  else if (randomNumber === 4) {
    currentCentImage = imge4;
  }
  else if (randomNumber === 5) {
    currentCentImage = imge5;
  }
}