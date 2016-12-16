define(['jquery'],function(){
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
}

Timer.prototype.run = function(durationS){
	var mins = timify( toM(durationS) );
	var secs = timify( toS(durationS) );
		
	this.container.text( mins + ":" + secs );	
	this.container2.text( mins + ":" + secs);

	if(durationS < 1){
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
	this.timeInterval = setInterval(function(){
		self.run(time--);
	},1000);
}

Timer.prototype.stop = function(){
	this.stopped = true;
	clearInterval(this.timeInterval);
}

	return Timer;
});