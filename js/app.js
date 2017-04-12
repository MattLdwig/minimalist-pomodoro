// VERSION 0.2

var App = {
	init: function() {
		this.bindEvents();
		this.defaultFocusTime = 5;
		this.defaultShortBreakTime = 3;
		this.defaultLongBreakTime = 15;
		this.active = false;
		this.start = false;
		this.cycles = 0;
		$( "#progressbar" ).progressbar({
  		value: 0
		});
	},
	setFeedbackCycles: function() {
		var session = $('.pomodoro-sessions').children();
		for (var i = 0; i < App.cycles; i++) {
			$('.pomodoro-sessions li:nth-child(' + App.cycles + ')').addClass('session-completed');
		}
	},
  setTime: function() {
    switch (this.cycles) {
      case 0:
      case 2:
      case 4:
      case 6:
        return this.defaultFocusTime;
        break;
      case 1:
      case 3:
      case 5:
        return this.defaultShortBreakTime;
        break;
      case 7:
        return this.defaultLongBreakTime;
        break;
      case 8:
        this.cycles = 0;
        return this.defaultFocusTime;
      default:
        console.log(this.cycles);
    }
  },
	createTimer: function() {
    this.animateProgressBar();
		$('#displayTimer').createTimer({
			time_in_seconds: App.setTime()
		});
		App.active = true;
		App.start = true;
		$('#startTimer').text('Pause');
	},
  animateProgressBar: function(current_time) {
		var setTime = this.setTime();
		var step = 100 / setTime;
		var progressbar_duration = current_time*step;
		progressbar_duration = 100 - progressbar_duration;
		$( "#progressbar" ).progressbar( "value", progressbar_duration );
  },
	toggleTimer: function() {
		var time_in_seconds = $("#displayTimer").getTimerValue();
		if (App.active) {
			$('#displayTimer').pauseTimer();
			$('#startTimer').text('Resume');
			App.active = false;
		} else {
			$('#displayTimer').startTimer(time_in_seconds);
			$('#startTimer').text('Pause');
			App.active = true;
		}
	},
	resetTimer: function() {
		// TODO Modifier la fonction pour évider la répétition.
		$('#displayTimer').resetTimer({
			time_in_seconds: timer.defaultFocusTime,
			autostart: false
		});
		document.title = 'Minimalist Timer';
		$('#startTimer').prop("disabled", false);
		App.active = false;
		App.start = false;
		if ($('#toggleTimer').textContent !== ("Pause")) {
			$('#toggleTimer').text("Pause");
		}
	},
	bindEvents: function() {
		$('#startTimer').on('click', function() {
			if (!App.active && !App.start) {
				App.createTimer();
			} else {
				App.toggleTimer();
			}
		});
	}
}

App.init();
