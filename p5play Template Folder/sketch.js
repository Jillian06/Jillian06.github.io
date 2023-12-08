let cloudAni;

function setup() {
  createCanvas(2388, 1668);
  for (let i = 1207; i < 1228; i++) {
    cloudAni = loadAni('assets/IMG_' + i + '.png');
  }
}

function draw() {
  background(220);
  clear();
  imageMode(CORNER);
  animation(cloudAni, 1194, 834);
}
