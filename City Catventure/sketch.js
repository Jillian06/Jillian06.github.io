let isPlaying = false;
let isGameOver = false;

let notPlaying = true;

let textFont1;
let isPause = false;

let pauseBotton;

let hasWon = false;
let player, floorTile, grass;
let ground;
// let background;
//let image;
let idleAnimation;
let score = 0;
let currentLevel = 0;

let currentSkin = -3;
let currentSkinPreview = -3;
let skinBackground;

let intro = false;
let introBackground;

let cat1Right;
let cat1Stand;

let cat2Stand;
let cat2Right;

let changingBackground = false;
let backgroundImage;
let bgImage, bgImage1, bgImage2, bgImage3, bgImage4;
let startScreenImage;

let changingSkin = false;

let currentBackground = -1;
let ifCurrentBackground = false;
let backgroundBackground;

let overlay;

const TILE_SIZE = 100;
const GAME_BOUND = 1000;
const PLAYER_ATTRIBUTES = {
    START_X: 100,
    START_Y: 40 + 20,
    HEIGHT: 60,
    WIDTH: 60,
    JUMP_FORCE: 7,
    SPEED: 8
}
const COIN_ATTRIBUTES = {
    COIN_WIDTH: 10,
    COIN_HEIGHT: 10,
}

function generateTileMap(numberOfRows) {
    const numberOfColumns = 16;
    const tileMap = new Array(numberOfRows)
        .fill(null)
        .map(_ => new Array(numberOfColumns).fill(null));

    tileMap[0] = new Array(numberOfColumns).fill('.');
    const randomIndex = Math.floor(Math.random() * numberOfColumns);
    tileMap[0][randomIndex] = 'x';

    for (let i = numberOfRows - 1; i > 0; i--) {
        for (let j = 0; j < numberOfColumns; j++) {
            tileMap[i][j] = generateTile(i, j, numberOfRows, numberOfColumns);
        }
    }

    function generateTile(i, j, numberOfRows, numberOfColumns) {
        // if(i < 0 || i >= numberOfRows || j < 0 || j >= numberOfColumns) {

        // }
        /**
         * rules:
         * 1. G, D, W can only be on top of F
         * 2. top of G, D, W can only be . or 0
         * 3. bottom of F can only be . or 0
         * 4. G, D, W can't be on the left or right of F
         */
        const states = new Set(['f', 'g', 'd', 'w', '0', '.'])
        if (i === numberOfRows - 1) {
            states.delete('g');
            states.delete('d');
            states.delete('w');
        }
        if (i - 1 >= 0 && tileMap[i - 1][j] === 'f') {
            states.delete('g');
            states.delete('d');
            states.delete('w');
            states.delete('f');
        }
        if (i + 1 < numberOfRows && tileMap[i + 1][j] === 'f') {
            states.delete('f');
        }
        if (i + 1 < numberOfRows && tileMap[i + 1][j] !== 'f') {
            states.delete('g');
            states.delete('d');
            states.delete('w');
        }
        if (i + 1 < numberOfRows && (tileMap[i + 1][j] === 'g' || tileMap[i + 1][j] === 'd' || tileMap[i + 1][j] === 'w')) {
            states.delete('g');
            states.delete('d');
            states.delete('w');
            states.delete('f');
        }
        if (j - 1 >= 0 && j + 1 < numberOfColumns && (tileMap[i][j - 1] === 'f' || tileMap[i][j + 1] === 'f')) {
            states.delete('g');
            states.delete('d');
            states.delete('w');
        }
        const randomIndex = Math.floor(Math.random() * states.size);
        return Array.from(states)[randomIndex];
    }

    return tileMap;

}

console.log(generateTileMap(4));




const TILE_MAPS = [
    // generateTileMap(4), 
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
    // idleAnimation = loadAnimation('./assets/2.png', './assets/3.png')
    // runningAnimation = loadAnimation('./assets/4.gif')

    world.gravity.y = 10;

    // background = new Sprite(0, 0, 400, 400, 'n')

    // platform = new Sprite(100, 100)
    // platform.collider = 'k'


    // player.debug = true
    textFont1 = loadFont('assets/Ticketing.ttf');
    startScreenImage = loadImage('./assets/IMG_2120.jpg')
    skinBackground = loadImage('./assets/IMG_2118.jpg')
    backgroundBackground = loadImage('./assets/IMG_2126.jpg')
    introBackground = loadImage('./assets/IMG_2115.jpg')
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

function loadBackground() {
    cat2Licking = loadAnimation('assets/Cat-2-Licking 1.png', { frameSize: [50, 50], frames: 4 });
    cat2Licking.frameDelay = 10;
    cat2Licking.scale = 10;
}

function loadSkin() {
    cat1Skin = loadAnimation('assets/Cat-1-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat1Skin.frameDelay = 8;
    cat1Skin.scale = 10;
    cat2Skin = loadAnimation('assets/Cat-2-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat2Skin.frameDelay = 8;
    cat2Skin.scale = 10;
    cat3Skin = loadAnimation('assets/Cat-3-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat3Skin.frameDelay = 8;
    cat3Skin.scale = 10;
    cat4Skin = loadAnimation('assets/Cat-4-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat4Skin.frameDelay = 8;
    cat4Skin.scale = 10;
    cat5Skin = loadAnimation('assets/Cat-5-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat5Skin.frameDelay = 8;
    cat5Skin.scale = 10;
    cat6Skin = loadAnimation('assets/Cat-6-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat6Skin.frameDelay = 8;
    cat6Skin.scale = 10;
}

function loadplayerRun() {
    cat1Right = loadAnimation('assets/Cat-1-Run.png', { frameSize: [50, 50], frames: 8 });
    // cat1Right.scale = 5.5;
    cat1Stand = loadAnimation('assets/Cat-1-Idle.png', { frameSize: [50, 50], frames: 10 });
    // cat1Stand.scale = 5.5;
    cat2Right = loadAnimation('assets/Cat-2-Run.png', { frameSize: [50, 50], frames: 8 });
    // cat2Right.scale = 5.5;
    cat2Stand = loadAnimation('assets/Cat-2-Idle.png', { frameSize: [50, 50], frames: 10 });
    // cat2Stand.scale = 5.5;
    cat3Right = loadAnimation('assets/Cat-3-Run.png', { frameSize: [50, 50], frames: 8 });
    cat3Stand = loadAnimation('assets/Cat-3-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat4Right = loadAnimation('assets/Cat-4-Run.png', { frameSize: [50, 50], frames: 8 });
    cat4Stand = loadAnimation('assets/Cat-4-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat5Right = loadAnimation('assets/Cat-5-Run.png', { frameSize: [50, 50], frames: 8 });
    cat5Stand = loadAnimation('assets/Cat-5-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat6Right = loadAnimation('assets/Cat-6-Run.png', { frameSize: [50, 50], frames: 8 });
    cat6Stand = loadAnimation('assets/Cat-6-Idle.png', { frameSize: [50, 50], frames: 10 });

    // cat1.addAni("right", "assets/Cat-1-Run.png", { frameSize: [256, 256], frames: 8 });
    // nausicaa.addAni("left", "playerRun/IMG_runLeft.png", { frameSize: [256, 256], frames: 4 });
    // nausicaa.addAni("right", "playerRun/IMG_runRight.png", { frameSize: [256, 256], frames: 4 });
    // nausicaa.addAni("up", "playerRun/IMG_runBack.png", { frameSize: [256, 256], frames: 4 });
}

function setup() {
    // pauseSetup();
    // pauseBotton.visible = false;
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
        score = int(localStorage.getItem("score"));
    }


    createCanvas(2560, 1440);
    // overlay = createGraphics(2560, 1440);
    backgroundImage = bgImage3;
    // backgroundMusic.play()
    isPlaying = false;
    // world.autoStep = false;

    loadBackground();
    loadSkin();
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
        if (isPause === false) {
            world.step();
            background(backgroundImage);
            camera.x = player.x;
            camera.y = player.y;
            setGamePlayVisible(true);

            // display score
            // textFont(textFont1);
            fill(175, 115, 179)
            strokeWeight(5);
            textSize(60)
            text(`Score: ${score}`, 2100, 180)

            fill(175, 115, 179)
            strokeWeight(5);
            textSize(60)
            text(`Current Level: ${currentLevel + 1}`, 2100, 100);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
        }
        else{
            fill(75, 115, 179);
            rect(100, 100, 100, 100);
        }

        else {
            fill(75, 115, 179);
        }
        rect(100, 100, 300, 100);

        fill(0);
        textSize(100);
        strokeWeight(1);
        text('Pause', 110, 188)

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
                currentLevel = 0;
                reset()
            }

        }

        else if (isGameOver) {
            background(0)
            fill(255)
            textSize(40)
            text(`Game Over. Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)
            player.vel.x = 0;

            if (kb.pressed('enter')) {
                isPlaying = false;
                isGameOver = false;
                hasWon = false;
                intro = false;
                changingBackground = false;
                changingSkin = false;
                reset();
            }
        }

        else if (intro) {
            image(introBackground, 0, 0, 2560, 1440);
            fill(275, 115, 179);
            textSize(40);
            text(`Game intro:
On the main interface, you can click the game start, select the
 game background, and the three function keys of character skin.

Game starts:
1. The left and right arrows control the character to move left and right, 
the up arrow controls the character to jump, and the character will fall 
naturally due to gravity.
2. There are different terrains in the game. Movement under special terrains 
will encounter greater resistance and you can explore by yourself.
3. Game points and levels are recorded in the upper left corner of the game
 page.
4. You can use shift+s to save the game record on the website, and 
shift+r to cancel the record.
5. The difficulty of the first 10 levels of the game gradually 
increases, and the 11th level is added as a bounty level. The
 difficulty of the random terrain is greatly increased. Be careful of falling off the cliff at the beginning of the game.

Change background and skin:
1. Click on the left and right rectangles to change pictures or 
animations.
2. Click on the picture or animation of the desired background or
 skin to change it.
3. Press the exit key in the upper left corner to return to the
 main page.`, 300, 200);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179);
            }
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
            image(backgroundBackground, 0, 0, 2560, 1440);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179);
            }
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188)

            fill(255);
            rect(100, 300, 100, 850);
            rect(2350, 300, 100, 850);

            if (ifCurrentBackground) {
                if (currentBackground === -2) {
                    image(bgImage4, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 250, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage4;
                        }
                    }
                }
                else if (currentBackground === -1) {
                    image(bgImage3, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage3;
                        }
                    }
                }
                else if (currentBackground === 0) {
                    image(bgImage, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage;
                        }
                    }
                }
                else if (currentBackground === 1) {
                    image(bgImage1, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage1;
                        }
                    }
                }
                else if (currentBackground === 2) {
                    image(bgImage2, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage2;
                        }
                    }
                }
                else if (currentBackground < -2) {
                    fill(0);
                    textSize(100);
                    strokeWeight(1);
                    text(`No more backgrounds, 
    please swipe right.`, 830, 688);
                    currentBackground = -3;
                }
                else if (currentBackground > 2) {
                    fill(0);
                    textSize(100);
                    strokeWeight(1);
                    text(`No more backgrounds, 
    please swipe left.`, 830, 688)
                    currentBackground = 3;
                }
            }
        }

        else if (changingSkin) {
            image(skinBackground, 0, 0, 2560, 1440);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179);
            }
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188);

            fill(255);
            rect(100, 300, 100, 850);
            rect(2350, 300, 100, 850);

            if (currentSkinPreview === -3) {
                animation(cat1Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -3;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === -2) {
                animation(cat2Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -2;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === -1) {
                animation(cat3Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -1;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 0) {
                animation(cat4Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 0;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 1) {
                animation(cat5Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 1;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 2) {
                animation(cat6Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 2;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview < -3) {
                fill(0);
                textSize(100);
                strokeWeight(1);
                text(`No more skins, 
please swipe right.`, 830, 688);
                currentSkinPreview = -4;
            }
            else if (currentSkinPreview > 2) {
                fill(0);
                textSize(100);
                strokeWeight(1);
                text(`No more skins, 
please swipe left.`, 830, 688)
                currentSkinPreview = 3;
            }

        }

        // else if (isPause) {
        //     pauseBotton.visible = true;
        // }

        else {
            gameStart();
        }
    }
}

function mousePressed() {
    if (isPlaying) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            // setGamePlayVisible(false)
            // else if(isPause){
            // background(0)
            // fill(255)
            // textSize(40)
            // text(`Game Over. Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)
            // player.vel.x = 0;

            //     if (kb.pressed('enter')) {
            //         isPlaying = false;
            //         isGameOver = false;
            //         hasWon = false;
            //         intro = false;
            //         changingBackground = false;
            //         changingSkin = false;
            //         reset();
            //     }
            // }
            isPause = true;
            //tiles
            // reset();
        }
    }
    if (changingBackground) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            isPlaying = false;
            isGameOver = false;
            changingBackground = false;
            reset();
        }

        else {
            if (mouseIsPressed && mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                ifCurrentBackground = true;
                currentBackground -= 1;
                console.log(currentBackground);
            }
            else if (mouseIsPressed && mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                ifCurrentBackground = true;
                currentBackground += 1;
                console.log(currentBackground);
            }
        }
    }
    if (changingSkin) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            isPlaying = false;
            isGameOver = false;
            changingSkin = false;
            reset();
        }

        else {
            if (mouseIsPressed && mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                currentSkinPreview -= 1;
            }
            else if (mouseIsPressed && mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                currentSkinPreview += 1;
            }
        }
    }
}

function gameStart() {
    // background(startScreenImage)
    // background(75, 115, 179);
    image(startScreenImage, 0, 0, 2560, 1440)
    animation(cat2Licking, 2350, 1368);

    fill(215, 115, 179, 220);
    strokeWeight(8);
    stroke(175, 115, 179, 320);
    textSize(200);
    // textFont(textFont1);
    text('CITY', 1500, 700)
    text('CATVENTURE', 1100, 950)


    // if(kb.pressed('enter')) {
    //     isPlaying = true;
    //     isGameOver = false;
    //     reset()
    // }

    stroke(0);
    strokeWeight(10);
    // print(mouseX, mouseY);
    if (mouseX >= 300 && mouseX <= 900
        && mouseY >= 530 && mouseY <= 730) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(300, 530, 600, 200);

    fill(175, 115, 179);
    stroke(0);
    textSize(100);
    text('Start Game', 335, 660)

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 300 && mouseX <= 900
        && mouseY >= 770 && mouseY <= 970) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(300, 770, 600, 200);

    fill(175, 115, 179);
    stroke(0);
    textSize(100);
    text('Game Intro', 330, 910);

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 70 && mouseY <= 170) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(2000, 70, 480, 100);

    fill(175, 115, 179);
    stroke(0);
    textSize(80);
    strokeWeight(5);
    text('Background', 2014, 148);

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 220 && mouseY <= 320) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(2000, 220, 480, 100);

    fill(175, 115, 179);
    stroke(0);
    textSize(80);
    strokeWeight(5);
    text('Skin', 2155, 300);

    if (mouseIsPressed && mouseX >= 300 && mouseX <= 900
        && mouseY >= 530 && mouseY <= 730) {
        // overlay.clear();    
        // overlay.fill(0);
        // overlay.rect(mouseX, mouseY, 300, 200);
        isPlaying = true;
        groundSensor.x = player.x;
        groundSensor.y = player.y + player.h / 2;
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
        ifCurrentBackground = true;
    }

    else if (mouseIsPressed && mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 220 && mouseY <= 320) {
        changingSkin = true;
    }
    // image(overlay, 0, 0)
}

function playerSetUp() {
    player = new Sprite(PLAYER_ATTRIBUTES.START_X, PLAYER_ATTRIBUTES.START_Y + 20)
    // player.animation("running", at1Right);
    // if(currentSkin === -3){
    //     player.addAnimation('idle', cat1Stand)
    //     player.addAnimation('running', cat1Right)
    // }
    // else if(currentSkin === -2){
    //     player.addAnimation('idle', cat2Stand)
    //     player.addAnimation('running', cat2Right)
    // }

    setSkin();
    // player.changeAni(cat1Right);
    // player.addAnimation('running', runningAnimation)
    player.rotationLock = true;
    player.scale = 5.5;
    player.width = PLAYER_ATTRIBUTES.WIDTH;
    player.height = PLAYER_ATTRIBUTES.HEIGHT;
    // player.debug = true;

}

function setSkin() {
    if (currentSkin === -3) {
        player.addAnimation('idle', cat1Stand)
        player.addAnimation('running', cat1Right)
    }
    else if (currentSkin === -2) {
        player.addAnimation('idle', cat2Stand)
        player.addAnimation('running', cat2Right)
    }
    if (currentSkin === -1) {
        player.addAnimation('idle', cat3Stand)
        player.addAnimation('running', cat3Right)
    }
    else if (currentSkin === 0) {
        player.addAnimation('idle', cat4Stand)
        player.addAnimation('running', cat4Right)
    }
    if (currentSkin === 1) {
        player.addAnimation('idle', cat5Stand)
        player.addAnimation('running', cat5Right)
    }
    else if (currentSkin === 2) {
        player.addAnimation('idle', cat6Stand)
        player.addAnimation('running', cat6Right)
    }
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

// class Walkable {
//     constructor(walkableGroup, tileWidth, tileHeight, tile, collider, tileImage) {


//     }
// }

function walkableGroupSetUp() {
    walkable = new Group()
    walkable.layer = 1;
    // walkable.debug = true;

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
        // if(currentSkin === -3){
        //     player.changeAni(cat1Right);

        // }
        // else if(currentSkin === -2){
        //     player.changeAni(cat2Right);
        // }
        player.ani = 'running'
        player.mirror.x = true;
    } else if (kb.pressing(RIGHT_ARROW)) {
        player.vel.x = PLAYER_ATTRIBUTES.SPEED;
        // player.ani = 'running'
        // if(currentSkin === -3){
        //     player.changeAni(cat1Right);
        // }
        // else if(currentSkin === -2){
        //     player.changeAni(cat2Right);
        // }
        player.ani = 'running'
        player.mirror.x = false;
    }
    else {
        player.vel.x = 0;
        player.ani = 'idle'
        // cat1Stand.scale = 5.5;
        // player.changeAni(cat1Stand);
    }
    if (kb.presses(UP_ARROW) && groundSensor.colliding(walkable)) {
        player.vel.y = -PLAYER_ATTRIBUTES.JUMP_FORCE;
    }

    // create friction when the player is on grass or in water
    if (groundSensor.overlapping(grass) || groundSensor.overlapping(water)) {
        player.drag = 2;
        player.friction = 5;
    } else {
        player.drag = 0;
        player.friction = 0;
    }

    // game over when the player falls off
    if (player.y > GAME_BOUND) {
        isPlaying = false;
        isGameOver = true;
    }
    // storeData();
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
    tileMap.remove();
    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )

}

function setGamePlayVisible(bool) {
    player.visible = bool;
    walkable.visible = bool;
    door.visible = bool;
    coin.visible = bool;
}

function storeData() {
    // print("waiting")
    if (kb.pressing('s') && kb.pressing('shift')) {
        localStorage.setItem("currentLevel", currentLevel);
        localStorage.setItem("score", score);
        print(currentLevel, score)
    }
    else if (kb.pressed("r") && kb.pressed('shift')) {
        localStorage.setItem("currentLevel", 0);
        localStorage.setItem("score", 0);
    }
}

