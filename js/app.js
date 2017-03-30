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

var tasksList = {
  tasks: [],
  addTask: function(taskText) {
    this.tasks.push({
      taskText : taskText,
      completed: false
    });
  }
}

var handlers = {
  addTask: function() {
    var addTaskText = $('#addTaskTextInput');
    tasksList.addTask(addTaskText.val());
    console.log(addTaskText.val());
    addTaskText.value = '';
    view.displayTask();
  }
}

var view = {
  displayTask: function() {
    $('.tasksListDisplay').html('');

    tasksList.tasks.forEach(function(task,position){

      var taskLi = document.createElement('li');
      taskLi.id = position;
      taskLi.textContent = task.taskText;

      $('.tasksListDisplay').append(taskLi);

    })

  }
}

$('#startTimer').on('click',function(){
  console.log(timer.active);
  if(!timer.active && !timer.start) {
    timer.createTimer();
  } else {
    timer.toggleTimer();
  }
});
