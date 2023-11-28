// Loading from Files
// Jillian Yang
// Nov 27, 2023
// loadStrings(), split(), ... spread syntax
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Global Variables
let grid, img, rows, cols, colorMap;


function preload(){
  // img = loadStrings("assets/image.txt");
  img = loadStrings("assets/colorImage.txt");
}


// let textFile;
// function preload(){
//   textFile = loadStrings("assets/info.txt");
// }

function setup() {
  //determine the rows/cols
  cols = img[0].length;
  rows = img.length;
  createCanvas(windowWidth, windowHeight);

  //populate the 2D array(grid)
  grid = [];
  for(let i = 0; i < rows; i ++){
    grid.push([...img[i]]);
  }

  //create a color Map
  colorMap = new Map([
    ["b", "black"],
    ["w", "white"],
    ["r", "sienna"],
    ["l", "peru"],
    ["p", color(150, 150, 255)];

  ]);


  // processText();
}

// function processText(){
//   print("SPIT INTO WORDS");
//   let splitWords = textFile[0].split("");
//   print(splitWords);

//   print("SPLIT INTO CHARS")
//   let splitChars = textFile[1].split("");
//   print(splitChars);

//   print("SPREAD INTO CHARS")
//   let spreadChars = [...textFile[2]];
//   print(spreadChars);
// }

function draw() {
  renderGrid();
}

function renderGrid(){
  // calculate the grid size
  let cellWidth = width/cols;
  let cellHeight = height/rows;

  //visit each location in 2D array, and visualize
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      let currentKey = grid[y];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
}
