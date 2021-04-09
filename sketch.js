var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var position,database;


function preload(){
   bg =loadImage("images/cityImage.png");
   balloonImage1=loadAnimation("images/hotairballoon1.png");
   balloonImage2=loadAnimation("images/hotairballoon1.png","images/hotairballoon1.png",
   "images/hotairballoon1.png","images/hotairballoon2.png","images/hotairballoon2.png",
   "images/hotairballoon2.png","images/hotairballoon3.png","images/hotairballoon3.png","images/hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value",readHeight,showError);




  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
     updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
   updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
   updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
   balloon.scale = balloon.scale - 0.001;
  }
  else if(keyDown(DOWN_ARROW)){
   updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale = balloon.scale+0.001;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref("balloon/height").set({
      "x": height.x+x,
      "y" : height.y + y
  }
  )
  
  }

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
  
  
  
  }
  
  function showError(){
  console.log("Error in writing to the database");
  }
  
  
