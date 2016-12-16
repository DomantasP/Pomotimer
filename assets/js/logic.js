define(['jquery'],function($){
// 00:00 digdefine(['jquery','timer'],function(){ital clock format
function timify(time){
	if(time < 10)
		return "0" + time;
	else
		return "" + time;
}

// seconds to full minutes
function toM(durationS){
	return parseInt(durationS / 60);
}

// seconds to only seconds part
function toS(durationS){
	return durationS % 60;
}

//seconds to full hours
function toH(durationS){
	return parseInt(durationS / 3600);
}

function Timer(container,container2){
	this.stopped = true;
	this.timeInterval;
	this.container = container;
	this.container2 = container2;
	this.finished = new CustomEvent('finished');
	this.margin = -0.7;
}

Timer.prototype.run = function(durationS){
	var mins = timify( toM(durationS) );
	var secs = timify( toS(durationS) );
		
	this.container.text( mins + ":" + secs );	
	this.container2.text( mins + ":" + secs);

	if(this.margin < -30.8)
		this.margin = -0.7;
	else
		this.margin -= 0.1009;

	$('.meter-row').css('margin-left',+this.margin+'%')

	if(durationS < 1){
		$('.meter-row').css('margin-left','-0.7%')
		this.stopped = true;
		window.dispatchEvent(this.finished);
		clearInterval(this.timeInterval);
	}
}

Timer.prototype.start = function(durationS){
	var time = durationS;
	var self = this;
	this.stopped = false;
	this.run(time--);
	$('.meter-row').css('margin-left',+this.margin+'%')
	this.timeInterval = setInterval(function(){
		self.run(time--);
	},1000);
}

Timer.prototype.stop = function(){
	this.stopped = true;
	this.margin = -0.7;
	$('.meter-row').css('margin-left',+this.margin+'%')
	clearInterval(this.timeInterval);
}

var Profile = function(workTime,shortTime,longTime){
	this.workTime = workTime;
	this.shortTime = shortTime;
	this.longTime = longTime;
	this.shortBreak = 0;
	this.pomodoros = (readCookie('pomodoros') != null ) ? parseInt(getCookie('pomodoros')) : 0;
	this.elapsed = (readCookie('elapsed') != null ) ? parseInt(getCookie('elapsed')) : 0;
	this.isBreak = true;
};

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

Profile.prototype.setPomodoroCookies = function(){
	var oneDay = new Date();
	oneDay.setTime(oneDay.getTime() + (24*60*60*1000))
	var expires = ';expires=' + oneDay.toUTCString();
	document.cookie = 'pomodoros=' + this.pomodoros + ';' + expires + ';path=/';
	document.cookie = 'elapsed=' + this.elapsed + ';' + expires + ';path=/';
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


var wTime = (readCookie('workTime') != null) ? parseInt(readCookie('workTime')) :25 ;
console.log(readCookie('workTime'));
var sTime = (readCookie('shortTime') != null) ? parseInt(readCookie('shortTime')) : 5;
console.log(readCookie('shortTime'));
var lTime = (readCookie('longTime') != null) ? parseInt(readCookie('longTime')) : 15;
console.log(readCookie('longTime'));

var profile = new Profile(wTime,sTime,lTime);

var time = profile.workTime * 60;
var mainClock = $('#main-time');
var secondaryClock = $('#done-time');
var titleClock = $('title');
var mainTimer = new Timer(mainClock,titleClock);
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'assets/sounds/doneSound.mp3');	


$('#save-settings').click(function(){
	profile.workTime = isNaN( parseInt($('#workTime').val() ) ) ? profile.workTime : parseInt($('#workTime').val()) ;
	profile.shortTime = isNaN( parseInt($('#shortTime').val()) ) ? profile.shortTime : parseInt($('#shortTime').val()) ;
	profile.longTime = isNaN( parseInt($('#longTime').val()) ) ? profile.longTime : parseInt($('#longTime').val());
	
	createCookie('workTime',profile.workTime,30);
	createCookie('shortTime',profile.shortTime,30);
	createCookie('longTime',profile.longTime,30);

	$('#workTime').attr('placeholder',profile.workTime);
    $('#shortTime').attr('placeholder',profile.shortTime);
    $('#longTime').attr('placeholder',profile.longTime);
	time = profile.workTime * 60;

	$('#save-settings').addClass('green-btn');
});

$('input').on('input',function(e){
     	$('#save-settings').removeClass('green-btn');
});

var updateOnBreak = function(){
			profile.elapsed += profile.workTime;
			s = profile.elapsed ;
			secondaryClock.text( toH(s) + " hours " + toM(s) + " minutes" );
			profile.isBreak = false;
			profile.pomodoros++;
			$('.tomato-row').append('<img src="assets/img/tomato-svg.svg" alt="tomato-icon">');	
			$('#main-tomato').css('box-shadow', '0px 0px 15px 3px #00B16A');
			createCookie('pomodoros',profile.pomodoros,1);
			createCookie('elapsed',profile.elapsed,1);
}

window.addEventListener('finished', function(e){

		audioElement.play();

		if(profile.shortBreak < 3 && profile.isBreak){
			profile.shortBreak++;
			time = profile.shortTime ;
			updateOnBreak();
		}
		else if(profile.shortBreak === 3 && profile.isBreak){
			time = profile.longTime ;
			profile.shortBreak = 0;
			updateOnBreak();
		}
		else {
			time = profile.workTime ;
			profile.isBreak = true;
			$('#main-tomato').css('box-shadow', '0px 0px 15px 2px #6C7A89' );
		}

		mainClock.text( timify(toM(time))  + ":" + timify(toS(time)) );
},false);

$('#play-btn').click(function(){
	if(mainTimer.stopped){
		mainTimer.start(time);			
	}

	$('#stop-btn').click(function(){
		mainTimer.stop();
		mainClock.text( timify( toM(time) ) + ":" + timify( toS(time) ) );	
	})
});

$('#reset').click(function(){
	profile.elapsed = 0;
	profile.pomodoros = 0;
	var reset = confirm('Do you really want to reset your stats?')
	if(reset){
		$('.tomato-row').text("");		
		$('#done-time').text( '0 hours 0 minutes' );
	}
});

});