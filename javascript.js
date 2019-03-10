let breakLength = 5;
let sessionLength = 25;
let sessionMinutes = sessionLength;
let breakMinutes = breakLength;
let minutes = 25;
let seconds = 0;
let timerDisplay = "00:00"
let clicks = 0;
let timerMode = "session";
let audio = document.getElementById("beep");

$(document).ready(function () {
  $("#break-length").text(breakLength);
  $("#session-length").text(sessionLength);

  //increment and decrement buttons
  $("#break-decrement").click(function() { 
    if (breakLength > 1) {
      breakLength--;
      $("#break-length").text(breakLength);
    }
    breakMinutes = breakLength;
  });
  $("#break-increment").click(function() { 
    if (breakLength < 60) {
      breakLength++;
      $("#break-length").text(breakLength);
    }
    breakMinutes = breakLength;
    console.log(breakMinutes);
  });
  $("#session-decrement").click(function() { 
    if (sessionLength > 1) {
      sessionLength--;
      $("#session-length").text(sessionLength);
    }
    sessionMinutes = sessionLength;
  });
  $("#session-increment").click(function() {
    if (sessionLength < 60) {
      sessionLength++;
      $("#session-length").text(sessionLength);
    }
    sessionMinutes = sessionLength;
  });
  $("#time-left").html(timerDisplay);

  //start/pause and reset buttons
  $("#start_stop").click(function() { 
    if (clicks === 0) {
      clicks++;
      minutes = sessionMinutes;
      startCountdown();
    } else if (clicks === 1) {
      clearInterval(countdown);
      clicks--;
    }
  });
  $("#reset").click(function() { 
    clearInterval(countdown);
    breakLength = 5;
    sessionLength = 25;
    breakMinutes = breakLength;
    sessionMinutes = sessionLength;
    clicks = 0;
    timerMode = "session";
    minutes = sessionMinutes;
    seconds = 0;
    timerDisplay = "00:00";
    $("#break-length").text(breakLength)
    $("#session-length").text(sessionLength);
    $("#time-left").text(timerDisplay);
    $("#timer-label").text("Session");
    if (audio.play()) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
  
  //timer function
  function startCountdown() {
    createAndDisplayTimer();
    countdown = setInterval(function() {
      if (seconds === "00" && minutes === "00") {
        clearInterval(countdown);
        audio.play();
        if (timerMode === "session") {
          minutes = breakMinutes;
          $("#timer-label").text("Break");
          timerMode = "break";
          createAndDisplayTimer();
        } else {
          console.log(breakMinutes);
          minutes = sessionMinutes;
          $("#timer-label").text("Session");
          timerMode = "session";
          createAndDisplayTimer();
        }
        startCountdown(false);
      } else {
        minutes = parseInt(minutes);
        seconds = parseInt(seconds);
        if (seconds === 0 && minutes > 0) {
          minutes--;
          seconds = seconds + 60;
        }
        seconds--;
        createAndDisplayTimer();
      }  
      }, 1000)
  };
});

function createAndDisplayTimer() {
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
  timerDisplay = (minutes + ":" + seconds);
  $("#time-left").text(timerDisplay);
}