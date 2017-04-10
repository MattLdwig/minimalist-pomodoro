// VERSION 0.1

var timer = {
  // Initialization des settings par défault.
  defaultFocusTime : 5,
  defaultShortBreakTime : 5,
  defaultLongBreakTime: 15,
  active: false,
  start: false,
  // Nombre de cycles pour la gestion des temps de focus et de pauses (courtes et longues).
  cycles : 0,
  // Création du timer.

  // Gestion des cycles
  toggleTimer: function() {
    var time_in_seconds =  $("#displayTimer").getTimerValue();
    if(timer.active) {
      $('#displayTimer').pauseTimer();
      $('#startTimer').text('Resume');
      timer.active = false;
    }
    else {
      $('#displayTimer').startTimer(time_in_seconds);
      $('#startTimer').text('Pause');
      timer.active = true;
    }
  },
  resetTimer: function() {
    // TODO Modifier la fonction pour évider la répétition.
    $('#displayTimer').resetTimer({
      time_in_seconds: timer.defaultFocusTime,
      autostart: false
    });
    document.title = 'Minimalist Timer';
    $('#startTimer').prop("disabled",false);
    timer.active = false;
    timer.start = false;
    if ($('#toggleTimer').textContent !== ("Pause")) {
        $('#toggleTimer').text("Pause");
    }
  },
  stopTimer: function() {

  }
}




var util = {

}

var App = {
  init: function() {
    this.bindEvents();
  },
  test: function() {
    var session = $('.pomodoro-sessions').children();
    for(var i = 0; i < timer.cycles ; i++) {
      $('.pomodoro-sessions li:nth-child('+timer.cycles+')').addClass('session-completed');
    }
  },
  createTimer : function() {
    $('#displayTimer').createTimer({
        time_in_seconds: timer.defaultFocusTime
    });
    timer.active = true;
    timer.start = true;
    $('#startTimer').text('Pause');
  },
  render: function() {
  },
  bindEvents: function() {

    $('#startTimer').on('click',function(){
      if(!timer.active && !timer.start) {
        App.createTimer();
      } else {
        timer.toggleTimer();
      }
    });
  }
}

App.init();
