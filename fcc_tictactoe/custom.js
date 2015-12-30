function game( board, player, last ) {
	this.board = board;
	this.riskMat = [board[0] + board[1] + board[2],
						board[3] + board[4] + board[5],
						board[6] + board[7] + board[8],
						board[0] + board[3] + board[6],
						board[1] + board[4] + board[7],
						board[2] + board[5] + board[8],
						board[0] + board[4] + board[8],
						board[2] + board[4] + board[6]];
	this.player = player;
	this.last = last;
	this.risk = this.evaluateRisk( this.board );
	this.gameLevel = this.evaluateLevel( this.board );
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play

game.prototype.evaluateLevel = function( board ) {
	var counter = 0;
	board.forEach( function( cell ){
		if( cell === 0 )
			counter++;
	});
	return counter;
}

game.prototype.evaluateRisk = function( board ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < this.riskMat.length; i++ ){
		var risk = this.riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}

//						0	1	2
//						3	4	5
//						6	7	8
var start = new game(	[-1,  0,  0,
						 -1,  1,  0, 
						  0,  1,  0], 1, 4);

function play( start ){
	switch( start.risk.riskIndex ) {
		case -3:
		case 3:
			gameEnd( start.risk.riskIndex );
			return 0;
			break;
		case -2:
		case 2:
			var tempBoard = start.board.slice();
			var tempPlayer = start.player
			tempBoard[ start.risk.riskCell ] = start.player;
			tempPlayer = tempPlayer*(-1);
			var end = new game( tempBoard, tempPlayer, start.risk.riskCell );
			console.log( "Move to play:" );
			console.log( end.board[0]  + "	" + end.board[1]  + "	" + end.board[2]);
			console.log( end.board[3]  + "	" + end.board[4]  + "	" + end.board[5]);
			console.log( end.board[6]  + "	" + end.board[7]  + "	" + end.board[8]);
			return end;
			break;
	}
	
	var result = { wins: 0, looses: 0 };
	
	function getAllPossibileWins( gameObj ) {
		// check if game end
		if( gameObj.risk.riskIndex === 3  ) {
			result.wins++ ;
			return "win";
		}
		else if( gameObj.risk.riskIndex === -3  ) {
			result.looses++;
			return "loose";
		}
		else if ( gameObj.gameLevel === 0 )
			return "tie";
			
		//var moves = [];
		for ( var i = 0; i < gameObj.board.length; i++ ) {
			if ( gameObj.board[i] === 0 ) {
				var tempBoard = gameObj.board.slice();
				var tempPlayer = gameObj.player*(-1);
				var tempLast = i;
				tempBoard[i] = tempPlayer
				var cloneGame = new game( tempBoard, tempPlayer, tempLast );
				//moves.push( cloneGame );
				
				getAllPossibileWins( cloneGame );
			}
		}
		//return moves;
	}
	
	function getPossibleMoves( gameObj ){
		var moves = [];
		for ( var i = 0; i < gameObj.board.length; i++ ) {
			if ( gameObj.board[i] === 0 ) {
				var tempBoard = gameObj.board.slice();
				var tempPlayer = gameObj.player*(-1);
				var tempLast = i;
				tempBoard[i] = tempPlayer
				var cloneGame = new game( tempBoard, tempPlayer, tempLast );
				moves.push( cloneGame );
			}
		}
		return moves;
	}
	
	function bestMove( possibleMoves ){
		winProbability = 0;
		winnerIndex = 0;
		possibleMoves.forEach( function( possibleMove, index){
			getAllPossibileWins( possibleMove );
			if( result.wins / result.looses > winProbability ) {
				winProbability = result.wins / result.looses;
				winnerIndex = index;
			}
			console.log( "wins: " + result.wins + "	Losts: " + result.looses );
			console.log( possibleMove.board[0]  + "	" + possibleMove.board[1]  + "	" + possibleMove.board[2]);
			console.log( possibleMove.board[3]  + "	" + possibleMove.board[4]  + "	" + possibleMove.board[5]);
			console.log( possibleMove.board[6]  + "	" + possibleMove.board[7]  + "	" + possibleMove.board[8]);
			result.wins = 0;
			result.looses = 0;
		});
		console.log( "######################" )
		console.log( "######## FINAL #######" )
		console.log( "######################" )
		console.log( "wins: " + result.wins + "	Losts: " + result.looses );
		console.log( possibleMoves[ winnerIndex ].board[0]  + "	" + possibleMoves[ winnerIndex ].board[1]  + "	" + possibleMoves[ winnerIndex ].board[2]);
		console.log( possibleMoves[ winnerIndex ].board[3]  + "	" + possibleMoves[ winnerIndex ].board[4]  + "	" + possibleMoves[ winnerIndex ].board[5]);
		console.log( possibleMoves[ winnerIndex ].board[6]  + "	" + possibleMoves[ winnerIndex ].board[7]  + "	" + possibleMoves[ winnerIndex ].board[8]);
	}
	
	bestMove( getPossibleMoves( start ) );
	console.log( "end" );
}

function gameEnd( val ){
	if( val ===  3 ) {
		console.log( "you won" );
	}
	if( val === -3 ) {
		console.log( "you loose" );
	}
}

play( start );


/*

function game( board, player, last ) {
	this.board = board;
	this.riskMat = [board[0] + board[1] + board[2],
						board[3] + board[4] + board[5],
						board[6] + board[7] + board[8],
						board[0] + board[3] + board[6],
						board[1] + board[4] + board[7],
						board[2] + board[5] + board[8],
						board[0] + board[4] + board[8],
						board[2] + board[4] + board[6]];
	this.player = player;
	this.last = last;
	this.risk = this.evaluateRisk( this.board );
	this.gameLevel = this.evaluateLevel( this.board );
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play

game.prototype.evaluateLevel = function( board ) {
	var counter = 0;
	board.forEach( function( cell ){
		if( cell === 0 )
			counter++;
	});
	return counter;
}

game.prototype.evaluateRisk = function( board ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < this.riskMat.length; i++ ){
		var risk = this.riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}

//						0	1	2
//						3	4	5
//						6	7	8
var start = new game(	[ 1,  0,  0,
						 -1, -1,  1, 
						  0,  0,  0], -1, 4);
var result = { wins: 0, looses: 0 };

function getAllPossibileWins( gameObj ) {
	// check if game end
	if( gameObj.risk.riskIndex === 3  ) {
		result.wins++ ;
		return "win";
	}
	else if( gameObj.risk.riskIndex === -3  ) {
		result.looses++;
		return "loose";
	}
	else if ( gameObj.gameLevel === 0 )
		return "tie";
		
	//var moves = [];
	for ( var i = 0; i < gameObj.board.length; i++ ) {
		if ( gameObj.board[i] === 0 ) {
			var tempBoard = gameObj.board.slice();
			var tempPlayer = gameObj.player*(-1);
			var tempLast = i;
			tempBoard[i] = tempPlayer
			var cloneGame = new game( tempBoard, tempPlayer, tempLast );
			//moves.push( cloneGame );
			
			getAllPossibileWins( cloneGame );
		}
	}
	//return moves;
}

function getPossibleMoves( gameObj ){
	var moves = [];
	for ( var i = 0; i < gameObj.board.length; i++ ) {
		if ( gameObj.board[i] === 0 ) {
			var tempBoard = gameObj.board.slice();
			var tempPlayer = gameObj.player*(-1);
			var tempLast = i;
			tempBoard[i] = tempPlayer
			var cloneGame = new game( tempBoard, tempPlayer, tempLast );
			moves.push( cloneGame );
		}
	}
	return moves;
}

function bestMove( possibleMoves ){
	winnerMove = 0;
	winnerIndex = 0;
	possibleMoves.forEach( function( possibleMove, index){
		getAllPossibileWins( possibleMove );
		console.log( "wins: " + result.wins + "	Losts: " + result.looses );
		console.log( possibleMove.board[0]  + "	" + possibleMove.board[1]  + "	" + possibleMove.board[2]);
		console.log( possibleMove.board[3]  + "	" + possibleMove.board[4]  + "	" + possibleMove.board[5]);
		console.log( possibleMove.board[6]  + "	" + possibleMove.board[7]  + "	" + possibleMove.board[8]);
		result.wins = 0;
		result.looses = 0;
	});
}

bestMove( getPossibleMoves( start ) );
console.log( "end" );


####################################
	
function game( board, player, last ) {
	this.board = board;
	this.riskMat = [board[0] + board[1] + board[2],
						board[3] + board[4] + board[5],
						board[6] + board[7] + board[8],
						board[0] + board[3] + board[6],
						board[1] + board[4] + board[7],
						board[2] + board[5] + board[8],
						board[0] + board[4] + board[8],
						board[2] + board[4] + board[6]];
	this.player = player;
	this.last = last;
	this.risk = this.evaluateRisk( this.board );
	this.gameLevel = this.evaluateLevel( this.board );
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play

game.prototype.evaluateLevel = function( board ) {
	var counter = 0;
	board.forEach( function( cell ){
		if( cell === 0 )
			counter++;
	});
	return counter;
}

game.prototype.evaluateRisk = function( board ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < this.riskMat.length; i++ ){
		var risk = this.riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}

//						0	1	2
//						3	4	5
//						6	7	8
var start = new game(	[ 1,  0,  0,
						  0, -1,  0, 
						  0,  0,  0], -1, 4);
var winGames = [];

function possibilities( gameObj ) {
	
	// check if game end
	if( gameObj.risk.riskIndex === 3  ) {
		winGames.push( gameObj );
		return "win";
	}
		
	else if( gameObj.risk.riskIndex === -3  )
		return "loose";
	else if ( gameObj.gameLevel === 0 )
		return "tie";
		

	var moves = [];
	for ( var i = 0; i < gameObj.board.length; i++ ) {
		if ( gameObj.board[i] === 0 ) {
			var tempBoard = gameObj.board.slice();
			var tempPlayer = gameObj.player*(-1);
			var tempLast = i;
			tempBoard[i] = tempPlayer
			var cloneGame = new game( tempBoard, tempPlayer, tempLast );
			moves.push( cloneGame );
			
			possibilities( cloneGame );
		}
	}
	return moves;
}

possibilities( start );
console.log( "end" );

	
##########################	
	
function game( board ) {
	this.board = board;
	this.riskMat = [board[0] + board[1] + board[2],
						board[3] + board[4] + board[5],
						board[6] + board[7] + board[8],
						board[0] + board[3] + board[6],
						board[1] + board[4] + board[7],
						board[2] + board[5] + board[8],
						board[0] + board[4] + board[8],
						board[2] + board[4] + board[6]];
}
var board =  [0, 0, 1,
				  -1, 0, 0, 
				  -1, 0, 1];

game.prototype.findOptimum = function( board ) {
	switch( evaluateRisk( board ).riskIndex ) {
		case 3:
			play( "win" );
			break;
		case -3:
			play( "loose" );
			break;
		case 2:
			play( evaluateRisk( board ).riskCell );
			break;
		case -2:
			play( evaluateRisk( board ).riskCell );
			break;
		case 0:
			play( "random" );
			break;
	}
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play
game.prototype.evaluateRisk = function( ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < this.riskMat.length; i++ ){
		var risk = this.riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}

function play(  ) {
	// update board
}

x = new game( board );
console.log( x.evaluateRisk() );


#######################################

function game( board, player, last ) {
	this.board = board;
	this.riskMat = [board[0] + board[1] + board[2],
						board[3] + board[4] + board[5],
						board[6] + board[7] + board[8],
						board[0] + board[3] + board[6],
						board[1] + board[4] + board[7],
						board[2] + board[5] + board[8],
						board[0] + board[4] + board[8],
						board[2] + board[4] + board[6]];
	this.player = player;
	this.last = last;
	this.risk = this.evaluateRisk( this.board );
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play

game.prototype.evaluateRisk = function( board ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < this.riskMat.length; i++ ){
		var risk = this.riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}


var start = new game(	[-1,  0,  1,
						  0,  1,  0, 
						  0,  0, -1], -1, 8);
var winGames = [];

function possibilities( gameObj ) {
	
	// check if game end
	var endGame = true;
	gameObj.board.forEach( function( cell ){
		if( cell === 0 )
			endGame = false;
	});
	if( gameObj.risk.riskIndex === 3  ) {
		winGames.push( gameObj );
		return "win";
	}
		
	else if( gameObj.risk.riskIndex === -3  )
		return "loose";
	else if ( endGame )
		return "tie";
		

	var moves = [];
	for ( var i = 0; i < gameObj.board.length; i++ ) {
		if ( gameObj.board[i] === 0 ) {
			var tempBoard = gameObj.board.slice();
			var tempPlayer = gameObj.player*(-1);
			var tempLast = i;
			tempBoard[i] = tempPlayer
			var cloneGame = new game( tempBoard, tempPlayer, tempLast );
			moves.push( cloneGame );
			
			possibilities( cloneGame );
		}
	}
	return moves;
}

possibilities( start );


################################

var board = 	[-1, 0, 1,
				 -1, 0, 0, 
				 -1, 0, 1];
//		[0, 1, 2,
//	 	 3, 4, 5, 
// 		 6, 7, 8];
var riskMat = [board[0] + board[1] + board[2],
				board[3] + board[4] + board[5],
				board[6] + board[7] + board[8],
				board[0] + board[3] + board[6],
				board[1] + board[4] + board[7],
				board[2] + board[5] + board[8],
				board[0] + board[4] + board[8],
				board[2] + board[4] + board[6],
];

// var turn = 1;

function findOptimum( board ) {
	switch( evaluateRisk( board ).riskIndex ) {
		case 3:
			play( "win" );
			break;
		case -3:
			play( "loose" );
			break;
		case 2:
			play( evaluateRisk( board ).riskCell );
			break;
		case -2:
			play( evaluateRisk( board ).riskCell );
			break;
		case 0:
			play( "random" );
			break;
	}
}

// riskindex  3 = player win
// riskindex -3 = comp win
// winRow = the index of the 3 in risk matrix (which row is finished)
// riskindex 2 = player risk
// riskCell = which cell should be played next because of danger
// riskindex -2 = player risk
// riskCell = which cell should be played next because of chanse to win
// riskindex -3 = comp win
// riskindex 0 = no risk, random play
function evaluateRisk( board ) {
	var result = { riskIndex: 0, riskCell: 0, winRow: 0 };
	var maxRisk = { riskIndex: 0, riskRow: 0 };
	
	for( var i = 0; i < riskMat.length; i++ ){
		var risk = riskMat[i];
		var index = i;
		if ( Math.abs( risk ) === 3 ) {
			maxRisk.riskIndex = risk;
			maxRisk.riskRow = index;
			break;
		}
		if ( Math.abs( risk ) === 2 ) {
			if ( Math.abs( risk ) > maxRisk.riskIndex ) {
				maxRisk.riskIndex = risk;
				maxRisk.riskRow = index;
			}
		}
	}
	
	if( maxRisk.riskIndex === 3 || maxRisk.riskIndex === -3 ) {
		result.riskIndex = maxRisk.riskIndex;
		result.riskCell = undefined;
		result.winRow = maxRisk.riskRow;
	}
	else if( maxRisk.riskIndex === 2 || maxRisk.riskIndex === -2 ) {
		result.riskIndex = maxRisk.riskIndex;
		switch( maxRisk.riskRow ) {
			case 0:
				var arr = [ 0, 1, 2];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 1:
				var arr = [ 3, 4, 5];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 2:
				var arr = [ 6, 7, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 3:
				var arr = [ 0, 3, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 4:
				var arr = [ 1, 4, 7];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 5:
				var arr = [ 2, 5, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 6:
				var arr = [ 0, 4, 8];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
			case 7:
				var arr = [ 2, 4, 6];
				arr.forEach( function(val){
					if( board[val] === 0)
						result.riskCell = val;
					});
				break;
		}
	}
	else {
		result.riskIndex = 0;
		result.riskCell = undefined;
		result.winRow = undefined;
	}
	return result;
}

function play(  ) {
	// update board
}
*/
