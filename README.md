# coding-quiz
A timed coding quiz application with multiple-choice questions. This app runs in the browser and includes dynamically updated HTML and CSS powered by JavaScript and Jquery. It also includes a fully responsive interface that can scale from large screens to small


![Javascript coding quiz app](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/CodingQuizDemo.png?raw=true "Javascript coding quiz app")

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
     <li>
      <a href="https://fac-73.github.io/coding-quiz/">View project</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

![Javascript coding quiz app](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/score-total.png?raw=true "Javascript coding quiz app")
<br><br>

**Built using Javascript, Jquery, HTML and CSS. This timed Javascript coding quiz is an application that provides a set of mulitple choice questions on Javascript programming. Each incorrect answer deducts 10 seconds from the timer. If time runs out the quiz is reset and the user is able to restart the quiz again. If the user manages to answer all questions in the allocated time they can save their score along with their initials.**


### Built With

* [HTML](https://www.w3schools.com/)
* [CSS](https://www.w3schools.com/)
* [Javascript](https://www.w3schools.com/)
* [Jquery](https://jquery.com/)
* [FontAwesome](https://fontawesome.com/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps. You can also download the source files provided. You will need a text editor such as Visual Studio Code, Xcode or similar to edit the source code.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FAC-73/coding-quiz.git
   ```

2. Pull the latest
   ```sh
   git pull
   ```


<!-- USAGE EXAMPLES -->
## Usage

![Javascript coding quiz app](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Quiz-start.png?raw=true "Javascript coding quiz app")

#### What's included
1. HTML, CSS and Javascript (incl. Jquery) files include the source code for running the timed quiz application
2. This project demonstrates ways in which javavscript and jquery can be used to manipulate the DOM elements, store and pass data to and from variables, and dynamically update HTML and trigger interactions through the use of Jquery eventListeners.


## Project deliverables

#### Included functionality
The start quiz button includes an eventListener that initializes the quiz questions and starts a dynamic timer that starts at 01m:00s.

![Start quiz](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Quiz-start.png?raw=true "Start quiz")
<br>

1. For each of the five questions provided select an answer using the inputs, then click next question to submit your answer and iterate to the next question.

![Multiple selection answers](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Questions-Init.png?raw=true  "Multiple selection answers")
<br>

![Selected option](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Question-select.png?raw=true "Selected option")
<br>

2. If the answer is incorrect you'll be notifed, along with a 10s deduction from the running timer and moved on to the next question

![Incorrect answer](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/incorrect-answer.png?raw=true "Incorrect answer")
<br>

3. Correct answers are notified in green and no time is deducted. Correct answers are stored in variable and incremented as you move through the 5 questions

![Correct answer](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/correct-answer.png?raw=true "Correct answer")
<br>

4. If the user does not select a checkbox from the list of questions the value is marked as undefined and the user is prompted to select a question before they are able to move onto the next question

![Select at least one option](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/undefined.png?raw=true "Select at least one option")
<br>

5. If the user runs out of time before reaching the last question the quiz is automatically reset (questions, total scores and timer) to the beginning. 

6. If the user manages to answer all questions in the alloted time they are shown their total score and provided with two options: 
- Play again (This restarts the quiz from the beginning)
- Save score (this displays a form where they can submit their initials)

![Save score or play again?](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/score-total.png?raw=true "Save score or play again?")
<br>

7. The save score form displays a text input where the user can type their initials, along with a submit button to save it. Their score number is also displayed above the input

![Add initials and save score](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Add-initials.png?raw=true "Add initials and save score")
<br>

8. Saved score and initials are stored in list, along with two actions:
- Remove score
- Play again

![Displaying saved score](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/SaveScores.png?raw=true "Displaying saved score]")


Remove score deletes the list item. Play again restarts the quiz from the beginning.

<br>


#### HTML, CSS and Javascript & Jquery
1. Index.html - Contains basic layout structure using a custom div element named 'quizContainer' to display the main content for the quiz such as question text, questions list, timer and form elements. 
Semantic html is used for elements such as buttons, inputs, footers, header, h1, li. 

- For improved accessibility the aria-role="timer" has been included in the div where the timer is displayed. Along with the aria-live="polite" announcement to inform a screenreader user that the timer is incrementing/decrementing. 

2. styles.css - Contains layout, styling and media-queries for html content

3. script.js - Contains Variables, variable arrays and objects for the questions and multiple choice answers, variable for correct answer types. 
- Five eventListeners one to iterate through the questions, one to start the quiz, one to reset it,  another to submit form details to generate a list item, and a final one to remove a saved highscore from the list. 
- A loop for iterating through the questions list and generating the new choice list for each one. 
- A setInterval timer function that's triggered by an eventListener, functions to reset, deduct and restart the timer. 
- If, Else statements for validating whether the selected answer is correct, or undefined. If correct they are iterated onto the next question and the correct score is added to the variable correctAnswers, along with a correct message indicator. 
- If incorrect 10s is removed from the running timer using the deductTime function, an incorrect message is displayed. If an incorrect answer takes the timer to a value of <=0 the quiz is automatically restarted
- Functions for creating a new list item to store a users score along with their initials using JSON stringify method. These initials and scores are stored in local storage so that they stay persistent.


#### Responsive view example - On mobile
![Responsive layout](https://github.com/FAC-73/coding-quiz/blob/main/Assets/Images/Responsive.png?raw=true "Responsive views")


#### Pushing to GitHub

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. 

See [LICENSE](https://github.com/FAC-73/coding-quiz/blob/main/LICENSE) for more information.



<!-- CONTACT -->
## Contact

Kay Davis

Project repo link: [https://fac-73.github.io/coding-quiz/](https://fac-73.github.io/coding-quiz/
<br>
Project website: [https://github.com/FAC-73/coding-quiz](https://github.com/FAC-73/coding-quiz)
