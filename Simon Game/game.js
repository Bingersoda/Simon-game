

var buttomColour = ["red","blue","green","yellow"];

var gamePattern = [];

var useClickedPattern = [];

var started = false;// the initial condition is false

var level = 0 ; //the begining level is 0

$(document).keypress(function(){
  if(!started){ //when the key pressed, and !started = true, it will take the if loop, then change the started to true. so next time the key pressed, !started = false, it will not carry on the if condition.
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});


//when the button is clicked, the button flashes and make sounds.

$(".btn").click(function handler(event){

  var userChosenColour = $(this).attr("id");

  useClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(useClickedPattern.length-1);
  //call the method when click has happend.

});

//check answer list

function checkAnswer(currentLevel){

//check the most recent answer is right;
  if (gamePattern[currentLevel]=== useClickedPattern[currentLevel]){
      console.log("success");
      //check if this sequence has done,we can delay some time and start nex sequence.
      if (useClickedPattern.length === gamePattern.length ){

        setTimeout(function(){
          nextSequence();
        },1000);
          }
  }else{
    console.log("wrong");

//when the answer is wrong, play the wrong soud.
    playSound("wrong");
    //apply the game-over style to the body
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

//change the tile
    $("#level-title").text("Game Over, Press Any Key to Restart");

    starOver();
  }

}

//new function to restart the game
function starOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//the button can automatically flashes and make sounds.

function nextSequence() {

//once the next sequence is called, we need to clear the sequence.
  useClickedPattern = [];

  level++;
  //every time the sequence carried out, the level +1

  $("#level-title").text("Level "+level); // change the title to next level.

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttomColour[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour)

}

//how to play sounds.

function playSound(name){

var audio = new Audio("sounds/"+name+".mp3");
audio.play();

}


// color

function animatePress(currenColor){
  $("#"+currenColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currenColor).removeClass("pressed");
  },100);
}
