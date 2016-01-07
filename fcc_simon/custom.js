var userNumbs = [];
var simonNumbs = [];
var wait = 1000;

$(document).ready( function(){
	var onOff = false;
	var strict = false;
	
	$(".segment").attr("style", "pointer-events: none;");
	$(".segment").attr("style", "cursor: default;");
		
	//On Off button
	$(".onOff").click(function(e){
		if( onOff ) {
			$(".swich-btn").css( { float: "left" } );
			$(".countDispl span").text( "- -" );
			$(".countDispl span").css({ color: "#4C0812" });

			// Cancel all timeouts
			var highestTimeoutId = setTimeout(";");
			for (var i = 0 ; i < highestTimeoutId ; i++) {
				clearTimeout(i); 
			}
			
			//reset pointers
			$(".segment").attr("style", "pointer-events: none;");
			$(".segment").attr("style", "cursor: default;");
			
			//reset all segments
			$(".greenSegment").css({ background: "#00a74a" });
			$(".redSegment").css({ background: "#9f0f17" }); 
			$(".blueSegment").css({ background: "#094a8f" });
			$(".yellowSegment").css({ background: "#cca707" });
			
			onOff = false;
		}
		else {
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
		userNumbs.push( 1 );
		e.preventDefault();
	});
	$(".redSegment").click(function(e){
		userNumbs.push( 2 );
		e.preventDefault();
	});
	$(".blueSegment").click(function(e){
		userNumbs.push( 3 );
		e.preventDefault();
	});
	$(".yellowSegment").click(function(e){
		userNumbs.push( 4 );
		e.preventDefault();
	});
});

function displayBlink( seq, text ){
	// (seq + 1) x ( display blink "- -" (#4C0812, red) )
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

function play(level, wait ){
	$(".countDispl span").text( Math.floor(level/10) + " " + level%10 );
	$(".countDispl span").css({ color: "red" });
	simonNumbs.push( Math.ceil(Math.random()*4) );
	var cloneSimon = simonNumbs.slice(); 
	iterate( cloneSimon, 0, wait );
}

// green[1], red[2], blue[3], yellow[4]
function iterate( cloneSimon, index, wait ){
	if( index === cloneSimon.length )
		return 0;
	switch( cloneSimon[ index ] ){
		case 1:
			$(".greenSegment").css({ background: "#0eff79" });
			setTimeout( function(){ 
				$(".greenSegment").css({ background: "#00a74a" });
				if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
					getUserSimon();
				}
			}, wait);
			break;
		case 2:
			$(".redSegment").css({ background: "#eb2934" });
			setTimeout( function(){ 
				$(".redSegment").css({ background: "#9f0f17" }); 
				if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
					getUserSimon();
				}
			}, wait);
			break;
		case 3:
			$(".blueSegment").css({ background: "#0f7cef" });
			setTimeout( function(){ 
				$(".blueSegment").css({ background: "#094a8f" });
				if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
					getUserSimon();
				}
			}, wait);
			break;
		case 4:
			$(".yellowSegment").css({ background: "#f8d641" });
			setTimeout( function(){ 
				$(".yellowSegment").css({ background: "#cca707" });
				if ( iterate( cloneSimon, index + 1, wait ) === 0 ){
					getUserSimon();
				}
			}, wait);
			break;
	}
}

function getUserSimon(){
	userNumbs = [];
	$(".segment").attr("style", "pointer-events: auto;");
	$(".segment").attr("style", "cursor: pointer;");
	$(".segment").addClass("hover");
	setTimeout( function(){
		$(".segment").attr("style", "pointer-events: none;");
		$(".segment").attr("style", "cursor: default;");
		$(".segment").removeClass("hover");
		if( userNumbs.length < simonNumbs.length ){
			resetGame();
			console.log( "getUserSimon empty!!!" );
			displayBlink( 2, "! !" );
		}
		else {
			var flag = true;
			//compare simonNums and userNums 
			userNumbs.forEach( function( userNumb, index ){
				if( userNumb !== simonNumbs[ index ] ){
					flag = false;
				}
			});
			
			//if all nums are equal
			if( flag ) {
				console.log( "getUserSimon True!!!" );
				play( simonNumbs.length + 1, wait );
			}
			else {
				resetGame();
				console.log( "getUserSimon False!!!" );
				displayBlink( 2, "! !" );
			}
		}
	}, wait*simonNumbs.length);
}

function resetGame(){
	//displayBlink( 2, "! !" );
	userNumbs = [];
	simonNumbs = [];
	$(".segment").attr("style", "pointer-events: none;");
	$(".segment").attr("style", "cursor: default;");
}
