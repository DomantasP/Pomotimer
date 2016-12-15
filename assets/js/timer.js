// 00:00 digital clock format
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

function Timer(container,container2, elapsed){
	this.stopped = true;
	this.elapsed = elapsed;
	this.currentTime = 0;
	this.container = container;
	this.container2 = container2;
	this.finished = new CustomEvent('finished');
}

Timer.prototype.start = function start(durationS){

		var mins = timify( toM(durationS) );
		var secs = timify( toS(durationS) );
		var thiss = this;
		if(durationS > -1 && !this.stopped){

			console.log(this.elapsed)
			var s = ++this.elapsed;

			this.container.text( mins + ":" + secs );	
			this.container2.text( mins + ":" + secs);

			setTimeout(function(){	
				thiss.start(durationS-1);	
			},1000)
		}
		else if(!this.stopped){
			this.currentTime = durationS;
			this.stopped = true;
			window.dispatchEvent(this.finished);
			return;
		}
		else
		{
			return;
		}
}

Timer.prototype.stop = function(){
	this.stopped = true;
}

Timer.prototype.continue = function(){
	this.stopped = false;
} 
