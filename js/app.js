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


var ENTER_KEY = 13;

var util = {
  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}

var App = {
  todos: [],
  init: function() {
    this.todoTemplate = Handlebars.compile($('#todo-template').html());
    this.bindEvents();
  },

  createTimer : function() {
    $('#displayTimer').createTimer({
        time_in_seconds: timer.defaultFocusTime
    });
    timer.active = true;
    timer.start = true;
    $('#startTimer').text('Pause');
  },
  create: function (e) {
    var $input = $(e.target);
    var val = $input.val();

    if (e.which !== ENTER_KEY || !val) {
				return;
			}

    this.todos.push({
      id: util.guid(),
      title: val,
      completed: false,
    });

    $input.val('');
    this.render();
  },
  getIndexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
  /*
  setPriority: function() {
    var priority = this.todos.findIndex(prop => prop.priority=1);
    console.log(priority);
  },
  */
  render: function() {
    var todos = this.getTodos();
    var completedTodos = this.getCompletedTodos();
    $('#todo-list').html(this.todoTemplate(todos));
    $('#todo-list-completed').html(this.todoTemplate(completedTodos));
  },
  toggle: function (e) {
    var i = this.getIndexFromEl(e.target);
    this.todos[i].completed = !this.todos[i].completed;
    this.render();
  },
  getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
  getTodos: function () {
  	return this.todos.filter(function (todo) {
  		return !todo.completed;
  	});
  },
  bindEvents: function() {
    $('#new-todo').on('keyup', this.create.bind(this));
    $('#startTimer').on('click',function(){
      if(!timer.active && !timer.start) {
        App.createTimer();
      } else {
        timer.toggleTimer();
      }
    // TODO Moyen temporaire d'afficher la tache courante en haut de page.
    $('.currentTask').html(App.todos[0].title);
    });
    $('#todo-list').on('change', '.toggle', this.toggle.bind(this));
    $('#todo-list-completed').on('change', '.toggle', this.toggle.bind(this));
  }
}

App.init();
