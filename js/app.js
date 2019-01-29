// VERSION 0.2
const audio = new Audio('sound.wav');
const defaultFocus = 25 * 60,
			defautShortBreak = 5 * 60,
			defaultLongBreak = 15 * 60;

const App = {
	init: function() {
		this.bindEvents();
		this.defaultFocusTime = defaultFocus;
		this.defaultShortBreakTime = defautShortBreak;
		this.defaultLongBreakTime = defaultLongBreak;
		this.active = false;
		this.start = false;
		this.cycles = 0;
		document.title = 'MiniPomo';
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
	feedback: function() {
		audio.play();
		$('.feedback').empty();

		for(i=0;i<App.cycles;i++){
			if(i %2 === 0){
				$('.feedback').append('<div class="pomoCounter workSession"></div>');
			} else {
				$('.feedback').append('<div class="pomoCounter breakSession"></div>');
			}
		}
	},
	timerMaster: function() {
		if (!App.active && !App.start) {
			App.createTimer();
		} else {
			App.toggleTimer();
		}
	},
	createTimer: function() {
		$('#displayTimer').createTimer({
			time_in_seconds: App.setTime()
		});
		App.active = true;
		App.start = true;
		$('#startTimer').html('<i class="fa fa-pause" aria-hidden="true"></i>');
		App.toggleTooltip();
	},
	toggleTimer: function() {
		const time_in_seconds = $("#displayTimer").getTimerValue();
		if (App.active) {
			$('#displayTimer').pauseTimer();
			$('#startTimer').html('<i class="fa fa-play" aria-hidden="true"></i>');
			App.active = false;
		} else {
			$('#displayTimer').startTimer(time_in_seconds);
			$('#startTimer').html('<i class="fa fa-pause" aria-hidden="true"></i>');
			App.active = true;
		}
		App.toggleTooltip();
	},
	toggleTooltip: function() {
		const tooltip = $('#startTimer').attr('title');
		if(App.start){
			if(tooltip === 'Start the timer' || tooltip === 'Continue working') {
				$('#startTimer').attr('title', 'Pause the timer');
			} else {
				$('#startTimer').attr('title', 'Continue working');
			}
		} else {
			$('#startTimer').attr('title', 'Start the timer');
			$('#startTimer').html('<i class="fa fa-play" aria-hidden="true"></i>');
		}
	},
	refreshTimer: function() {
		$('#displayTimer').resetTimer({
			time_in_seconds: App.defaultFocusTime,
			autostart: false
		});
		document.title = 'MiniPomo';
		App.active = false;
		App.start = false;
		App.cycles = 0;
		$('.feedback').empty();
		App.toggleTooltip();
	},
	bindEvents: function() {
		$('body').keyup(function(e){
			const code = e.which;
			if(code === 32){
				App.timerMaster();
			}
		})
		$('#startTimer').on('click', function() {
			App.timerMaster();
		});
		$('#refreshTimer').on('click', function(){
			App.refreshTimer()
		});
	}
}

App.init();
