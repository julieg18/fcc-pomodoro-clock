let breakLength = 5;
let sessionLength = 25;
let minutes = 25;
let seconds = 0;
let timerDisplay;
let clicks = 0;
let time = "session";

$(document).ready(function () {
  $("#break-length").text(breakLength);
  $("#session-length").text(sessionLength);

  //increment and decrement buttons
  $("#break-decrement").click(function() { 
    if (breakLength > 1) {
      breakLength--;
      $("#break-length").text(breakLength);
    }
  });
  $("#break-increment").click(function() { 
    if (breakLength < 60) {
      breakLength++;
      $("#break-length").text(breakLength);
    }
  });
  $("#session-decrement").click(function() { 
    if (sessionLength > 1) {
      sessionLength--;
      $("#session-length").text(sessionLength);
    }
    mins = sessionLength;
  });
  $("#session-increment").click(function() {
    if (sessionLength < 60) {
      sessionLength++;
      $("#session-length").text(sessionLength);
    }
    mins = sessionLength;
  });
  $("#time-left").html("00:00");

  //start, pause, and reset buttons
  $("#start_stop").click(function() { 
    if (clicks === 0) {
      clicks++;
      startCountdown(false);
    } else if (clicks === 1) {
      clearInterval(countdown);
      clicks++;
    } else {
      startCountdown(true);
      clicks--;
    }
  });
  $("#reset").click(function() { 
    clearInterval(countdown);
    breakLength = 5;
    sessionLength = 25;
    clicks = 0;
    time = "session";
    minutes = sessionLength;
    seconds = 0;
    $("#break-length").text(breakLength)
    $("#session-length").text(sessionLength);
    $("#time-left").text("00:00");
    $("#timer-label").text("Session");
  });
  //timer function
  function startCountdown(hasTimerStarted) {
    if (time === "session" && hasTimerStarted === false) {
      minutes = sessionLength;
      $("#timer-label").text("Session");
    } else if (hasTimerStarted === false) {
      minutes = breakLength;
      $("#timer-label").text("Break");
    };
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    timerDisplay = (minutes + ":" + seconds);
    $("#time-left").text(timerDisplay);

    countdown = setInterval(function() {
      minutes = parseInt(minutes);
      seconds = parseInt(seconds);
      if (seconds === 0 && minutes > 0) {
        minutes--;
        seconds = seconds + 60;
      }
      seconds--;
      minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
      seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
      timerDisplay = (minutes + ":" + seconds);
      $("#time-left").html(timerDisplay);
      if (seconds === "00" && minutes === "00") {
        clearInterval(countdown);
        document.getElementById("beep").play();
        if (time === "session") {
          time = "break";
        } else {
          time = "session";
        }
        startCountdown(false);
      }  
    }, 1000)
  };
});
