$(document).ready( function(){
	//Initialise game
	var currentGame = new game([ 0,  0,  0,
									0,  0,  0, 
									0,  0,  0],-1, 0);
	var player = "x"
	
	//Workflow of main function
	$("a").click( function(){
		//get which cell is clicked
		var clickedCell = $(this).attr('class');
		clickedCell = Number( clickedCell[ clickedCell.length - 1 ] );
		
		//Play user game and set move
		var cloneBoard = currentGame.board.slice();
		var clonePlayer = 1;
		var cloneLast = clickedCell - 1;
		cloneBoard[ clickedCell -1 ] = -1; 
		var cloneStart = new game( cloneBoard, clonePlayer, cloneLast );
		currentGame = cloneStart;
		setMove( currentGame, player);
		
		//play computer game
		currentGame = playComp( currentGame );
		setMove( currentGame, player );
	});	
});

// constructer of game class
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

// Evalute gameLevel member for game object ( how many unplayed moves left )
game.prototype.evaluateLevel = function( board ) {
	var counter = 0;
	board.forEach( function( cell ){
		if( cell === 0 )
			counter++;
	});
	return counter;
}

// Evaluta risk member for game object
	// riskindex -3|3	= comp win
		// riskCell		= undefined 
		// winRow 		= the index of the 3 in risk matrix (which row is finished)
	// riskindex 2 	= player risk
		// riskCell 	= which cell should be played next because of danger
		// winRow		= undefined
	// riskindex -2 	= player risk
		// riskCell 	= which cell should be played next because of chanse to win
		// winRow		= undefined
	// riskindex 0 = no risk, random play
		// riskCell 	= undefined
		// winRow		= undefined
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

// Evaluate the optimal move for computer
function playComp( start ){
	// Check if game finished: win, lose or risk
	switch( start.risk.riskIndex ) {
		// If win or lose, call finishing front end functions and reset game
		case -3:
		case 3:
			checkGameEnd( start );
			return new game([ 0,  0,  0,
								  0,  0,  0, 
								  0,  0,  0],-1, 0);
			break;
		// If risk, play to the risked cell, forget about the optimum 
		case -2:
		case 2:
			var tempBoard = start.board.slice();
			var tempPlayer = start.player
			tempBoard[ start.risk.riskCell ] = start.player;
			var end = new game( tempBoard, tempPlayer*(-1), start.risk.riskCell );
			return end;
			break;
	}
	
	// Check if it is a tie, call finishing front end functions and reset game
	if ( start.gameLevel === 0 ) {
		checkGameEnd( start );
		return new game([ 0,  0,  0,
								0,  0,  0, 
								0,  0,  0],-1, 0);
	}
	
	// If not finished evaluate all combinations
	var result = { wins: 0, looses: 0 };
	function getAllPossibileWins( gameObj ) {
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
				var tempPlayer = gameObj.player;
				var tempLast = i;
				tempBoard[i] = tempPlayer
				var cloneGame = new game( tempBoard, tempPlayer*(-1), tempLast );
				getAllPossibileWins( cloneGame );
			}
		}
	}
	
	// get to how many empty cells can be played
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
	
	// get the best empty cell to play 
	function bestMove( possibleMoves ){
		var looseProbability = 1000000;
		var winnerIndex = 0;
		var winnerWins = 0;
		var winnerLooses = 0;
		possibleMoves.forEach( function( possibleMove, index){
			getAllPossibileWins( possibleMove );
			if( result.looses < looseProbability ) {
				looseProbability = result.looses;
				winnerIndex = index;
				winnerWins = result.wins;
				winnerLooses = result.looses;
			}
			console.log( "Ratio: " + Math.ceil(  result.wins * 100 / result.looses  ) / 100 + " wins: " + result.wins + "	Losts: " + result.looses );
			console.log( possibleMove.board[0]  + "	" + possibleMove.board[1]  + "	" + possibleMove.board[2]);
			console.log( possibleMove.board[3]  + "	" + possibleMove.board[4]  + "	" + possibleMove.board[5]);
			console.log( possibleMove.board[6]  + "	" + possibleMove.board[7]  + "	" + possibleMove.board[8]);
			result.wins = 0;
			result.looses = 0;
		});
		console.log( "######################" )
		console.log( "######## FINAL #######" )
		console.log( "######################" )
		console.log( "Ratio: " + Math.ceil(  winnerWins * 100 / winnerLooses  ) / 100 + " wins: " + winnerWins + "	Losts: " + winnerLooses );
		console.log( possibleMoves[ winnerIndex ].board[0]  + "	" + possibleMoves[ winnerIndex ].board[1]  + "	" + possibleMoves[ winnerIndex ].board[2]);
		console.log( possibleMoves[ winnerIndex ].board[3]  + "	" + possibleMoves[ winnerIndex ].board[4]  + "	" + possibleMoves[ winnerIndex ].board[5]);
		console.log( possibleMoves[ winnerIndex ].board[6]  + "	" + possibleMoves[ winnerIndex ].board[7]  + "	" + possibleMoves[ winnerIndex ].board[8]);
		return possibleMoves[ winnerIndex ];
	}
	
	// recursive function
	return bestMove( getPossibleMoves( start ) );
}

// Set the played move on the screen
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
			else
				$(".cellp" + i ).text( "x" ).css( "color", "white" );
		}
		else if ( game.board[ i - 1 ] === 0 )
			$(".cellp" + i ).text( "." ).css( "color", "black" );
	}
}

// Stuff to do if game finished
function checkGameEnd( start ) {
	switch( start.risk.riskIndex ) {
		case -3:
			alert( "you win" );
			return 0;
			break;
		case 3:
			alert( "you lose" );
			return 0;
			break;
	}
	if ( start.gameLevel === 0 ) {
		alert( "it's a tie" );
		return 0;
	}
}
