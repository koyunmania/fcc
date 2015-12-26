var channelList = [{name: "freecodecamp"}, {name: "taketv"}, {name: "MedryBW"}, {name: "noobs2ninjas"}, {name: "brunofin"}, {name: "thomasballinger"}, {name: "beohoff"}];

$(document).ready( function () {
	menuAllClick();
	filterBox();
});

function menuAllClick() {
	$(".menu-all").css({"background-color": "#431c5d", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "0px"});
	$(".menu-online").css({"background-color": "#e05915", "border-bottom-left-radius": "15px", "border-bottom-right-radius": "0px"});
	$(".menu-offline").css({"background-color": "#e05915", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "0px"});
	callUsers( "" );
}

function menuOnlineClick() {
	$(".menu-all").css({"background-color": "#e05915", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "15px"});
	$(".menu-online").css({"background-color": "#431c5d", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "0px"});
	$(".menu-offline").css({"background-color": "#e05915", "border-bottom-left-radius": "15px", "border-bottom-right-radius": "0px"});
	callUsers( "online" );
}

function menuOfflineClick() {
	$(".menu-all").css({"background-color": "#e05915", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "0px"});
	$(".menu-online").css({"background-color": "#e05915", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "15px"});
	$(".menu-offline").css({"background-color": "#431c5d", "border-bottom-left-radius": "0px", "border-bottom-right-radius": "0px"});
	callUsers( "offline" );
}

function emptyUserList() {
	$(".user-li").remove();
}

// filter = online for online users
// filter = offline for online users
// no argument for all users
function clickOnUser() {
	var user = $(".user");
	
	user.hover(
		function () {
			$( this ).animate( { height: '80px' }, 500, function () {  } );
			$( this ).children( ".user-extra" ).css("display","block");
			$( this ).children(".user-status").css("display","block");
		},
		function () {
			$( this ).children(".user-extra").css("display","none");
			$( this ).children(".user-status").css("display","none");
			$( this ).animate( { height: '60px' }, 500, function () {  } );
		}
	);
}

function callUsers( filter ) {
	emptyUserList();
	channelList.forEach( function( channel ){
		$.getJSON("https://api.twitch.tv/kraken/streams/" + channel.name + "/?callback=?", function(data) {
			if ( data.error === "Unprocessable Entity" ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="offline.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-times"></p><p class="user-extra ' + channel.name + ' ">N/A</p></a></li>');
					$("." + channel.name).css("color", "red");
			}
			else if( filter === "offline" ) {
				if ( data.stream === null ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="offline.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
					$("." + channel.name).css("color", "red");
				}
			} 
			else if ( filter === "online" ) {
				if ( data.stream !== null ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + data.stream.channel.name + '"><img src="' + data.stream.channel.logo +'" alt="" /><p class="' + data.stream.channel._id + '">' + data.stream.channel.name + '</p><p class="user-status fa fa-arrow-circle-up ' + data.stream.channel._id + '"></p><p class="user-extra ' + data.stream.channel._id + '">' + data.stream.channel.game + '</p></a></li>');
					$("." + data.stream.channel._id).css("color", "green");
				}
			}
			else {
				if ( data.stream === null ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="offline.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
					$("." + channel.name).css("color", "red");
				}
				else {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + data.stream.channel.name + '"><img src="' + data.stream.channel.logo +'" alt="" /><p class="' + data.stream.channel._id + '">' + data.stream.channel.name + '</p><p class="user-status fa fa-arrow-circle-up ' + data.stream.channel._id + '"></p><p class="user-extra ' + data.stream.channel._id + '">' + data.stream.channel.game + '</p></a></li>');
					$("." + data.stream.channel._id).css("color", "green");
				}
			}
			if( channel.name === channelList[ channelList.length - 1 ].name ) {
				clickOnUser();
			}
		});
	});
};


/*

function callUsers( filter ) {
	emptyUserList();
	channelList.forEach( function( channel ){
		$.getJSON("https://api.twitch.tv/kraken/streams/" + channel.name + "/?callback=?", function(data) {
			if ( data.stream === null && filter === "offline" || data.stream === null && filter === undefined || data.stream === null && filter === "" ) {
				$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="offline.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
				$("." + channel.name).css("color", "red");
			}
			else {
				$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + data.stream.channel.name + '"><img src="' + data.stream.channel.logo +'" alt="" /><p class="' + data.stream.channel._id + '">' + data.stream.channel.name + '</p><p class="user-status fa fa-arrow-circle-up ' + data.stream.channel._id + '"></p><p class="user-extra ' + data.stream.channel._id + '">' + data.stream.channel.game + '</p></a></li>');
				$("." + data.stream.channel._id).css("color", "green");
			}
			if( channel.name === channelList[ channelList.length - 1 ].name ) {
				clickOnUser();
			}
		});
	});
};




function callUsers( filter ) {
	emptyUserList();
	$.getJSON('https://api.twitch.tv/kraken/streams/?callback=?', function(data) {
		channelList.forEach( function( channel ){
			var flag = {status: false, name: ""};
			data.streams.forEach( function ( stream ) {
				if ( stream.channel.name === channel.name ) {
					if ( filter === "online" || filter === undefined ) {
						$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + stream.channel.name + '"><img src="' + stream.channel.logo +'" alt="" /><p class="' + stream.channel._id + '">' + stream.channel.name + '</p><p class="user-status fa fa-arrow-circle-up ' + stream.channel._id + '"></p><p class="user-extra ' + stream.channel._id + '">' + stream.channel.game + '</p></a></li>');
						$("." + stream.channel._id).css("color", "green");
						flag.status = true;
						flag.name = stream.channel.name;
					}
					else {
						flag.status = true;
					}
				}
			});
			if ( !flag.status && filter !== "online" ) {
				$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="offline.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
				$("." + channel.name).css("color", "red");
			}
			
			//stream.channel.name;
			//stream.channel.logo;
			//stream.channel.game;
			//clickOnUser();
		});
		clickOnUser();
	});
}


<li><a class="user" href="#"><img src="/home/b/Desktop/debug/javascript/img.jpeg" alt="" /><p>U.N.</p><p class="user-status">!</p><p class="user-extra">Extra Inf afaöhvahdvöah aödvöahvöa hadvälahds öa</p></a></li>


	user.on( "click",
		function () {
			$( this ).animate( { height: '100px' }, 500, function () {  } );
			$( this ).children( ".user-extra" ).css("display","block");
			$( this ).children(".user-status").css("display","block");
		}
	);
	
	user.hover(
		function () { },
		function () {
			$( this ).children(".user-extra").css("display","none");
			$( this ).children(".user-status").css("display","none");
			$( this ).animate( { height: '60px' }, 500, function () {  } );
		}
	);

		user.on( "click",
		function () {
			if ( click%2 === 0 ) {
				$( this ).animate( { height: '100px' }, 500, function () {  } );
				$( this ).children( ".user-extra" ).css("display","block");
				$( this ).children(".user-status").css("display","block");
			}
			else {
				$( this ).children(".user-extra").css("display","none");
				$( this ).children(".user-status").css("display","none");
				$( this ).animate( { height: '60px' }, 500, function () {  } );
			}
			click++;
		}
	);
	
	
	user.hover(
		function () {
			$( this ).animate( { height: '100px' }, 500, function () {  } );
			$(".user-extra").css("display","block");
			$(".user-status").css("display","block");
		},
		function () {
			$(".user-extra").css("display","none");
			$(".user-status").css("display","none");
			$( this ).animate( { height: '60px' }, 500, function () {  } );
		}
	);


$(function () {

	// slider .twitch-app .status ul li a
	var slider_items = $(".slider-item ul.slider-item-container > li");
	var slider_buttons = $(".slider-button ul li");
	
	slider_items.filter(":not(:first)").hide();
	slider_buttons.filter(":first").addClass("active");
	slider_buttons.on("click", function (e) {
		var index = $(this).index();
		slider_items.fadeOut(500).filter(":eq(" + index + ")").fadeIn(500);
		slider_buttons.removeClass("active");
		$(this).addClass( "active" );
		e.preventDefault();
	});
	
	//product-list
	$(".product-list ul li").hover( function () {
		$(".title", this).finish().fadeOut(700);
		$(".product-icon", this).finish().fadeIn(700);
	}, function () {
		$(".title", this).fadeIn(700);
		$(".product-icon", this).fadeOut(700);
	}
	);
});

{
	"_id":18262583616,
	"game":"League of Legends",
	"viewers":23535,
	"created_at":"2015-12-16T12:08:10Z",
	"video_height":720,
	"average_fps":60,
	"delay":0,
	"is_playlist":false,
	"_links":{"self":"https://api.twitch.tv/kraken/streams/imaqtpie"},
	"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_imaqtpie-80x45.jpg",
	"medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_imaqtpie-320x180.jpg",
	"large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_imaqtpie-640x360.jpg",
	"template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_imaqtpie-{width}x{height}.jpg"},
	"channel":{
		"mature":false,
		"status":"[Imaqtpie - Challenger ADC] today i want you guys to tell me what you struggle with, and then i want someone to help!!! lets work together!!",
		"broadcaster_language":"en",
		"display_name":"imaqtpie","game":"League of Legends",
		"language":"en",
		"_id":24991333,
		"name":"imaqtpie",
		"created_at":"2011-09-22T13:10:14Z",
		"updated_at":"2015-12-16T18:16:50Z",
		"delay":null,
		"logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/imaqtpie-profile_image-8efb10b7bed60d76-300x300.jpeg",
		"banner":null,"video_banner":null,"background":null,
		"profile_banner":null,"profile_banner_background_color":null,"partner":true,"url":"http://www.twitch.tv/imaqtpie","views":112694276,"followers":962881,"_links":{"self":"http://api.twitch.tv/kraken/channels/imaqtpie","follows":"http://api.twitch.tv/kraken/channels/imaqtpie/follows","commercial":"http://api.twitch.tv/kraken/channels/imaqtpie/commercial","stream_key":"http://api.twitch.tv/kraken/channels/imaqtpie/stream_key","chat":"http://api.twitch.tv/kraken/chat/imaqtpie","features":"http://api.twitch.tv/kraken/channels/imaqtpie/features","subscriptions":"http://api.twitch.tv/kraken/channels/imaqtpie/subscriptions","editors":"http://api.twitch.tv/kraken/channels/imaqtpie/editors","teams":"http://api.twitch.tv/kraken/channels/imaqtpie/teams","videos":"http://api.twitch.tv/kraken/channels/imaqtpie/videos"}}}



*/