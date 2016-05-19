// Begin: Copied Twitter Snippet url: https://dev.twitter.com/web/javascript/loading
/*window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));*/
// End: Copied Twitter Snippet url: https://dev.twitter.com/web/javascript/loading


var class_quotes_owners = function() {
	var _quotes_ = [
		"Koyunmania ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum condimentum aliquam nisi sed maximus. Donec in orci at nibh suscipit pretium vel eget lorem. Donec dictum dolor et nulla bibendum molestie. Nunc metus dui, ultrices ut mattis eget",
		"dapibus in ante. Etiam elementum risus nec magna dictum aliquet. Sed id lorem eu nisi dictum facilisis.",
		"Suspendisse feugiat diam non leo bibendum fermentum. Vestibulum pharetra fringilla vehicula.",
		"Nam et ligula in risus facilisis pulvinar. In quis libero risus. Proin aliquet erat id fringilla laoreet. Sed blandit, elit in sagittis efficitur,",
		"risus justo hendrerit augue, at tempus nunc massa sed nunc. Etiam accumsan ex et dui aliquet, et ultricies justo semper. Nunc quis tristique purus. Nulla molestie mi eget aliquet rhoncus. Nam sollicitudin euismod tempor. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	];
	var _owners_ = [
		"Jimmy Hendrix",
		"John Malkovic",
		"Carpe Diem",
		"KoyunMania",
		"Corpus Luteum",
	];

	this.getQuote = function (i) {
		var return_quote = [ _quotes_[i], _owners_[i] ];
		return return_quote;
	};
};
var my_quote = new class_quotes_owners();

function truncate(str, num) {
  if ( num >= str.length )
    return str;
  else {
    var str_return = str.slice(0, num - 1);
    return str_return;
  }
}

var generate = function () {
	new_quote_num = Math.floor(Math.random()*5);
	new_quote = my_quote.getQuote( new_quote_num );
	$("#quote_text").text( new_quote[0] );
	$("#quote_owner").text( new_quote[1] );
	var twitter_quote = truncate( new_quote[0], 140 );
	twitter_quote = twitter_quote.replace(/ /g, "%20");
	var twitter_href = "https://twitter.com/intent/tweet?text=" + twitter_quote;
	//$("#twitter-button").href = twitter_href;
	$("#twitter-button").attr("href", twitter_href);
	void(0);
};