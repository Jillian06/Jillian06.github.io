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
let started = false;

function preload() {
  imgOne = loadImage("assets/IMG_0986.jpg");
  imgTwo = loadImage("assets/IMG_0987.jpg");
  imgFour = loadImage("assets/IMG_0989.jpg");
  imgFive = loadImage("assets/IMG_0990.jpg");
  imge1 = loadImage("assets/IMG_0994.jpg");
  imge2 = loadImage("assets/IMG_0995.jpg");
  imge3 = loadImage("assets/IMG_0996.jpg");
  imge4 = loadImage("assets/IMG_0997.jpg");
  imge5 = loadImage("assets/IMG_0998.jpg");

  backgroundMusic = loadSound("music/Weathering with You.mp3");
}


function setup() {
  createCanvas(2000, 2000);
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
  textSize(50); 
  textAlign(TOP);

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

  if(started === false){
    fill(180);
    text("click to start music", 10, 60);
    if (mouseIsPressed) {
      started = true;
      backgroundMusic.setVolume(0.3);
      backgroundMusic.loop(); 
    }
  }
}

// Change the photo to give the picture the feeling of falling wind
function switchImage() {
  let randomNumber = floor(random(1, 6));
  if (randomNumber === 1) {
    currentImage = imgOne;
  }
  else if (randomNumber === 2) {
    currentImage = imgTwo;
  }
  else if (randomNumber === 4) {
    currentImage = imgFour;
  }
  else if (randomNumber === 5) {
    currentImage = imgFive;
  }
}

// Stars around angel in background with twinkling feature
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

// Star in center above angel in background
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

// The star in the center above the angel in the background is transformed by the picture
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