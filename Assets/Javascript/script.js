
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
var initials = "";
var initialsText = ""
var startText = "Try to answer the following code related questions within the time limit, keep in time that incorrect answers will penalize your time by 10 seconds";


//Start quiz

// Fully loads HTML document before initializing controls
$(document).ready(function () {

  // Display the introduction text and start button
  $(".row").hide();
  // $('.question').show();
  $('.question').text(startText);
  $("#nextButton").hide();
  $("#saveButton").hide();
  $(".result").hide();
  $("#saveScore").hide();
  $(this).find(".quizMessage").hide();

  // Jquery eventListener triggers loading quiz content in via startQuiz function
  $(this).find("#startButton").on("click", function () {
    startQuiz()
  });

  // Jquery eventListener displays save score input and displays number of correct answers
  $(this).find("#saveButton").on("click", function () {
   $("#saveScore").show();
   $("#score").text("Your got " + correctAnswers + " / 5 answers correct");
   $(".result").hide();
   $(".question").text("Add your initials and click submit to save your score!");
  });

  $(this).find("#submitButton").on("click", function(){ 
    var initials = $(this).val();
    $("#score").text(initials);
  
  });

  // Event listener - iterates through the quiz questions
  $(this).find("#nextButton").on("click", function () {

    // Event listener - iterates through the quiz questions
    if (!quizOver) {

      value = $("input[type='radio']:checked").val();

      // Checks to see if a radio input from the choices is selected, if not displays message to select an option
      if (value == undefined) {
        $(document).find(".quizMessage").text("Please choose an answer from the options");
        $(document).find(".quizMessage").show();

      } else {
        $(document).find(".quizMessage").hide();

        // Validates answer is correct from the choices, iterates to next question, displays correct answer message 
        if (value == questions[currentQuestion].correctAnswer) {
          correctAnswers++;
          displayScore();
        }

        // Wrong answer triggers deduct 10 seconds function and displays incorrect answer message
        else {
          console.log("wrong answer")
          displayIncorrectAnswer()
          deductTime();
        }

        // First question has already been displayed so increment to next
        currentQuestion++; 
        if (currentQuestion < questions.length) {
          displayCurrentQuestion();

        // quiz is over and total score is displayed - option to save score is shown
        } else {
          displayTotalScore();
          quizOver = true;
          $("#nextButton").text("Play again?");
          $("#saveButton").show();
          $(".choiceList").hide();
          $("#app").hide();
          onTimesUp();
          resetTimer();
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

// This displays the current question and choices
function displayCurrentQuestion() {

  console.log("In display current Question");

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".column > .choiceList");
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

// Sets up questions ready for quiz, starts timer, loads questions and buttons
function startQuiz() {
  displayCurrentQuestion();
  $("#nextButton").show();
  $("#startButton").hide();
  $(".row").show();
  startTimer();
}

// Resets the question and answer variables to play quiz again     
function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
  $(".choiceList").show();
  $("#app").show();
  startTimer();
}

// Displays score when a question is answered correctly
function displayScore() {
  $(document).find(".column > .result").text("Correct answer!");
  $(".result").css({ "color": "#155724", "border": "1px solid #C3E6CB", "background-color": "#D4EDDA" });
  $(".result").addClass(".result-success");
  $(".result").fadeIn("slow").show();
}

// Displays message that answer is incorrect - updates timer to remove 10s from current time elapsed  - NEED HELP HERE
function displayIncorrectAnswer() {
  console.log("display incorrect answer")
  $(document).find(".column > .result").text("Incorrect answer, 10 seconds have been deducted from your quiz time");
  $(".result").fadeIn("slow").show();
  $(".result").css({ "color": "#721C24", "border": "1px solid #F5C6CB", "background-color": "#F8D7DA" });
}

// Displays total answers at end of the quiz and prompts if the user wants to save their score
function displayTotalScore() {
  $(document).find(".column > .result").text("Your total score is: " + correctAnswers + " out of: " + questions.length);
  $(".result").fadeIn("slow").show();
  $(".result").css({ "color": "black", "border": "1px solid #d1d1d1", "background-color": "#f0f0f0" });
  $('.question').text("Would you like to save your score?");
}

// Hides the result html div
function hideScore() {
  $(document).find(".result").hide();
}

// Timer function

// variables for time elapsed and time left, set the limit for the timer
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// Inserts the timer into HTML element
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <span id="base-timer-label" class="base-timer__label">${formatTime(
  timeLeft
)}</span>
</div>
`;

// Stops the timer once timelimit is reached skips
function onTimesUp() {
  clearInterval(timerInterval);
  timePassed = 0;
  document.getElementById("base-timer-label").innerHTML = formatTime(timePassed);
  displayTotalScore();
  quizOver = true;
  $("#nextButton").text("Play again?");
  $("#saveButton").show();
  $(".choiceList").hide();
  $("#app").hide();
  $(document).find(".quizMessage").hide();
}

// Clears and resets the timer to original limit in time limit variable
function resetTimer() {
  clearInterval(timerInterval);
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(TIME_LIMIT);
}

// function for counting down
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );

    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

// Restarts the timer after it has had time deducted
function restartTimer(time) {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = time - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );

    if (timeLeft <= 0) {
      onTimesUp();
    }
  }, 1000);
}

// function for formatting and outputting the time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

// Deducts the time from the running timer for incorrect answers
function deductTime() {
  console.log(timeLeft);
  clearInterval(timerInterval);
  timeLeft -= 10;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
  restartTimer(timeLeft);
}

