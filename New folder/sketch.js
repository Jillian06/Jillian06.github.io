// Working with Images
// Jillian
// Oct 10, 2023
// Working with images in variable and arrays


//Global Variables
let lionL, lionR; //store Image object in each
let facingLeft = true;
let pinImaged = []; // //to hold all our pinwheel images
let pinIndex = 0;

function preload(){
  //happens before setup(). Waits for loading to finish
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for(let i = 0; i<9; i++){
    pinImages.push(loadImage("assets/pin-0"+i+".png"));
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  //load picture here. NONONONO
  //lionL = loadImage();
  //more code
  imageMode(CENTER);
  //frameRate
}

function draw() {
  background(220);
  drawLion();
  drawPin();
}

function drawPin(){
  image(pinImages[pinIndex], width/2, height/2);
  if(frameCount % 4 ===0){
    pinIndex ++;
      if(pinIndex > 8) pinIndex = 0;
  }
}

function drawLion(){
  //draw the lion in direction mouse moves
  if(movedX <0) facingLeft = true;
  else if (movedX > 0) facingLeft = false;
  
  if(facingLeft){
    image(lionL, mouseX, mouseY, lionL.width*.6, lionL.height*0.6);
  }
  else{
    image(lionR, mouseX, mouseY);
  }
}
