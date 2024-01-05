let cat1;

function preload() {
  // Load your image before setup
  cat1 = loadImage("imgS/Cat-2-Licking.png");
}

function setup() {
  createCanvas(1024, 576);
  // Create a sprite using createSprite
  cat1 = createSprite(256, 256, 120, 120);
  // Add animation to the sprite
  cat1.addAnimation("gameStart", cat1);
  // Set the animation frames
  cat1.animation.frameDelay = 200; // Adjust the frame delay as needed
}

function draw() {
  background(255);
  // Display the sprite
  drawSprites();
}


// let cat1;
// // let ifGameStart = false;
// // let runFront, runLeft, runRight, runBack;

// function preload(){
//   cat1 = loadImage("imgS/Cat-2-Licking.png");
// }

// function setup() {
//   createCanvas(1024, 576);
//   cat1 = new Sprite(250, 80, 120);
//   // loadplayerRun();
//   loadGameStart();
// }

// // function setup() {
// //   createCanvas(1024, 576);
// //   cat1 = new Sprite(250, 80, 120);
// //   loadplayerRun();
// // }

// function loadGameStart(){
//   cat1.addAni("gameStart", "imgS/Cat-2-Licking.png", { frameSize: [256, 256], frames: 5 });
// }

// function draw() {
//   background(255);
//   animation(gameStart, 256, 256);
// }

// function loadplayerRun() {
//   cat1.addAni("down", "playerRun/IMG_runFront.png", { frameSize: [256, 256], frames: 4 });
//   cat1.addAni("left", "playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
//   cat1.addAni("right", "imgS/Cat-1-Run.png", { frameSize: [256, 256], frames: 8 });
//   cat1.addAni("up", "playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
// }

// // function preload() {
// //   // gameMap = loadImage("gameMap/gameMap.png");
// //   textFont1 = loadFont('textFont/8-bitanco.ttf');
// // }


// function draw() {
//   background(0);
//   // clear();
//   if (ifGameStart === false) {
//     animation(gameStart, 256, 256);
//     pressStart();
//   }
//   else if (ifGameStart === true) {
//     playerRun();
//     cat1.debug = mouse.pressing();
//     if (kb.pressing("left")) {
//       cat1.changeAni("left");
//       cat1.x -= 2;
//     }
//     else if (kb.pressing("right")) {
//       cat1.changeAni("right");
//       cat1.x += 2;
//     }
//     else if (kb.pressing("down")) {
//       cat1.changeAni("down");
//       cat1.y += 2;
//     }
//     else if (kb.pressing("up")) {
//       cat1.changeAni("up");
//       cat1.y -= 2;
//     }
//     if (kb.pressing('space')) {
//       cat1.ani.stop();
//     }
//     else {
//       cat1.ani.play();
//     }
//   }
// }

// function playerRun() {
//   if (keyIsPressed === true && keyCode === DOWN_ARROW) {
//     scale(0.3);
//     animation(runFront, 2500, 2500);
//   }
//   else if (keyIsPressed === true && keyCode === UP_ARROW) {
//     scale(0.3);
//     animation(runBack, 2500, 2500);
//   }
//   else if (keyIsPressed === true && keyCode === LEFT_ARROW) {
//     scale(0.3);
//     animation(runLeft, 2500, 2500);
//   }
//   else if (keyIsPressed === true && keyCode === RIGHT_ARROW) {
//     scale(0.3);
//     animation(runRight, 2500, 2500);
//   }
// }

// function pressStart() {
//   fill(255);
//   textFont(textFont1, 60);
//   stroke(0);
//   strokeWeight(4);
//   text('Press ENTER to Start the Game', 100, 150);
//   if (ifGameStart === true) {
//     gameBegin();
//   }
// }

// function keyPressed() {
//   if (ifGameStart === false && keyCode === ENTER) {
//     ifGameStart = true;
//   }
// }
