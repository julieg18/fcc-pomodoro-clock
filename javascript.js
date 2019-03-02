$(document).ready(function () {
  let breakLength = 5;
  let sessionLength = 25;
  $("#break-decrement").click(function() { 
    if (breakLength > 0) {
      breakLength--;
      $("#break-length").html("<p>" + breakLength + "</p>");
    }
  });
  $("#break-increment").click(function() { 
    if (breakLength < 60) {
      breakLength++;
      $("#break-length").html("<p>" + breakLength + "</p>");
    }
  });
  $("#session-decrement").click(function() { 
    if (sessionLength > 0) {
      sessionLength--;
      $("#session-length").html("<p>"+ sessionLength +"</p>");
    }
  });
  $("#session-increment").click(function() {
    if (sessionLength < 60) {
      sessionLength++;
      $("#session-length").html("<p>"+ sessionLength + "</p>");
    }
  })
});

