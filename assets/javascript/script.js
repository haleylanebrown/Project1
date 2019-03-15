var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?" +
"q=" +  "&units=imperial&appid=" + APIKey;



$(document).ready(function) {
  $.ajax({
      url: queryURLWeather,
      method: "GET"
  }).then (function(response){
      
  })
};