var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var ground, gameState = PLAY;
var score = 0
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png")
  backImage = loadImage("jungle.jpg")

}



function setup() {
  canvas = createCanvas(500,400,300,300);
  ground = createSprite(0,0, 2000, 1800);
  ground.addImage(backImage);
  ground.velocityX = -1

  invisibleGround = createSprite(400, 300, 900, 20);
  invisibleGround.visible = false;

  monkey = createSprite(60, 250, 20, 50);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;

  gameOver1 = createSprite(250,200,20,20);
  gameOver1.addImage(gameOverImg)
  gameOver1.visible=false;

  bananasGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("green");


  if (ground.x < 0) {
    ground.x = 400
  }
  drawSprites();

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 180) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if ((monkey.isTouching(bananasGroup))) {
      score = score + 1
      banana.destroy();
      monkey.scale = monkey.scale+0.05
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    stroke("white");
    textSize("20");
    fill("white");
    survivalTime = Math.ceil(frameCount / frameRate())
    text("SURVIVAL TIME =" + survivalTime, 100, 50);

    stroke("red")
    textSize("20")
    fill("red");
    text("score :" + score, 300, 50)

    bananas();
    obstacles();
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
      monkey.scale=monkey.scale-0.1
    }

  } else if (gameState === END) {

    ground.velocityX = 0;
    stroke("black");
    textSize("28");
    fill("black")
    
    monkey.velocityX = 0;
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
    gameOver1.visible=true;
  }

  monkey.collide(invisibleGround)

  
    




}

function obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(220, 245, 60, 60);
    obstacle.velocityX = -4
    obstacle.lifetime = 590;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 140)
    obstaclesGroup.add(obstacle)
  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(220, 320, 20, 20)
    banana.addImage(bananaImage);
    banana.scale = 0.090;
    banana.velocityX = -4
    bananasGroup.add(banana);
    banana.y = Math.round(random(100, 180));
  }
}