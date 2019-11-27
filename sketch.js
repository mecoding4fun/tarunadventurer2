var hero, hero_dead, hero_run,hero_attack,hero_jump;
var cave1,cave2,cave3,cave4;
var backround_image,background_image;
var back
var stepsGroup;
var step_image;
var goldenIdol,idol_image;
var ground,ground2,ground3,ground4,ground5,ground6;
var bomb_image;
var bombsGroup; 
var inv_Steps;
var inv_steps2;
var Game_over,gameover_image;
var restart,restart_button;
var stand_ground;
var score = 0;

var PLAY = 1;
var END = 0;
var GameState = PLAY;


function preload() {
 hero_run = loadAnimation("adventurer-run-00.png","adventurer-run-01.png","adventurer-run-02.png","adventurer-run-03.png","adventurer-run-04.png","adventurer-run-05.png");
  

  hero_dead = loadAnimation("adventurer-die-00.png","adventurer-die-01.png","adventurer-die-02.png","adventurer-die-03.png","adventurer-die-04.png","adventurer-die-05.png","adventurer-die-06.png");
  
    hero_attack = loadAnimation("adventurer-attack3-00.png  ","adventurer-attack3-01.png","adventurer-attack3-02.png","adventurer-attack3-03.png","adventurer-attack3-04.png","adventurer-attack3-05.png");

  hero_jump = loadAnimation("adventurer-jump-00.png","adventurer-jump-01.png","adventurer-jump-02.png","adventurer-jump-03.png");
  
  backround_image = loadImage("super_pixel_cave_wallpaper_A.png");
  backround_image2 = loadImage("super_pixel_cave_wallpaper_B.png");
  backround_image3 = loadImage("super_pixel_cave_wallpaper_C.png");
    backround_image4 = loadImage("super_pixel_cave_wallpaper_D.png");

  
  step_image = loadImage("terrain_platform_center.png");
  
  idol_image = loadImage("gp1mMbs.gif");
  
  bomb_image = loadImage("bomb.png");
  
  gameover_image = loadImage("gameOver.png");
  
  

  

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  hero = createSprite(width - 20, 310, 20, 20);
    hero.addAnimation("run", hero_run);
  hero.addAnimation("dead", hero_dead);
      hero.addAnimation("attack", hero_attack);
    hero.addAnimation("jump", hero_jump);
  hero.scale = 2;
  hero.setCollider("circle",0,0,10);
  
  hero.velocityX = 3;
  hero.velocityY = 1;

  
  goldenIdol = createSprite(290,150,20,20);
  goldenIdol.x = random(width - 30,width - 450);
  goldenIdol.y = random(height - 190,height - 490);
  goldenIdol.addImage("gold",idol_image);
  goldenIdol.scale = 0.03;
  
  ground1 = createSprite(width/2 - width/2.2 ,height/2 + 190,width/1.3 - width,10);
   ground1.visible = false;

  
  
  
  
    ground2 = createSprite(width/2 - width/4 ,height/2 + 160,width/1.3- width,10);
    ground2.visible = false;

  
      ground3 = createSprite(width/2 - width/6,height/2 + 200,width/1.3- width,10);
     ground3.visible = false;

    ground4 = createSprite(width/2 + width/2.4,height/2 + 100,width/1.3- width,10);
     ground4.visible = false;

    ground5 = createSprite(width/2 + width/10,height/2 + 260,width/1.3- width,10);
     ground5.visible = false;

      ground6 = createSprite(width/2 + width/3.7,height/2 + 150,width/1.3- width,10);
   ground6.visible = false;

  
  
  stand_ground = createSprite(width/2 + width/6.2,height/2 + 200,10,90);
     stand_ground.visible = false;


  
  
  
  
  inv_steps = createSprite(width/2 + width/17,height/2 + 25,width/1.3- width,10);
   inv_steps.visible = false;

  
  inv_steps2 = createSprite(width/2 - width/3.2,height/2 - 30,width/1.3- width,10);
   inv_steps2.visible = false;

  
  Game_over = createSprite(width/2,height/2,70,70);
  Game_over.visible = false;
  Game_over.addImage("over",gameover_image);
  
stepsGroup = new Group(); 
bombsGroup = new Group();  
  

}
function draw() {
  background(backround_image);
  if (hero.x > 600){
  background(backround_image2);
}
    if (score > 199){
  background(backround_image3);
}
  
  if (background(backround_image2) && hero.x > 600){
  background(backround_image4);
  }
  
      hero.velocityX = 3;


  
  if(GameState === PLAY){
  
    hero.collide(ground1);
    hero.collide(stepsGroup);
    hero.collide(inv_steps);
    hero.collide(inv_steps2);
    hero.collide(ground2);
    hero.collide(ground3);
    hero.collide(ground4);
    hero.collide(ground5);
        hero.collide(ground6);

    hero.collide(stand_ground);
    
    textSize(20)
    text("score:" + score ,40,40);
    
    if(score > 199){
    stage2();
    }
    
    
    hero.velocityX = 3;
    
    if (hero.x > 800){
    hero.x = 20;
      hero.y = 310;
    }
    
    
  
if(keyDown("space")  ||  touches.length > 0 ) {
    hero.velocityY = -10;
    touches = []
  }
      if(hero.isTouching(bombsGroup) && GameState === PLAY){
    GameState = END;
    }
  
  
  if( hero.y < 350) {
    hero.velocityY = hero.velocityY + 0.8

  }

    if(hero.isTouching(goldenIdol)){
  goldenIdol.x = random(width - 30,width - 450);
  goldenIdol.y = random(height - 190,height - 490);
      
      score = score + 10;
      
      
    }
  if(bombsGroup.isTouching(hero) && GameState === PLAY){  
   GameState = END;
    }
    

    


  spawnSteps();
    
    
 spawnBombs();
    
  }
   if(GameState === END){
     hero.x = 20;
    hero.y = 310;
hero.changeAnimation("dead",hero_dead);
  Game_over.visible = true;
 }

  drawSprites();


}
function spawnSteps(){
  if (frameCount % 60 === 0) {
    var steps = createSprite(600,300,40,10);
    steps.y = random(80,800);
    steps.addImage(step_image);
     steps.scale = 1.5;
    steps.velocityX = -4;
    
    
  steps.lifetime = 200;
    
    
    
    stepsGroup.add(steps);
  }
}

function spawnBombs(){
if (frameCount % 20 === 0){
var bombs = createSprite(400,5,30,30);
  bombs.addImage(bomb_image);
  bombs.scale = 0.5;
  
  bombs.x = random(0,800);   
  bombs.velocityY = 4; 
  bombsGroup.add(bombs);
}
}

function stage2(){
if (frameCount % 10 === 0){
var bombs = createSprite(400,5,30,30);
  bombs.addImage(bomb_image);
  bombs.scale = 0.5;
  
  bombs.x = random(0,windowWidth);   
  bombs.velocityY = 4; 
  bombsGroup.add(bombs);
}
hero.x = 20;
  hero.y = 310;
}
