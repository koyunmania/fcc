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
	callResults( "#random#" );
}

function callResults( input ) {
	if ( input === "#random#" ) {
		$(".result").remove();
		var search_str1 = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&grnlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
		var search_str3 = "&callback=?";
		var search_str = search_str1 + search_str3;
	}
	else {
		$(".result").remove();
		var search_str1 = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
		var search_str2 = input;
		var search_str3 = "&callback=?";
		var search_str = search_str1 + search_str2 + search_str3;
	}
	
	$.getJSON( search_str, function( data ) {
		var pages = Object.keys( data.query.pages );
		pages.forEach( function( page ){
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