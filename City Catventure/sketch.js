let isPlaying = false;
let isGameOver = false;
let hasWon = false;
let player, floorTile, grass;
let ground;
// let background;
//let image;
let idleAnimation;
let score = 0;
let currentLevel = 0;

let intro = false;

let cat1Right;
let cat1Stand;

let changingBackground = false;
let backgroundImage;
let bgImage, bgImage1, bgImage2, bgImage3, bgImage4;

let changingSkin = false;

let currentBackground = 0;
let ifCurrentBackground = false;

const TILE_SIZE = 100;
const GAME_BOUND = 1000;
const PLAYER_ATTRIBUTES = {
    START_X: 100,
    START_Y: 40 + 20,
    HEIGHT: 100,
    WIDTH: 100,
    JUMP_FORCE: 7,
    SPEED: 8
}
const COIN_ATTRIBUTES = {
    COIN_WIDTH: 10,
    COIN_HEIGHT: 10,
}

const TILE_MAPS = [
    [
        '................',
        '............0..x',
        'ffffffffff.fffff',
    ],//0
    [
        '.................x',
        '......g.g......ff.',
        'fff.ffffff.fffff',
    ],//1
    ['.........x.......',
        '.......ff..........0',
        '...fff...g......ffff',
        'ff....fffff.fffff',
    ],//2
    ['......x.........0',
        'ddd..ff........dd',
        '....d.........d',
        '0.....g.g....f',
        'ffffffffff.ff',
    ],//3
    ['......x.............0',
        '...fff...gwww..ffff',
        'ff......ffffff',
        '..ff..........',
        '....d.........d',
        '0.....g.g....f',
        'ffffffffff.ff',
    ],//4
    ['x...............',
        '.f................',
        '..f0...............',
        '...fff..d.ddd.....',
        '.............d',
        '0.....g.g...ff',
        'ffffffffff.ff',
    ],//5
    ['0...............',
        'ff................',
        '..f...........0...',
        '....ff..d.ddd.....',
        '......x.............0',
        '...fff...gwww......ff',
        'ff....f.ffffff',
    ],
    [
        'x...............',
        '.f................',
        '..f0...............',
        '..ffff...........',
        '.......d........',
        '.........f...0.....',
        '0..f..ddgd.....0',
        'ff........ffffff...',
    ],
    [
        '......x.............0',
        '....ff...gwww......ffff',
        'ff....f.ffffff',
        '...d............',
        '.....dd...f...0.....',
        '0..f..ddgd....',
        'ff........ffffff...',
    ],
    [
        '......x.............000',
        '0..fff...gwww......dddd',
        'ff....f.ffffff',
        '...d.0..........',
        '.....dd...f...0.....',
        '0..f........d..00',
        'ff........fffffff..',
    ]
]



function preload() {
    idleAnimation = loadAnimation('./assets/2.png', './assets/3.png')
    runningAnimation = loadAnimation('./assets/4.gif')

    world.gravity.y = 10;

    // background = new Sprite(0, 0, 400, 400, 'n')

    // platform = new Sprite(100, 100)
    // platform.collider = 'k'


    // player.debug = true

    startScreenImage = loadImage('./assets/start_screen.jpeg')
    bgImage = loadImage('./assets/bg.jpg')
    bgImage1 = loadImage('./assets/bg1.jpg')
    bgImage2 = loadImage('./assets/bg2.jpg')
    bgImage3 = loadImage('./assets/bg3.jpg')
    bgImage4 = loadImage('./assets/bg4.jpg')
    bgImage5 = loadImage('./assets/bg5.jpg')
    floorTile = loadImage('./assets/floor_tile.png')
    grassTile = loadImage('./assets/grass_tile.png')
    dirtTile = loadImage('./assets/dirt_tile.png')
    waterTile = loadImage('./assets/water_tile.png')
    coinImg = loadImage('./assets/coin.png')
    doorImage = loadImage('./assets/door.png')


    // music 
    backgroundMusic = loadSound('./assets/bgmusic.mp3')
    coinSound = loadSound('./assets/coin.mp3')

    // textFont1 = loadFont('textFont/8-bitanco.ttf');

}

function loadplayerRun() {
    cat1Right = loadAnimation('assets/Cat-1-Run.png', { frameSize: [50, 50], frames: 8 });
    cat1Right.scale = 5.5;
    cat1Stand = loadAnimation('assets/Cat-1-Licking 1.png', { frameSize: [50, 50], frames: 5 });
    cat1Stand.scale = 5.5;
    // cat1.addAni("right", "assets/Cat-1-Run.png", { frameSize: [256, 256], frames: 8 });
    // nausicaa.addAni("left", "playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
    // nausicaa.addAni("right", "playerRun/IMG_runRight.png", { frameSize: [256, 256], frames: 4 });
    // nausicaa.addAni("up", "playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
}

function setup() {
    if (localStorage.getItem("currentLevel") === null) {
        localStorage.setItem("currentLevel", 0);
    }
    else {
        currentLevel = int(localStorage.getItem("currentLevel"));
    }
    // currentLevel = getItem("currentLevel");

    if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", 0);
    }
    else {
        currentLevel = int(localStorage.getItem("score"));
    }
    

    createCanvas(2560, 1440);
    backgroundImage = bgImage;
    // backgroundMusic.play()
    isPlaying = false;
    // world.autoStep = false;

    loadplayerRun();

    playerSetUp();

    // groundsensor for the player
    groundSensor = new Sprite(player.x, player.y + player.h / 2, player.w, 12)
    groundSensor.visible = false;
    groundSensor.mass = 0.1
    // groundSensor.debug = true;
    let joint = new GlueJoint(player, groundSensor)
    joint.visible = false;

    coinSetUp();

    doorSetUp();

    walkableGroupSetUp();

    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )
}

function draw() {
    clear()
    // player.changeAni('idle')

    // if(kb.pressing('up')) {
    //     player.changeAni('running')
    // }
    if (isPlaying) {
        world.step();
        background(backgroundImage)
        camera.x = player.x;
        camera.y = player.y;
        setGamePlayVisible(true)

        // display score
        fill(0)
        // stroke(1);
        textSize(60)
        text(`Score: ${score}`, 60, 180)

        fill(0)
        // stroke(1);
        textSize(60)
        text(`Current Level: ${currentLevel + 1}`, 60, 100);

        movement()
    }

    else {
        setGamePlayVisible(false)

        if (hasWon) {
            background(0)
            fill(255)
            textSize(40)
            text(`You Win! Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)

            if (kb.pressed('enter')) {
                isPlaying = false;
                hasWon = false;
                reset()
            }

        }
        else if (isGameOver) {
            background(0)
            fill(255)
            textSize(40)
            text(`Game Over. Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)

            if (kb.pressed('enter')) {
                isPlaying = false;
                isGameOver = false;
                reset();
            }
        }

        else if (intro) {
            background(102, 208, 250);
            fill(255);
            textSize(40);
            text(`Game intro:
            bjabkdsjkkjbdjbjka
            sbkbdskjlbkjbsjkbd
            sjkabsjk`, 400, 400);

            stroke(0);
            strokeWeight(10);
            fill(75, 115, 179);
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188)

            if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                isPlaying = false;
                isGameOver = false;
                intro = false;
                reset();
            }

        }

        else if (changingBackground) {
            background(102, 208, 250);

            stroke(0);
            strokeWeight(10);
            fill(75, 115, 179);
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188)

            fill(255);
            rect(100, 300, 100, 850);
            rect(2350, 300, 100, 850);

            if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                isPlaying = false;
                isGameOver = false;
                changingBackground = false;
                reset();
            }
            else if(mouseIsPressed && mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150){
                    currentBackground = true;
                    currentBackground -= 1;
                    console.log(currentBackground);
                }
            else if(mouseIsPressed && mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150){
                    currentBackground = true;
                    currentBackground += 1;
                    console.log(currentBackground);
                }
            
            if(currentBackground){
                if(currentBackground === 1){
                    image(bgImage, 600, 400);
                }
            }
        }

        else if(changingSkin){
            background(102, 208, 250);

            stroke(0);
            strokeWeight(10);
            fill(75, 115, 179);
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188);

            fill(255);
            rect(100, 300, 100, 850);
            rect(2350, 300, 100, 850);

            if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                isPlaying = false;
                isGameOver = false;
                changingSkin = false;
                reset();
            }
        }

        else {
            gameStart();
        }
    }
}

function gameStart() {
    background(startScreenImage)
    // background(75, 115, 179);
    fill(0);
    textSize(200);
    // textFont(textFont1);
    text('City', 1500, 700)
    text('Catventure', 1200, 950)


    // if(kb.pressed('enter')) {
    //     isPlaying = true;
    //     isGameOver = false;
    //     reset()
    // }

    stroke(0);
    strokeWeight(10);
    fill(75, 115, 179);
    rect(300, 530, 600, 200);

    fill(0);
    textSize(100);
    text('Start Game', 335, 660)

    stroke(0);
    strokeWeight(10);
    fill(75, 115, 179);
    rect(300, 770, 600, 200);

    fill(0);
    textSize(100);
    text('Game Intro', 330, 910);

    stroke(0);
    strokeWeight(10);
    fill(75, 115, 179);
    rect(2000, 70, 450, 100);

    fill(0);
    textSize(80);
    strokeWeight(3);
    text('Background', 2018, 148);

    stroke(0);
    strokeWeight(10);
    fill(75, 115, 179);
    rect(2000, 220, 450, 100);

    fill(0);
    textSize(80);
    strokeWeight(3);
    text('Skin', 2150, 300);

    if (mouseIsPressed && mouseX >= 300 && mouseX <= 900
        && mouseY >= 530 && mouseY <= 730) {
        isPlaying = true;
        isGameOver = false;
        reset();
    }
    else if (mouseIsPressed && mouseX >= 300 && mouseX <= 900
        && mouseY >= 770 && mouseY <= 970) {
        intro = true;
        // background(0)
        // fill(255)
        // textSize(40)
        // text(`game intro:`, width / 2, height / 2)

        // if (kb.pressed('enter')) {
        //     isPlaying = false;
        //     isGameOver = false;
        //     reset()
        // }

    }
    else if (mouseIsPressed && mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 70 && mouseY <= 170) {
        changingBackground = true;
    }

    else if(mouseIsPressed && mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 220 && mouseY <= 320){
            changingSkin = true;
        }
}

function playerSetUp() {
    player = new Sprite(PLAYER_ATTRIBUTES.START_X, PLAYER_ATTRIBUTES.START_Y + 20)
    // player.animation("running", at1Right);
    // player.addAnimation('idle', idleAnimation)
    player.changeAni(cat1Stand);
    // player.changeAni(cat1Right);
    // player.addAnimation('running', runningAnimation)
    player.rotationLock = true;

}

function coinSetUp() {
    coin = new Group()
    coin.w = COIN_ATTRIBUTES.COIN_WIDTH;
    coin.h = COIN_ATTRIBUTES.COIN_HEIGHT;
    coin.tile = '0'
    coin.collider = 'static'
    coinImg.resize(100, 100);
    coin.image = coinImg
    coin.visible = false;

    // remove coins when the player touches them
    player.overlap(coin, function cb(p, c) {
        c.remove();
        coinSound.play()
        score += 1
    })
}

function doorSetUp() {
    door = new Group()
    door.w = 30;
    door.h = 50;
    door.tile = 'x'
    door.collider = 's'
    // door.image = doorImage;
    doorImage.resize(120, 240);
    door.image = doorImage;
    door.visible = false;

    // move to the next level when the player touches the door
    player.overlap(door, function cb(p, d) {
        nextLevel();
    })
}

function walkableGroupSetUp() {
    walkable = new Group()
    walkable.layer = 1;

    floor = new walkable.Group()
    floor.w = TILE_SIZE
    floor.h = TILE_SIZE
    floor.tile = 'f'
    floor.collider = 's'
    floorTile.resize(100, 100);
    floor.image = floorTile

    water = new walkable.Group()
    water.w = TILE_SIZE;
    water.h = TILE_SIZE;
    water.tile = 'w'
    water.collider = 'n'
    waterTile.resize(100, 100);
    water.image = waterTile

    dirt = new walkable.Group()
    dirt.w = TILE_SIZE;
    dirt.h = TILE_SIZE;
    dirt.tile = 'd'
    dirt.collider = 's'
    dirtTile.resize(100, 100);
    dirt.image = dirtTile

    grass = new walkable.Group()
    grass.w = TILE_SIZE;
    grass.h = TILE_SIZE;
    grass.tile = 'g'
    grass.collider = 'n'
    grassTile.resize(100, 100);
    grass.image = grassTile
}

function movement() {
    if (kb.pressing(LEFT_ARROW)) {
        player.vel.x = -PLAYER_ATTRIBUTES.SPEED;
        // player.ani = 'running'
        player.changeAni(cat1Right);
        player.mirror.x = true;
    } else if (kb.pressing(RIGHT_ARROW)) {
        player.vel.x = PLAYER_ATTRIBUTES.SPEED;
        // player.ani = 'running'
        player.changeAni(cat1Right);
        player.mirror.x = false;
    }
    else {
        player.vel.x = 0;
        // player.ani = 'idle'
        // cat1Stand.scale = 5.5;
        // player.changeAni(cat1Stand);
    }
    if (kb.presses('space') && groundSensor.colliding(walkable)) {
        player.vel.y = -PLAYER_ATTRIBUTES.JUMP_FORCE;
    }

    // create friction when the player is on grass or in water
    if (groundSensor.overlapping(grass) || groundSensor.overlapping(water)) {
        player.drag = 10;
        player.friction = 30;
    } else {
        player.drag = 0;
        player.friction = 0;
    }

    // game over when the player falls off
    if (player.y > GAME_BOUND) {
        isPlaying = false;
        isGameOver = true;
    }
    storeData();
}

function nextLevel() {
    if (currentLevel === TILE_MAPS.length - 1) {
        isPlaying = false;
        hasWon = true;
        return;
    }
    currentLevel++;
    player.speed = 0;
    player.x = PLAYER_ATTRIBUTES.START_X;
    player.y = PLAYER_ATTRIBUTES.START_Y;
    tileMap.remove();
    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )
}

function reset() {
    // currentLevel = 0;
    // score = 0;
    player.speed = 0;
    player.x = PLAYER_ATTRIBUTES.START_X;
    player.y = PLAYER_ATTRIBUTES.START_Y;

}

function setGamePlayVisible(bool) {
    player.visible = bool;
    walkable.visible = bool;
    door.visible = bool;
    coin.visible = bool;
}

function storeData() {
    print("waiting")
    if (kb.pressing('s')&& kb.pressing('shift')) {
        localStorage.setItem("currentLevel", currentLevel);
        localStorage.setItem("score", score);
        print(currentLevel,score)
    }
    else if(kb.pressed("r") &&  kb.pressed('shift')){
        localStorage.setItem("currentLevel", 0);
        localStorage.setItem("score", 0);
    }
}