// Project Title
// Your Name
// Date

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameStart;

function setup() {
  createCanvas(1194, 834);
  gameStart = loadAni(
    'gameStart/IMG_1208.PNG',
    'gameStart/IMG_1209.PNG',
    'gameStart/IMG_1210.PNG',
    'gameStart/IMG_1211.PNG',
    'gameStart/IMG_1212.PNG',
    'gameStart/IMG_1213.PNG',
    'gameStart/IMG_1214.PNG',
    'gameStart/IMG_1215.PNG',
    'gameStart/IMG_1216.PNG',
    'gameStart/IMG_1217.PNG',
    'gameStart/IMG_1218.PNG',
    'gameStart/IMG_1219.PNG',
    'gameStart/IMG_1220.PNG',
    'gameStart/IMG_1221.PNG',
    'gameStart/IMG_1222.PNG',
    'gameStart/IMG_1223.PNG',
    'gameStart/IMG_1224.PNG',
    'gameStart/IMG_1225.PNG',
    'gameStart/IMG_1226.PNG',
    'gameStart/IMG_1227.PNG',
  );

  gameStart.frameDelay = 10;
}

function draw() {
  clear();
  animation(gameStart, 250, 80);
}



