var fahreneit = true;

$(document).ready( initial( "imperial" ) );

function initial( unit ) {
  fahreneit = true;
  navigator.geolocation.getCurrentPosition( function(position){
    //
    var pos = { lat: 0, lon: 0 };
    pos.lat = position.coords.latitude;
    pos.lon = position.coords.longitude;
    api_call = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lon +"&appid=2de143494c0b295cca9337e1e96b00e0&units=" + unit;
    
    
    $.getJSON( api_call, function( weather ) {
      $("#city").text( weather["name"] );
      $("#description").text( weather.weather[0].description );
      if ( unit === "imperial" ) {
        $("#temp").text( weather.main.temp + " F°");
        $("#wind").text( "Wind: " + weather.wind.speed + " mil/h");
      }
      else {
        $("#temp").text( weather.main.temp + " C°");
        $("#wind").text( "Wind: " + weather.wind.speed + " m/s");
      }
        
      
      
      
      switch( true ) {
        case ( weather.weather[0].id === 800 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/01d.png");
          break;
        case ( weather.weather[0].id === 801 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/02d.png");
          break;
        case ( weather.weather[0].id === 802 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/03d.png");
          break;
        case ( weather.weather[0].id === 803 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/04d.png");
          break;
        case ( weather.weather[0].id === 804 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/04d.png");
          break;
        case ( weather.weather[0].id >= 701 && weather.weather[0].id <= 781 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/50d.png");
          break;
        case ( weather.weather[0].id >= 600 && weather.weather[0].id <= 622 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/13d.png");
          break;
        case ( weather.weather[0].id >= 520 && weather.weather[0].id <= 531 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/09d.png");
          break;
        case ( weather.weather[0].id >= 500 && weather.weather[0].id <= 511 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/10d.png");
          break;
        case ( weather.weather[0].id >= 300 && weather.weather[0].id <= 321 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/09d.png");
          break;
        case ( weather.weather[0].id >= 200 && weather.weather[0].id <= 232 ):
          $("#description_img").attr("src", "http://openweathermap.org/img/w/11d.png");
          break;
      };
    });
  });
}

/*
convert_unit() {
  if ( fahreneit ) {
    
  }
  else {
    
  }
}
*/