$(document).ready(function () {
    var options = [
        {
            question: "How old is the universe??",
            choice: ["15-20 billion years old", "20-25 billion years old", "1-5 billion years old", "100 million years old"],
            answer: 0,
            photo: "assets/images/Galaxy-Universe.jpg"
        },
        {
            question: "How old is the earth?",
            choice: ["about 3.9 billion years old", "about 4.5 billion years old", "about 1 billion years old", "900 million years old"],
            answer: 1,
            photo: "assets/images/earth.jpg"
        },
        {
            question: "What explorer introduced pigs to North America?",
            choice: ["Johnson Columbus", "Viking", "Indian", "Christopher Columbus"],
            answer: 3,
            photo: "assets/images/ChristopherColumbusPig.jpg"
        },
        {
            question: "Which planet is closest to the sun?",
            choice: ["Earth", "Mercury", "Mars", "Moon"],
            answer: 1,
            photo: "assets/images/closestToSun.jpg"
        },
        {
            question: "What’s the most malleable metal?",
            choice: ["silver", "steel", "metal", "gold"],
            answer: 3,
            photo: "assets/images/gold.jpg"
        },
        {
            question: "About how much trash does the world produce a year?",
            choice: ["1 million", "1,000 million tons", "100 million tons", " 250 million tons"],
            answer: 3,
            photo: "assets/images/trash.jpg"
        },
        {
            question: "What do doctors look at through an ophthalmoscope?",
            choice: ["eye", "Ear", "Mouth", "Chest"],
            answer: 0,
            photo: "assets/images/eye.JPG"
        }];



    var rightCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
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
            unansweredCount++;
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



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                rightCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

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
            if ((wrongCount + rightCount + unansweredCount) === qCount) {
                $("#questionSections").empty();
                $("#questionSections").html("<h3>Game Over! </h3>");
                $("#answerblock").append("<h4> Correct: " + rightCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#playOver").show();
                rightCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

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