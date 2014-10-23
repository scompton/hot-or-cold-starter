
var count;
var previousDiff = NaN;
var initialMessage;
var guessText;
var feedback;
var userGuess;
var guessList;

$(document).ready(function(){

  userGuess = $("#userGuess");
  guessList = $("#guessList");
  feedback = $("#feedback");
  initialMessage = feedback.text();
  //guessText = $("userGuess").attr("placeholder");
  //guessText = $("userGuess").prop("placeholder");
  //console.log("initialMessage="+initialMessage+", guessText="+guessText);
  var answer = newGame();
	
	/*--- Display information modal box ---*/
  $(".what").click(function(){
    $(".overlay").fadeIn(1000);
 	});

 	/*--- Hide information modal box ---*/
 	$("a.close").click(function(){
 		$(".overlay").fadeOut(1000);
 	});

  $(".new").click(function(){
    //location.reload(false);
    newGame();
  });

  $("#guessButton").click(function(e) {
    var guess = parseInt(userGuess.val());
    //console.log("answer="+answer+", guess="+guess);
    if (isNaN(guess) || guess<1 || guess>100) return;

    setCount(++count);

    testGuess(guess,answer);

    e.preventDefault();
  });

});

function setCount(count) {
  $("#count").text(count);
}

function newGame() {
  //console.log("newGame called");
  userGuess.val("");
  guessList.empty();
  feedback.text(initialMessage);
  count = 0;
  setCount(count);
  answer = randomInt(1,100);
  //console.log("answer="+answer);
  return answer;
}

function testGuess(guess,answer) {
  var message;
  var diff = Math.abs(answer-guess);
  if (diff==0) {
    message = "Got it!";
  } else if (isNaN(previousDiff)) {
    if (diff>=50) message = "Ice cold!";
    else if (diff>=30 && diff<50) message = "Cold";
    else if (diff>=20 && diff<30) message = "Warm";
    else if (diff>=10 && diff<20) message = "Hot";
    else message = "Very hot!";
  } else if (diff<previousDiff) {
    message = "Warmer";
  } else {
    message = "Colder";
  }
  previousDiff = diff;

  feedback.text(message);
  guessList.append("<li>"+guess+"</li>");
}

function randomInt(min, max) {
  var n = max-min+1;
  return Math.floor(min+(Math.random()*n));
}
