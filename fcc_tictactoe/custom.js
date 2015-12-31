$(document).ready( function(){

	//						0	1	2
	//						3	4	5
	//						6	7	8
	var currentGame = new game([ 0,  0,  0,
								  0,  0,  0, 
								  0,  0,  0],-1, 0);
	var player = "x"

	$("a").click( function(){
		var clickedCell = $(this).attr('class');
		clickedCell = Number( clickedCell[ clickedCell.length - 1 ] );
		var cloneBoard = currentGame.board.slice();
		var clonePlayer = 1;
		var cloneLast = clickedCell - 1;
		cloneBoard[ clickedCell -1 ] = -1; 
		var cloneStart = new game( cloneBoard, clonePlayer, cloneLast );
		currentGame = cloneStart;
		setMove( currentGame, player);
		//checkGameEnd( currentGame );
		currentGame = play( currentGame );
		setMove( currentGame, player );
	});	
});

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
	this.player = Number(player);
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
			var end = new game( tempBoard, tempPlayer*(-1), start.risk.riskCell );
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
			
		for ( var i = 0; i < gameObj.board.length; i++ ) {
			if ( gameObj.board[i] === 0 ) {
				var tempBoard = gameObj.board.slice();
				var tempPlayer = gameObj;
				var tempLast = i;
				tempBoard[i] = tempPlayer
				var cloneGame = new game( tempBoard, tempPlayer.player*(-1), tempLast );
				getAllPossibileWins( cloneGame );
			}
		}
	}
	
	function getPossibleMoves( gameObj ){
		var moves = [];
		for ( var i = 0; i < gameObj.board.length; i++ ) {
			if ( gameObj.board[i] === 0 ) {
				var tempBoard = gameObj.board.slice();
				var tempPlayer = gameObj.player;
				var tempLast = i;
				tempBoard[i] = tempPlayer
				var cloneGame = new game( tempBoard, tempPlayer*(-1), tempLast );
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
			result.wins = 0;
			result.looses = 0;
		});
		return possibleMoves[ winnerIndex ];
	}
	return bestMove( getPossibleMoves( start ) );
	console.log();
}

function gameEnd( val ){
	if( val ===  3 ) {
		alert( "you win" );
	}
	if( val === -3 ) {
		alert( "you loose" );
	}
}

function setMove( game, player ) {
	for( var i = 1; i <= 9; i++ ) {
		if ( game.board[ i - 1 ] === -1 ){
			if( player === "x" )
				$(".cellp" + i ).text( "x" ).css( "color", "white" );
			else
				$(".cellp" + i ).text( "o" ).css( "color", "white" );
		}
		else if ( game.board[ i - 1 ] === 1 ){
			if( player === "x" )
				$(".cellp" + i ).text( "o" ).css( "color", "white" );
				//$(".cellp" + i ).css( "color", "white" );
			else
				$(".cellp" + i ).text( "x" ).css( "color", "white" );
		}
		else if ( game.board[ i - 1 ] === 0 )
			$(".cellp" + i ).text( "." ).css( "color", "black" );
	}
}

function checkGameEnd( start ) {
	switch( start.risk.riskIndex ) {
		case -3:
		case 3:
			gameEnd( start.risk.riskIndex );
			return 0;
			break;
	}
}