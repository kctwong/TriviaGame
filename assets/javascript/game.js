

var questionBank = [
    {
		question: "When was 'Lego' founded?", 
		choice: ["1926", "1932", "1940", "1951"],
		answer: 1,
	 },
	 {
	 	question: "'Lego' comes from the Danish term 'LEg GOdt'. What do these two words mean in English?", 
		choice: ["play well", "go higher", "play children", "building block"],
		answer: 0,
	 }, 
	 {
	 	question: "Which 'Lego toy for children under the age of five was invested in 1967?", 
		choice: ["Grabbo", "Dacta", "Duplo", "Le-Baby" ],
		answer: 2,
	}

]


var correctCount = 0,
    wrongCount = 0,
    unanswerCount = 0,
    timer = 5,
    intervalId,
    running = false,
    array= [],
    userGuess = "",
    index,
    pick;


$("#reset").hide();
$("#start").on("click", function(){
    $("start").hide();
    displayQuestion;
    runTimer;
    for (i=0; i<questionBank.length;i++){
        array.push(questionBank[i]);
    }
});

// timer start


function runTimer (){
    if(!running){
        intervalId = setInterval(countDown, 1000);
        running = true;
    }
};

// time counts down

function countDown (){
    $("#timeleft").text("Time Remaining:" + timer);
    timer --;

    if (timer === 0){
        unanswerCount++;
        running = false;
        clearInterval(intervalId);
        $("#questionblock").text("Time is up!");
        $("#answerblack").text("The correct answer was: " + pick.choice[pick.answer]);
    }
};

function displayQuestion(){
    index = Math.floor(Math.random()*questionBank.length);
    pick = questionBank[index];

    $("#questionBox").text(pick.question);
        for (i=0; i<pick.choice.length; i++){
            var a = $("<div>");
            a.addClass("answerChoice");
            a.attr("guessValue", i);
            a.text(pick.choice[i]);
            $("#answerBox").append(a); 

        };
};

//click function to choose answers
$(".answerChoice").on("click", function(){
    userGuess = parseInt($(this).attr("guessValue"));
        if (userGuess === pick.answer){
            running = false;
            clearInterval(intervalId);
            correctCount++;
            userGuess = "";
            $("#questionBox").text("Correct!");
        }
        else {
            running = false;
            clearInterval(intervalId);
            wrongCount++;
            userGUess = "";
            $("#questionBox").text("Wrong!");
            $("#questionblock").text("The correct answer was: " + pick.choice[pick.answer]);         
        }
})


$("#reset").on("click", function(){
    $("reset").hide();
    $("questionBox").empty();
    $("answerBox").empty();
    for (var i=0; i< array.length; i++){
        questionBank.push(array[i]);
    }
    runTimer();
    displayQuestion();

});