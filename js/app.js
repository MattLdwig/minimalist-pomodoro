// VERSION 0.2

var App = {
	init: function() {
		this.bindEvents();
		this.defaultFocusTime = 7;
		this.defaultShortBreakTime = 5;
		this.defaultLongBreakTime = 15;
		this.active = false;
		this.start = false;
		this.cycles = 0;
	},
	setFeedbackCycles: function() {
		var session = $('.pomodoro-sessions').children();
		for (var i = 0; i < App.cycles; i++) {
			$('.pomodoro-sessions li:nth-child(' + (App.cycles / 2) + ')').addClass('session-completed');
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
  animateProgressBar: function() {
    var i = 0;
    var counterBack = setInterval(function () {
      i+= (100/App.setTime());
      if (i < 100) {
        $('.progress-bar').css('width', i + '%');
      } else {
        clearInterval(counterBack);
      }
  }, 1000);
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
