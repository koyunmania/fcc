var session_minutes = 25;
var break_minutes = 5;
var time_session = new Date(0, 0, 0, 0, session_minutes, 0, 0);
var time_break = new Date(0, 0, 0, 0, break_minutes, 0, 0);
var time = new Date(time_session);

var minutes = time.getMinutes();
var seconds = time.getSeconds();
var totalSeconds= minutes*60 + seconds;
var session = true;
// var clock_digital = document.getElementById("clock-digital");


var countDown = function() {
	minutes = time.getMinutes();
	seconds = time.getSeconds();

	if ( seconds === 0 && minutes === 0 ) {
		session = !session;
		if ( session ) {
			time = new Date(time_session);
			totalSeconds = time.getMinutes()*60 + time.getSeconds();
			$(".clock-inner").css("background-color", "red");
			$("#clock-titel").text("Session");
			
		}
		else {
			time = new Date(time_break);
			totalSeconds = time.getMinutes()*60 + time.getSeconds();
			$(".clock-inner").css("background-color", "#007F1B");
			$("#clock-titel").text("Break");
		}
		updateClock();
		updateInnerClock();
	}

	else if ( seconds === 0 && minutes > 0 ) {
		time.setMinutes( minutes - 1 );
		time.setSeconds( seconds + 59 );
		updateClock();
		updateInnerClock();
	}
	else if ( seconds > 0 ) {
		time.setSeconds( seconds - 1 );
		updateClock();
		updateInnerClock();
	}	
}

var updateClock = function() {
	var clock_digital_text = time.getMinutes() + ":" + time.getSeconds();
	$("#clock-digital").text( clock_digital_text );
	//clock_digital.innerHTML( clock_digital_text );
}

var updateInnerClock = function() {
	var clipRatio = Math.ceil ( $(".clock-inner").height() * ( time.getMinutes()*60 + time.getSeconds() ) / ( totalSeconds ));
	var clipText = "rect(" + clipRatio + "px,300px,300px,0px)";
	$(".clock-inner").css("clip", clipText);
}

var updateCountdown = function() {
	clearInterval(time_run);
	time_session.setMinutes( session_minutes );
	time_break.setMinutes( break_minutes );
	time = new Date( time_session );
	
	time_run = setInterval( countDown ,1000);
	totalSeconds = time.getMinutes()*60 + time.getSeconds();
	updateClock();
	updateInnerClock();
}


var increaseMinutes = function(idName) {
	var minutes = 0;
	if ( idName === ".session_minutes" ) {
		session_minutes = session_minutes + 1;
		minutes = session_minutes;
	}
	else {
		break_minutes = break_minutes + 1;
		minutes = break_minutes;
	}
		
	$(idName).text(minutes);
}

var decreaseMinutes = function(idName) {
	var minutes = 0;
	if ( idName === ".session_minutes" ) {
		if ( session_minutes === 1 )
			return 0;
		session_minutes = session_minutes - 1;
		minutes = session_minutes;
	}
	else {
		if ( break_minutes === 1 )
			return 0;
		break_minutes = break_minutes - 1;
		minutes = break_minutes;
	}
	$(idName).text(minutes);
};

var time_run = setInterval( countDown ,1000);

