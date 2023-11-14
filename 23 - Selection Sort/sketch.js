// Selection Sort Demo
// Mr.Scott
// Nov 3, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let values = [];
const NUM_VALUES = 20;

function setup() {
  randomSeed(10); // ?? // for debugging 
  noCanvas();
  poputaArray();
  print(values);
  selectionSort();
  print(values);

}

function selectionSort(){
  for(let index = 0; index < values.length - 1; index ++){
    let minimum = values[index];
    let minimumLoc = index;
    for(let searchIndex = index + 1; searchIndex < values.length; searchIndex++){
      let cur = values[searchIndex];
      if(cur < minimum){
        minimum = cur;
        minimumLoc = searchIndex;
      }
    }
    //Now, time to sawp
    let temp = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc] = temp;
  }
}

function poputaArray(){
  // fill the Array with NUM_VALUES number of items
  for(let i = 0; i < NUM_VALUES; i++){
    values.push(floor(random(1000)));
  }
}