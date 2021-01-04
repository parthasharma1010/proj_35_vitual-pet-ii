var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood, fedTime, lastFed;
var foodObj;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  foodObj=new Food();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Feed the Dog");
  addFood.position(800,95);
  addFeed.mousePressed(addFoods);
}

function draw() {  
  background(46,139,87);
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12) {
    text("Last Feed :" + lastFed %12 + "PM",350,30);
  } else if (lastFed==0) {
    text("Last Feed : 12 AM", 350,30);
  } else {
    text("Last Feed :" + lastFed + "AM",350,30);
  }
}

foodObj.display();    

    drawSprites();
 
    

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStok(foodS);
}

function feedDog() {
  dog = addImage(happyDog);
  foodObj.updateFoodStok(foodObj.getFoodStock()-1);
  database.ref('/').update( {
    Food : foodObj.getFoodStock(),
    FedTime: hour()
  })
}
function addFoods() {
  foodS ++;
  database.ref('/').update( {
    Food: foodS
  })
}