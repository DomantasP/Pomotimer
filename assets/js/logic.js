var Profile = function(workTime,shortTime,longTime){
	this.workTime = workTime;
	this.shortTime = shortTime;
	this.longTime = longTime;
	this.shortBreak = 0;
	this.longBreak = 0;
	this.pomodoros = 0;
	this.elapsed = 0;
	this.stopped = false;
	this.isBreak = true;
}

//cia padaryti, kad gal is cookie prima nusiskaito
var profile = new Profile(25,5,15);
var time = 25 * 60;
var mainClock = $("#main-time");
var secondaryClock = $("#done-time");
var mainTimer = new Timer(mainClock,$("title"),0);
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'assets/sounds/doneSound.mp3');


$("#save-settings").click(function(){
	profile.workTime = (typeof parseInt($("#workTime").val()) === NaN ) ? 25 : parseInt($("#workTime").val()) ;
	profile.shortTime = parseInt($("#shortTime").val());
	profile.longTime = parseInt($("#longTime").val());
	time = profile.workTime * 60;
	console.log(profile.workTime);
	$("#save-settings").addClass("green-btn");
});

$('input').on('input',function(e){
     	$("#save-settings").removeClass("green-btn");
});


var set = function() {
			profile.elapsed += profile.workTime;
			s = profile.elapsed * 60;
			secondaryClock.text( toH(s) + " hours " + toM(s) + " minutes" );
			profile.isBreak = false;
			profile.pomodoros++;
			$(".tomato-row").append('<img src="assets/img/tomato-svg.svg" alt="tomato-icon">');	
}

window.addEventListener('finished', function(e){

		audioElement.play();

		if(profile.shortBreak < 3 && profile.isBreak){
			profile.shortBreak++;
			time = profile.shortTime * 60;

			set();
		}
		else if(profile.shortBreak === 3 && profile.isBreak){
			time = profile.longTime * 60;
			profile.shortBreak = 0;
			set();
		}
		else {
			time = profile.workTime * 60;
			profile.isBreak = true;
		}

		mainClock.text( timify(toM(time))  + ":" + timify(toS(time)) );
},false);



$("#play-btn").click(function(){

	if(mainTimer.stopped){
		mainTimer.continue();
		mainTimer.start(time);
	}

	$("#stop-btn").click(function(){
		mainTimer.stop();
		mainClock.text( timify( toM(time) ) + ":" + timify( toS(time) ) );	
		//$('title').text( mins + ":" + secs);
	})
})

$("#reset").click(function(){
	profile.elapsed = 0;
	profile.pomodoros = 0;
	var reset = confirm("Do you really want to reset your stats?")
	if(reset){
		$(".tomato-row").text('');		
		$('#done-time').text( "0 hours 0 minutes" );
	}

})

