// VERSION 0.1

// L'app doit afficher un timer. --OK
  // Chaque seconde, le timer doit afficher le nouveau temps. --OK
    // Le timer doit se lancer à 25 min. --OK
    // Arrivé à 0 min 0 seconde, le timer doit s'arrêter. --OK

// L'app doit disposer d'un bouton 'start' pour lancer le timer. --OK
  // Après un clic, le timer doit se lancer. --OK
  // Après un clic, le bouton doit afficher 'Pause'. --OK

  // Au second clic, le timer doit se mettre en pause. --OK
  // Au second clic, le bouton doit afficher 'Reprendre'. --OK

  // Au troisième clic, le timer doit reprendre là où
  // il s'était mis en pause. --OK
  // Au troisième clic, le bouton doit afficher 'Pause'. --OK

  // Arrivé à 0min 0 sec, le bouton doit afficher 'Start'. --OK

// VERSION 0.2

// Arrivée au bout du timer de focus, l'app doit switcher sur le timer de courte pause.
// Arrivée au bout du timer de courte pause, l'app doit switcher sur le timer de focus.
// Arrivée au bout du timer de focus, l'app doit switcher sur le timer de courte pause.
// Arrivée au bout du timer de courte pause, l'app doit switcher sur le timer de focus.
// Arrivée au bout du timer de focus, l'app doit switcher sur le timer de longue pause.
  // Reset
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
  createTimer : function() {
    //TODO Trouver un moyen plus efficace et plus propre de gérer les différents cycles.
    // Si le timer est dans son 1er, son 3eme ou son 5eme cycle, lancer le timer de focus.
      if(timer.cycles === 0 || timer.cycles === 2 || timer.cycles === 4) {
        $('#displayTimer').createTimer({
          time_in_seconds: timer.defaultFocusTime
        });
      } else if (timer.cycles === 1 || timer.cycles === 3) {
        // Si le timer est dans son 2d ou son 4eme cycle, lancer le timer de courte pause.
        console.log('Break');
        $('#displayTimer').createTimer({
          time_in_seconds: timer.defaultShortBreakTime
        });
      } else {
        // Sinon, lancer le timer de longue pause.
        console.log('AFK');
        $('#displayTimer').createTimer({
          time_in_seconds: timer.defaultLongBreakTime
        });
      }
      timer.active = true;
      timer.start = true;
      $('#startTimer').prop("disabled",true);
  },
  // Gestion des cycles
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
