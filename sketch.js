var tower,towerImg;
var door,doorImg,doorG;
var climber,climberImg,climberG;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockG;
var gameState="play";
var spookySound;


function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;

  doorG=new Group ();
  climberG=new Group();
  invisibleBlockG=new Group();

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

}

function draw() {
  background(0);

  if(gameState==="play"){
    if(tower.y>400){
      tower.y=300;
    }

  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }

  ghost.velocityY+=0.8;

  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }

  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }

  if(climberG.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if(invisibleBlockG.isTouching(ghost) || ghost.y>600 ){
    ghost.destroy();
    gameState="end";
  }

  spawnDoors();

  drawSprites();
}

  if(gameState==="end"){
    textSize(30);
    fill("yellow");
    stroke("green");
    textFont("Bungee");
    text("Game Over",230,250);

  }

}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);

    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);

    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;

    door.x=Math.round(random(120,400));
    door.velocityY=1;

    climber.x=door.x;
    climber.velocityY=1;

    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;

    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;

    doorG.add(door);
    climberG.add(climber);
    invisibleBlockG.add(invisibleBlock);

    invisibleBlock.debug=true;

    ghost.depth=door.depth;
    ghost.depth+=1;


  }
}
