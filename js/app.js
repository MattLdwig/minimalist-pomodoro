// VERSION 0.1

// L'app doit afficher un timer.
  // Chaque seconde, le timer doit afficher le nouveau temps.
    // Le timer doit se lancer à 25 min.
    // Arrivé à 0 min 0 seconde, le timer doit s'arrêter.

// L'app doit disposer d'un bouton 'start' pour lancer le timer.
  // Après un clic, le timer doit se lancer.
  // Après un clic, le bouton doit afficher 'Pause'.

  // Au second clic, le timer doit se mettre en pause.
  // Au second clic, le bouton doit afficher 'Reprendre'.

  // Au troisième clic, le timer doit reprendre là où
  // il s'était mis en pause.
  // Au troisième clic, le bouton doit afficher 'Pause'.

  // Arrivé à 0min 0 sec, le bouton doit afficher 'Start'.
var timer = {
  defaultFocusTime : 20,
  defaultShortBreakTime : 2,
  defaultLongBreakTime: 10,
  active: false,
  start: false,
  createTimer : function() {
    if(!timer.start) {
      $('#displayTimer').createTimer({
        time_in_seconds: timer.defaultFocusTime
      });
      timer.active = true;
      timer.start = true;
      $('#startTimer').prop("disabled",true);
    }
  },
  toggleTimer: function() {
    var time_in_seconds =  $("#displayTimer").getTimerValue();
    if(timer.active) {
      $('#displayTimer').pauseTimer();
      $('#toggleTimer').text('Resume');
      timer.active = false;
    }
    else {
      $('#displayTimer').startTimer(time_in_seconds);
      $('#toggleTimer').text('Pause');
      timer.active = true;
    }
  },
  resetTimer: function() {
    // TODO Modifier la fonction pour évider la répétition.
    $('#displayTimer').createTimer({
      time_in_seconds: timer.defaultFocusTime
    });
    timer.active = true;
    if ($('#toggleTimer').textContent !== ("Pause")) {
        $('#toggleTimer').text("Pause");
    }
  }
}
