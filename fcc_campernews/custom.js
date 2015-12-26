$(document).ready( function () {
	$.getJSON("http://www.freecodecamp.com/news/hot", function(data) {
		data.forEach( function( feed ){
			$(".news").append(
				'<div class="new">' + 
					'<div class="avatar">' + 
						'<a href="' + feed.link + '"><img src="' + feed.author.picture + '" alt=""/></a>' + 
					'</div>' + 
					'<div class="info">' + 
						'<ul>' + 
							'<li>' +
								'<a href="' + feed.link + '" class="headline">' + feed.headline.slice(0,20) + '...</a>' + 
							'</li>' + 
							'<li>' + 
								'<a href="http://www.freecodecamp.com/' + feed.author.username + '" class="authorUsername">by - ' + feed.author.username + '</a>' + 
							'</li>' + 
							'<li>' + 
								'<ul>' + 
									'<li style="float: left">' + 
										'<p class="upvotes">♥ ' + feed.upVotes.length + '</p>' + 
									'</li>' + 
									'<li style="float: right">' + 
										'<a class="discuss" href="http://www.freecodecamp.com/news/' + feed.storyLink + '">Discuss</a>' + 
									'</li>' + 
								'</ul>' + 
							'</li>' + 
							'<li style="float: left">' + 
								'<p class="timePosted">Posted on: ' + Date( feed.timePosted ).slice(0, 15) + '</p>' + 
							'</li>' + 
						'</ul>' + 
					'</div>' + 
				'</div>'
			);
		});
	});
});


/*
		var $new = $("<div/>",{ class: "new"});
		var $avatar = $("<div/>",{ class: "avatar"});
		var $a = $("<a/>",{});
		var $img = $("<img/>",{ src: "https://avatars.githubusercontent.com/u/322175?v=3"});
		$(".new").append( $new.append( $avatar.append( $a.append( $img ) ) ) );


[
	{"id":"567b16b3cb1fb61b66bbc510",
	"headline":"Why NodeJS is so fast? — Medium",
	"timePosted":1450907315077,
	"link":"https://medium.com/@ghaiklor/why-nodejs-is-so-fast-a0ff67858f48#.17f0bu7we",
	"metaDescription":"Here I am again with an article about NodeJS! Today I want to speak about another NodeJS advantage — execution speed.",
	"description":"undefined",
	"rank":4,
	"upVotes":[
		{"upVotedBy":"564e1460aeb8dc793c2d1e84","upVotedByUsername":"p1xt"},
		{"upVotedBy":"558eaef5d292d8f326cac25e","upVotedByUsername":"roamingblue"},
		{"upVotedBy":"566bb84976dadc340dc2f109","upVotedByUsername":"andreolli"},
		{"upVotedBy":"565bf03363a1d5dd1d11d7b1","upVotedByUsername":"iamjasn"}],
	"author":{"picture":"https://avatars.githubusercontent.com/u/322175?v=3",
				"userId":"564e1460aeb8dc793c2d1e84",
				"username":"p1xt"},
	"image":"https://cdn-images-1.medium.com/max/800/1*Te1HNFdDpgCn9ImQivtwRA.jpeg",
	"storyLink":"why nodejs is so fast medium"}, {"id"...}
*/