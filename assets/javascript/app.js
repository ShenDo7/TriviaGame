var database = $("#database");

var questions = [
  {
    question: "What year was Bitcoin created?",
    answers: ["2009", "2000", "2012", "1983"],
    correctAnswer: "2009"
  },
  {
    question: "What mining algorithm does Bitcoin use?",
    answers: ["Scrypt", "SHA256", "Ethash", "X11"],
    correctAnswer: "SHA256"
  },
  {
    question: "What year was Ethereum created?",
    answers: ["2009", "2000", "2012", "2015"],
    correctAnswer: "2015"
  },
  {
    question: "What mining algorithm does Ethereum use?",
    answers: ["Scrypt", "SHA256", "Ethash", "X11"],
    correctAnswer: "Ethash"
  },
  {
    question: "What is the max supply of Bitcoin that will ever exist?",
    answers: ["100,000,000", "21,000,000", "50,000,000", "35,000,000"],
    correctAnswer: "21,000,000"
  },
  {
    question: "Who created Bitcoin?",
    answers: ["Satoshi Nakamoto", "Naski Shamoto", "Aliens", "Shaggsworth"],
    correctAnswer: "Satoshi Nakamoto"
  }
];

$("#wrapper").css("background-image: url='assets/images'");
var intervalId;
var clockRunning = false;

var stopwatch = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    stopwatch.counter--;
    $("#counter-number").html(stopwatch.counter);
    if (stopwatch.counter === 0) {
      console.log("TIME UP");
      stopwatch.done();
    }
  },

  start: function() {
    timer = setInterval(stopwatch.countdown, 1000);
    $("#display").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      database.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        database.append(
          "<input type='radio' name='question-" +
            i +
            "' value='" +
            questions[i].answers[j] +
            "''>" +
            questions[i].answers[j]
        );
      }
    }

    database.append("<button id='done'>Done</button>");
  },

  count: function() {
    stopwatch.time--;
    var converted = stopwatch.timeConverter(stopwatch.time);
    $("#display").text(converted);
    if (stopwatch.time <= 0) {
      clearInterval(intervalId);
      clockRunning = false;
      alert("Time's Up!");
      gameEnd();
    } else {
      stopwatch.time--;
      var converted = stopwatch.timeConverter(stopwatch.time);
      $("#display").text(converted);
      clockRunning = true;
      count();
    }
  },

  done: function() {
    var inputs = database.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        stopwatch.correct++;
      } else {
        stopwatch.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#display h2").remove();

    database.html("<h2>All Done!</h2>");
    database.append("<h3>Correct Answers: " + this.correct + "</h3>");
    database.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

$(document).on("click", "#start", function() {
  stopwatch.start();
});

$(document).on("click", "#done", function() {
  stopwatch.done();
});
