
// Variables 

// Questions, choices and answers       
var questions = [{
    question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
    choices: ["alertBox(“Hello DataFlair!”);", "alert(Hello DataFlair!);", "msgAlert(“Hello DataFlair!”);", "alert(“Hello DataFlair!”);"],
    correctAnswer: 3
}, {
    question: "How do you find the minimum of x and y using JavaScript?",
    choices: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
    correctAnswer: 1
}, {
    question: "Which of the following statements will throw an error?",
    choices: ["var fun = function bar( ){ }", "var fun = function bar{ }", "function fun( ){ }"],
    correctAnswer: 1
}, {
    question: "Which JavaScript label catches all the values, except for the ones specified",
    choices: ["catch", "label", "try", "default"],
    correctAnswer: 3
}, {
    question: "Which are the correct if statements to execute certain code if “x” is equal to 2?",
    choices: ["if(x 2)", "if(x = 2)", "if(x == 2)", "if(x != 2 )"],
    correctAnswer: 2
}];

// Variables for storing numbers of correct questions
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var initialsValue = 2;
var initialsText = ""
var startText = "Try to answer the following code related questions within the time limit, keep in time that incorrect answers will penalize your time by 10 seconds";


//Start quiz

// Fully loads HTML document before initializing controls
$(document).ready(function () {
        
    // Display the introduction text and start button
    $('.question').show();
    $('.question').text(startText);
    $("#nextButton").hide();
    $("#saveButton").hide();
    $(".result").hide();
    $(this).find(".quizMessage").hide();

    // Jquery eventListener triggers loading quiz content in via startQuiz function
    $(this).find("#startButton").on("click", function () {
        startQuiz()
    });   

    // Jquery eventListener triggers dialog prompt asking for user initals + pre-populates with score
    $(this).find("#saveButton").on("click", function () {

        var savedInitials = prompt("You got " + correctAnswers + " correct answers add your initials and click OK to save");
        if (savedInitials = null) {
            return;
        }
        else if (savedInitials == initialsValue) {
            localStorage.setItem(initialsText == savedInitials);
            console.log(initialsText);
        }
    }); 

        $(this).find("#nextButton").on("click", function () {

            if (!quizOver) {

                value = $("input[type='radio']:checked").val();
            
                if (value == undefined) {
                    $(document).find(".quizMessage").text("Please choose an answer from the options");
                    $(document).find(".quizMessage").show();

                } else {
                    // $(document).find(".quizMessage").hide();
            
                    if (value == questions[currentQuestion].correctAnswer) {
                        correctAnswers++;
                        // localStorage.setItem(correctAnswers);
                    }

                    else if (value !== questions[currentQuestion].correctAnswer){
                            displayIncorrectAnswer()
                        }
            
                    currentQuestion++; // First question has already been displayed so increment to next
                    if (currentQuestion < questions.length) {
                        displayCurrentQuestion();
                        displayScore();

                    // quiz is over and total score is displayed - option to save score is shown
                    } else {
                        displayTotalScore();
                        quizOver = true;
                        $("#nextButton").text("Play again?");
                        $("#saveButton").show();
                        $(".choiceList").hide();
                    }
                }

            // reset the quiz and update nextButton text + hide save option
            } else { 
                quizOver = false;
                resetQuiz();
                displayCurrentQuestion();
                $("#nextButton").text("Next question");
                $("#saveButton").hide();
            }
        });
    });
    
        // This displays the current question AND the choices
        function displayCurrentQuestion() {
        
            console.log("In display current Question");
        
            var question = questions[currentQuestion].question;
            var questionClass = $(document).find(".quizContainer > .question");
            var choiceList = $(document).find(".quizContainer > .choiceList");
            var numChoices = questions[currentQuestion].choices.length;
        
            // Set the questionClass text to the current question
            $(questionClass).text(question);
        
            // Remove all current <li> elements (if any)
            $(choiceList).find("li").remove();
        
            var choice;
            for (i = 0; i < numChoices; i++) {
                choice = questions[currentQuestion].choices[i];
                $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
            }
        }

// Sets up UI ready for quiz, starts timer, loads questions and controls
        function startQuiz() {
            displayCurrentQuestion();
            fiveMinutes();
            $("#counter").css("color", "white");
            $("#nextButton").show();
            $("#startButton").hide();
        }

// Resets the question and answer variables to play quiz again     
        function resetQuiz() {
            currentQuestion = 0;
            correctAnswers = 0;
            hideScore();
            resetTimer();
            $(".choiceList").show();
        }
        
// Displays score when a question is answered correctly
        function displayScore() {
            $(document).find(".quizContainer > .result").text("Correct answer!");
            $(".result").css("color", "green");
            $(document).find(".quizContainer > .result").show();
        }

// Displays message that answer is incorrect - updates timer to remove 10s from current time elapsed  - NEED HELP HERE
        function displayIncorrectAnswer() {
            $(document).find(".quizContainer > .result").text("Incorrect answer, 10 seconds have been removed from your quiz time");
            $(document).find(".quizContainer > .result").show();
            $(".result").css("color", "red");
            $(document).find("#counter").setInterval()(minutes, seconds, - 10000);
            currentQuestion++;
        }

// Displays total answers at end of the quiz and prompts if the user wants to save their score
        function displayTotalScore() {
            $(document).find(".quizContainer > .result").text("Your total score is: " + correctAnswers + " out of: " + questions.length);
            $(document).find(".quizContainer > .result").show();
            $(".result").css("color", "black");
            $('.question').text("would you like to save your score?");
        }

// Hides the result html div
        function hideScore() {
            $(document).find(".result").hide();
        }

// Sets the time allotted for the countdown timer 
        function fiveMinutes() {
            var fiveMinutes = 60 * 5,
            display = document.querySelector('#counter');
            startTimer(fiveMinutes, display);
        }

//  Resets the timer to 0 - NEED HELP HERE
        function resetTimer() {
            clearInterval(minutes, seconds);
            display.textContent = "00:00";
        }

//  Countdown timer function
        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
        
                display.textContent = minutes + ":" + seconds;
        
                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }
