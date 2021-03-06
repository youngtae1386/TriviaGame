$(document).ready(function () {
    var options = [
        {
            question: "'About'How old is the universe??",
            choice: ["15-20 billion years old", "20-25 billion years old", "1-5 billion years old", "100 million years old"],
            answer: 0,
            photo: "assets/images/Galaxy-Age.jpg"
        },
        {
            question: "'About' how old is the earth?",
            choice: ["about 3.9 billion years old", "about 4.5 billion years old", "about 1 billion years old", "900 million years old"],
            answer: 1,
            photo: "assets/images/earth.jpg"
        },
        {
            question: "Which is hotter, the center of the earth or surface of the sun?",
            choice: ["Earth Core", "Sun Surface"],
            answer: 0,
            photo: "assets/images/earth-Core.jpg"
        },
        {
            question: "Which planet is closest to the sun?",
            choice: ["Earth", "Mercury", "Mars", "Moon"],
            answer: 1,
            photo: "assets/images/Galaxy-Universe3.jpg"
        },
        {
            question: "What are the two main metals in the earth’s core?",
            choice: ["iron & nickel", "steel & iron", "gold & platinum", "gold & uranium"],
            answer: 0,
            photo: "assets/images/gold.jpg"
        },
        {
            question: "About how much trash does the world produce a year?",
            choice: ["1 million", "1,000 million tons", "100 million tons", " 250 million tons"],
            answer: 3,
            photo: "assets/images/trash.jpg"
        },
        {
            question: "What is the name of the largest ocean on earth?",
            choice: ["Pacific Ocean", "Atlantic Ocean", "Gulf Ocean", "Arctic Ocean"],
            answer: 0,
            photo: "assets/images/o-pacific.jpg"
        }];



    var rightCount = 0;
    var wrongCount = 0;
    var unAnsweredCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    $(".progress").hide();
    $("#playOver").hide();
    
    
    //click to start
    $("#start").on("click", function () {
        runTimer();
        $("#start").hide();

        showQuestion();

        
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
            $(".progress").show();
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    var progressBar = 100;
    function decrement() {
        $("#time").html("<h3>Time remaining: " + timer + "</h3>");
        $(".progress").html
            ('<div class="progress-bar progress-bar-striped progress-bar-animated"  role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="20" style=width:' + progressBar + "%></div>");
        // x = timer/-4;
        timer--;
        progressBar -= 10;


        //stop timer if reach 0 actullay -1
        if (timer === -1) {
            unAnsweredCount++;
            stop();
            $("#answerblock").html("<p>Time Up! Answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
   
    //display question
    function showQuestion() {
        //generate random
        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        $("#questionSections").html("<h2>" + pick.question + "</h2>");
        //loop though displayed answers
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
         
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }



        //user click the answer
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess
            if (userGuess === pick.answer) {
                stop();
                rightCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();


                //wrong guess outcomes
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 10;
            progressBar = 100;

            // $('body').css("background-image", "url(assets/images/Universe-Stars.JPG)");  
            // $('.wrapper').css("background-image", "url(assets/images/goldenBridge.jpg)");  

            //run the score screen if all questions answered
            if ((wrongCount + rightCount + unAnsweredCount) === qCount) {
                $("#questionSections").empty();
                $("#questionSections").html("<h3>Game Over! </h3>");
                $("#answerblock").append("<h4> Correct: " + rightCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Un-Answered: " + unAnsweredCount + "</h4>");
                $("#playOver").show();
                rightCount = 0;
                wrongCount = 0;
                unAnsweredCount = 0;

            } else {
                runTimer();
                showQuestion();

            }
        }, 3000);


    }

    $("#playOver").on("click", function () {
        $("#playOver").hide();
        $("#questionSections").empty();
        $("#answerblock").empty();
       
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        showQuestion();

    })

})