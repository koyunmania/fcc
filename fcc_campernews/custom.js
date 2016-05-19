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

