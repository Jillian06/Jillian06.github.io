const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 2388;
canvas.height = 1668;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = './gameMap/gameMap.png'
console.log(image)

image.onload = () =>{
    c.drawImage(image, 0, 0);
}