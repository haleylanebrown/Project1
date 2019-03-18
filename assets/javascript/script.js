
var countries = [{

$(document).ready(function(){
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
    
    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then (function(response){
        
    })
  });

var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?" +
"q=" +  "&units=imperial&appid=" + APIKey;

  
var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: "",
    code: "BA",
},{
    name: "Brazil",
    city: "Rio de Janeiro",
    image: "",
    code: "BR",
},{
    name: "Canada",
    city: "Vancouver",
    image: "",
    code: "CA",
},{
    name: "Czech Republic",
    city: "Prague",
    image: "",
    code: "CZ",
},{
    name: "Denmark",
    city: "Helsingør",
    image: "",
    code: "DK",
},{
    name: "Germany",
    city: "Berlin",
    image: "",
    code: "DE",
},{
    name: "France",
    city: "Bordeaux ",
    image: "",
    code: "FR",
},{
    name: "Norway",
    city: "Oslo",
    image: "",
    code: "NO",
},{
    name: "Poland",
    city: "Kraków",
    image: "",
    code: "PL",
},{
    name: "Russia",
    city: "Novosibirsk",
    image: "",
    code: "RU",
},{
    name: "Slovakia",
    city: "High Tatras",
    image: "",
    code: "SK",
},{
    name: "Sierra Leone",
    city: "Freetown",
    image: "",
    code: "SL",
},{
    name: "Vietnam",
    city: "Hoi An",
    image: "",
    code: "VN",
},{
    name: "Indonesia",
    city: "Bali",
    image: "",
    code: "ID",
}
];

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

