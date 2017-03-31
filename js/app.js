// VERSION 0.1

var timer = {
  // Initialization des settings par défault.
  defaultFocusTime : 1499,
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
      $('#startTimer').text('Pause');
  },
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



$('#startTimer').on('click',function(){
  if(!timer.active && !timer.start) {
    timer.createTimer();
  } else {
    timer.toggleTimer();
  }
});

var ENTER_KEY = 13;

var App = {
  todos: [],
  init: function() {
    this.todoTemplate = Handlebars.compile($('#todo-template').html());
    this.bindEvents();
  },
  create: function (e) {
    var $input = $(e.target);
    var val = $input.val();

    if (e.which !== ENTER_KEY || !val) {
				return;
			}

    this.todos.push({
      id: "test",
      title: val,
      completed: false
    });
    
    $input.val('');
    this.render();
  },
  render: function() {
    var todos = this.todos;
    $('#todo-list').html(this.todoTemplate(todos));
  },
  bindEvents: function() {
    $('#new-todo').on('keyup', this.create.bind(this));
  }
}

App.init();
