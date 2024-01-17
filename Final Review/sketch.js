// Final Review
// Jillian
// 2024.01.17
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//[i,i,i,i,i,i]
//[s,s,s,s,s,s]
let gorillaIdle = [];
let gorillaSwipe = [];
let gorillaX, gorillaY; //position
let idleIndex = 0; let swipeIndex = 0; //which specific picture to show, when does the next index picture to be show

let spiralImages = [];
let spirals = []; //hold "Spiral" objects  //??这两个的区别

function preload() {
  //load circle animation images "circle images 00.png" -> 15
  for(let i = 0; i < 16; i++){
    if(i < 10){ //single digits
      spiralImages.push(loadImage("assets/Circle/Circle Animation0" + i + ".png"));
    }
    else{ //double digit
      spiralImages.push(loadImage("assets/Circle/Circle Animation" + i + ".png"));
    }
  }

  //gorilla idle1.png->6  swipe.png->6
  for (let i = 1; i < 7; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  gorillaX = width / 2; gorillaY = height / 2;

}

function draw() {
  background(220);
  //keyIsPr.. is a bool
  if (keyIsPressed && key === " ") {
    image(gorillaSwipe[swipeIndex], gorillaX, gorillaY, 200, 200); //do not frame lim or donot see a picture
    if (frameCount % 5 === 0) { //faster than % 10
      swipeIndex++; //0, 1, 2, 3, 4, 5, 6
      if (swipeIndex > 5) { //记得把idelIndex转换成swipeIndex
        swipeIndex = 0;
      }
    }
  }
  else { // IDLE
    image(gorillaIdle[idleIndex], gorillaX, gorillaY); //do not frame lim or donot see a picture
    if (frameCount % 10 === 0) {
      idleIndex++; //0, 1, 2, 3, 4, 5, 6
      if (idleIndex > 5) {
        idleIndex = 0;
      }
    }
  }

  // gorillaY += 1; //向下走

  // for(let s of spirals){ //what ever is called, class method can use on it
  //   s.display();
  // }

  for(let i = 0; i < spirals.length; i++){
    let s = spirals[i];
    s.display();
    if(s.active === false){
      spirals.splice(i, 1);
      i--;
    }
    // if there only one item and delete it, it will be undef 
    // do not index back a arry
    // if(spiral[i].pos.x===0)

    if(s.pos.x === 0){}
  }
}

function mousePressed(){
  spirals.push(new Spiral(mouseX, mouseY));
}

class Spiral{
  constructor(x, y){//trying to create an object in the class, choose the input
    this.pos = createVector(x, y);
    this.frame = 0; // current frame 0-15 //every one start at 0
    this.active = true;
  }
  //move()
  display(){
    if(this.frame > 15){ //final frame reach 16
      this.active = false;
    }
    else{
      image(spiralImages[this.frame], this.pos.x, this.pos.y);
      if(frameCount % 3 === 0){
        this.frame++;
      }
    }
  }
}

//mouse and keyboard