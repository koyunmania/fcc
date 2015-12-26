$(document).ready( function () {
	//Autocompletion for search field
	autocomp();
	
	// Activate search function on enter
	$(".search-box .search-text input").on("keydown",function search(e) {
		if ( e.keyCode === 13 ) {
			callResults( $( this ).val() );
		}
	});
	
	//activate Random function
	$(".random").click( randomSearch );

});

function randomSearch(){
	//alert( "random");
	callResults( "#random#" );
}

function callResults( input ) {
	if ( input === "#random#" ) {
		$(".result").remove();
		var search_str1 = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
							//	"http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
		var search_str3 = "&callback=?";
		var search_str = search_str1 + search_str3;
		alert(search_str);
	}
	else {
		$(".result").remove();
		var search_str1 = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
		var search_str2 = input;
		var search_str3 = "&callback=?";
		var search_str = search_str1 + search_str2 + search_str3;
	}
	
	$.getJSON( search_str, function( data ) {
		alert( "after" );
		var pages = Object.keys( data.query.pages );
		pages.forEach( function( page ){
			//alert( data.query.pages[ page ].title ); 
			$( ".result-box" ).append(
				'<div class="result">' + 
					'<a href="https://en.wikipedia.org/?curid=' + data.query.pages[ page ].pageid + '">' + 
						'<p class="title">' + data.query.pages[ page ].title + '</p>' + 
						'<p class="extract">' + data.query.pages[ page ].extract + '</p>' + 
					'</a>' + 
				'</div>' 
			);
		});
	});
}

//activate autocomplition with the given array
function autocomp() {
	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];
	$( ".search" ).autocomplete({
		source: availableTags,
		delay: 100
	});
};

/*

https://en.wikipedia.org/?curid=#pageID#

{
	"batchcomplete":"",
	"continue":{
		"grncontinue":"0.853910414387|0.85391078718|11374329|0",
		"continue":"grncontinue||"},
	"query":{
		"pages":{
			"27762093":{
				"pageid":27762093,
				"ns":0,
				"title":"Foster Child (2007 film)",
				"thumbnail":{"source":"https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Foster_Child_%282007_movie_poster%29.jpg/38px-Foster_Child_%282007_movie_poster%29.jpg",
				"width":38,
				"height":50},
			"pageimage":"Foster_Child_(2007_movie_poster).jpg",
			"extract":"Foster Child is a Filipino indie pregnancy drama film from Seiko Films, which stars Cherry Pie Picache as a temporary foster parent to an abandoned child."}}},
	"limits":{
		"pageimages":50,
		"extracts":20}
}

{
	"batchcomplete":"",
	"continue":{
		"gsroffset":2,
		"continue":"gsroffset||"},
	"query":{
		"pages":{
			"18765127":{
				"pageid":18765127,
				"ns":0,
				"title":"Volker",
				"index":1,
				"extract":"Volker may refer to:"},
			"9191620":{
				"pageid":9191620,
				"ns":0,
				"title":"Volker Roth",
				"index":2,
				"extract":"Volker Roth (born February 1, 1942 in Salzgitter) is a retired football referee from Germany."}}},
	"limits":{
		"pageimages":50,
		"extracts":20}
}
*/