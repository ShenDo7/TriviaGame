window.onload = function () {
    $("#start").on("click", stopwatch.start);
};
$("#wrapper").css("background-image: url='assets/images'")
var intervalId;
var clockRunning = false;

var stopwatch = {
    time: 360000
    lap: 1,

    reset: function() {
        stopwatch.time = 0;
        stopwatch.lap = 1;
        $("#display").text("");
        $("#laps").text("")
    },
    start: function() {
        if (!clockRunning) {
            intervalId = setInyerval (stopwatch.count, 10);
            clockRunning = true;
        }
    },
    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;
    },
    
}