var channelList = [{name: "freecodecamp"}, {name: "TSM_Dyrus"}, {name: "IzakOOO"}, {name: "taketv"}, {name: "MedryBW"}, {name: "noobs2ninjas"}, {name: "brunofin"}, {name: "thomasballinger"}, {name: "Roger9527"}];

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
			if ( filter !== "online" && data.error === "Unprocessable Entity" ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="https://45.media.tumblr.com/2a407b06368ca95bff9f75fc28abac18/tumblr_nzrkx0BWrN1umvgawo1_1280.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-times"></p><p class="user-extra ' + channel.name + ' ">N/A</p></a></li>');
					$("." + channel.name).css("color", "red");
			}
			else if( filter === "offline" ) {
				if ( data.stream === null ) {
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="https://45.media.tumblr.com/2a407b06368ca95bff9f75fc28abac18/tumblr_nzrkx0BWrN1umvgawo1_1280.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
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
					$("#user-list").append( '<li class="user-li"><a class="user" href="http://www.twitch.tv/' + channel.name + '"><img src="https://45.media.tumblr.com/2a407b06368ca95bff9f75fc28abac18/tumblr_nzrkx0BWrN1umvgawo1_1280.gif" alt="" /><p class="' + channel.name + '">' + channel.name + '</p><p class="user-status fa ' + channel.name + ' fa-arrow-circle-down"></p><p class="user-extra ' + channel.name + ' ">Offline</p></a></li>');
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