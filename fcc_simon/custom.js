var userNumbs = [];
var simonNumbs = [];
var oldSimonNumbs = [];
var wait = 1000;
var userTimeout;
var strict = false;

//sounds
var a = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var b = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var c = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var d = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

$(document).ready( function(){
	var onOff = false;
	
	//disable segment anchora
	enableSegment( false );
	
	//On Off button/
	$(".onOff a").click(function(e){
		
		if( onOff ) { //turned off
			$(".swich-btn").css( { float: "left" } );
			$(".countDispl span").text( "- -" );
			$(".countDispl span").css({ color: "#4C0812" });

			//reset pointers
			$(".segment").attr("style", "pointer-events: none;");
			$(".segment").attr("style", "cursor: default;");
			
			//reset all segments
			$(".greenSegment").css({ background: "#00a74a" });
			$(".redSegment").css({ background: "#9f0f17" }); 
			$(".blueSegment").css({ background: "#094a8f" });
			$(".yellowSegment").css({ background: "#cca707" });
			
			resetGame();
			onOff = false;
		}
		else { //turned on
			$(".swich-btn").css( { float: "right" } );
			$(".countDispl span").text( "- -" );
			$(".countDispl span").css({ color: "red" });
			
			onOff = true; 
		}
		e.preventDefault();
	});
	
	// Start button
	$(".start a").click(function(e){
		if( onOff ){
			displayBlink( 1, "- -" );
		}
		e.preventDefault();
	});
	
	// Strict button
	$(".strict a").click(function(e){
		if( onOff ){
			if( strict ){
				$(".led").css({ background: "#32050c" });
				strict = false;
			}
			else {
				$(".led").css({ background: "red" });
				strict = true;			
			}
		}
		e.preventDefault();
	});
	
	// on segment click
	$(".greenSegment").click(function(e){
		if( !$(this).hasClass("disabled") ) {
			userNumbs.push( 1 );
			a.play();
			checkUserInput();
			e.preventDefault();
		}
	});
	$(".redSegment").click(function(e){
		if( !$(this).hasClass("disabled") ) {
			userNumbs.push( 2 );
			b.play();
			checkUserInput();
			e.preventDefault();
		}
	});
	$(".blueSegment").click(function(e){
		if( !$(this).hasClass("disabled") ) {
			userNumbs.push( 3 );
			c.play();
			checkUserInput();
			e.preventDefault();
		}
	});
	$(".yellowSegment").click(function(e){
		if( !$(this).hasClass("disabled") ) {
			userNumbs.push( 4 );
			d.play();
			checkUserInput();
			e.preventDefault();
		}
	});
});

// (seq + 1) x ( display blink "- -" (#4C0812, red) ), starts the game
function displayBlink( seq, text ){
	$(".countDispl span").text( text );
	$(".countDispl span").css({ color: "#4C0812" });
	setTimeout(function(){
		$(".countDispl span").css({ color: "red" });
			setTimeout(function(){
				if ( seq > 0 ){
						displayBlink( seq - 1 );
				}
				else {
					play( 1, wait);
				}
			}, wait/4 );
	}, wait/4 );
}

// generates simonNumbs and calls the function to visualise them
function play(level, wait ){
	
	$(".countDispl span").text( Math.floor(level/10) + " " + level%10 );
	$(".countDispl span").css({ color: "red" });
	
	if( oldSimonNumbs.length > simonNumbs.length ){
		simonNumbs.push( oldSimonNumbs[ simonNumbs.length ] );
	}
	else {
		simonNumbs.push( Math.ceil(Math.random()*4) );
	}
	var cloneSimon = simonNumbs.slice(); 
	iterate( cloneSimon, 0, wait );
}

// iterates through simonNums and visualise it with speed $wait
// green[1], red[2], blue[3], yellow[4]
function iterate( cloneSimon, index, wait ){
	if( index === cloneSimon.length )
		return 0;
	switch( cloneSimon[ index ] ){
		case 1:
			$(".greenSegment").css({ background: "#0eff79" });
			a.play();
			setTimeout( function(){ 
				$(".greenSegment").css({ background: "#00a74a" });
				setTimeout( function(){
					if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
						getUserSimon();
					}
				}, wait*0.3);
			}, wait*0.7);
			break;
		case 2:
			$(".redSegment").css({ background: "#eb2934" });
			b.play();
			setTimeout( function(){ 
				$(".redSegment").css({ background: "#9f0f17" });
				setTimeout( function(){
					if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
						getUserSimon();
					}
				}, wait*0.3); 
			}, wait*0.7);
			break;
		case 3:
			$(".blueSegment").css({ background: "#0f7cef" });
			c.play();
			setTimeout( function(){ 
				$(".blueSegment").css({ background: "#094a8f" });
				setTimeout( function(){
					if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
						getUserSimon();
					}
				}, wait*0.3);
			}, wait*0.7);
			break;
		case 4:
			$(".yellowSegment").css({ background: "#f8d641" });
			d.play();
			setTimeout( function(){ 
				$(".yellowSegment").css({ background: "#cca707" });
				setTimeout( function(){
					if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
						getUserSimon();
					}
				}, wait*0.3);
			}, wait*0.7);
			break;
	}
}

// gets user input
function getUserSimon(){
	userNumbs = [];
	enableSegment( true );
	userTimeout =  setTimeout( function(){
		enableSegment( false );
		if( userNumbs.length < simonNumbs.length ){
			resetGame();
			console.log( "getUserSimon empty!!!" );
			displayBlink( 2, "! !" );
		}
		else {
			console.log( "getUserSimon True!!!" );
			
		//Change in gamespeed and game over
		switch( simonNumbs.length + 1 ) {
			case 5:
				wait = wait * 0.8;
				break;
			case 9:
				wait = wait * 0.8;
				break;
			case 13:
				wait = wait * 0.8;
				break;
			case 21:
				resetGame();
				displayBlink( 1, "WON" );
				break;
		}
			
			play( simonNumbs.length + 1, wait );
		}
	}, wait*simonNumbs.length);
}

// reset geame strictly or normal
function resetGame(){
	if( strict ) {
		userNumbs = [];
		oldSimonNumbs = [];
	}
	else {
		userNumbs = [];
		if( oldSimonNumbs.length < simonNumbs.length ) {
			oldSimonNumbs = simonNumbs.slice(); 
		}
	}
	simonNumbs = [];
	
	enableSegment( false );

	// Cancel all timeouts
	var highestTimeoutId = setTimeout(";");
	for (var i = 0 ; i < highestTimeoutId ; i++) {
		clearTimeout(i); 
	}
}

//compare simonNums and userNums
function checkUserInput(){
	var flag = true;
	userNumbs.forEach( function( userNumb, index ){
		if( userNumb !== simonNumbs[ index ] ){
			flag = false;
			clearTimeout( userTimeout );
			resetGame();
			console.log( "getUserSimon False!!!" );
			displayBlink( 2, "! !" );
		}
	});
}

// enable/disable segment click
function enableSegment( value ){
	if( value ){
		$(".segment").attr("style", "pointer-events: auto;");
		$(".segment").attr("style", "cursor: pointer;");
		$(".segment").addClass("hover");
		$(".segment").removeClass("disabled");
	}
	else {
		$(".segment").attr("style", "pointer-events: none;");
		$(".segment").attr("style", "cursor: default;");
		$(".segment").removeClass("hover");
		$(".segment").addClass("disabled");
	}
}