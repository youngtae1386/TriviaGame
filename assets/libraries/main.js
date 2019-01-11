


var timeleft = 50;
var downloadTime = setInterval(function () {
    timeleft--;
    document.getElementById("countDownTimer").textContent = timeleft;
    document.getElementById("progressBar").value = 50 - timeleft;
    if (timeleft <= 0)
        clearInterval(downloadTime);
}, 1000);



$(document).ready(function () {
    var options = [
        {
            question: "How old is the universe??", 
            choice: ["15-20 billion years old", "20-25 billion years old", "1-5 billion years old", "100 million years old"],
            answer: 0,
            photo: "assets/images/pupusas.jpg"
         },
         {
             question: "How old is the earth?", 
            choice: ["about 3.9 billion years old", "about 4.5 billion years old", "about 1 billion years old", "900 million years old"],
            answer: 1,
            photo: "assets/images/mtdew.gif"
         }, 
         {
             question: "What explorer introduced pigs to North America?", 
            choice: ["Johnson Columbus", "Viking", "Indian", "Christopher Columbus" ],
            answer: 3,
            photo: "assets/images/coffee.gif"
        }, 
        {
            question: "Which planet is closest to the sun?", 
            choice: ["Earth", "Mercury", "Mars", "Moon" ],
            answer: 1,
            photo: "assets/images/harvey.jpg"
        }, 
        {
            question: "What’s the most malleable metal?", 
            choice: ["silver", "steel", "metal", "gold" ],
            answer: 3,
            photo: "assets/images/dozen.jpg"
        }, 
        {
            question: "What is the most widely eaten fish in the world?", 
            choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
            answer: 1,
            photo: "assets/images/herring.jpg"
        }, 
        {
            question: "What do doctors look at through an ophthalmoscope?", 
            choice: ["The eye", "The Ear", "Mouth", "Chest" ],
            answer: 0,
            photo: "assets/images/lemon.gif"
        }, 
        {
            question: "Which fruit contains the most protein per 100 calories?", 
            choice: ["Guava", "Avocado", "Banana", "Blackberries" ],
            answer: 0,
            photo: "assets/images/guava.gif"
        }];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // first reset the list of answers
            answers = [];

            // for each available answer...
            for (letter in questions[i].answers) {

                // ...add an html radio button
                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // for each question...
        for (var i = 0; i < questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'green';

            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
                answerContainers[i].style.background = 'black';
                answerContainers[i].style.display = 'inline-block';
                answerContainers[i].style.width = '28%';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);

    // on submit, show results
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }

}