$(document).ready(function() {
  var startSound = {};
  startSound.Work = $('#startWork')[0];
  startSound.Break = $('#startBreak')[0];
  

  function myTimer(timerTotal, timeAtStart) {
    var currentTime = new Date() / 1000;
    var timeRemaining = Math.ceil((timeAtStart - currentTime) + timerTotal);
    var seconds = timeRemaining % 60;
    var secondsRemaining = (seconds < 10) ? ("0" + seconds) : seconds;
    var minutesRemaining = Math.floor(timeRemaining / 60);
    $("#timerClock").text(minutesRemaining+" : " + secondsRemaining);
  }

  var startTimer = function(breakWork,times) {
    timePeriod = times[breakWork];
    $("#timerHeader").text(breakWork + " Time");
    $('#timer-entry').hide();
    $('#timer').show();
    startSound[breakWork].play();
    var timeAtStart = new Date() / 1000;
    var count = 1;
    var i = setInterval(function() {
      myTimer(timePeriod, timeAtStart);
      if(count >= timePeriod) {
        clearInterval(i);
        //Start Break after Work Timer Ends
        if(breakWork === "Work") {
          startTimer("Break", times);
        }
        else {
          startSound.Work.play();
          $('#timer').hide();
          $('#timer-entry').show();
        }
      }
      count++;
    }, 1000);
  }

  $('#start-button').click(function() {
    var times = {};
    times.Work = (document.getElementById('#workEntry').value || 25) * 60;
    times.Break = (document.getElementById('#breakEntry').value || 5) * 60;
    startTimer("Work", times);
  });
});



