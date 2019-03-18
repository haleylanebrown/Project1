$(document).ready(function(){
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();  
  });

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
  

$(".find-city").on("click", function(event) {
    //finds random city in array
    var cityNumber = (Math.floor(Math.random()* countries.length)); 
    //api key for weather    
    var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + countries[cityNumber].city + "," + countries[cityNumber].name +  "&units=imperial&appid=" + APIKeyWeather;
    //api key for flight
    var APIKeyFlight;  
    var queryURLFlight = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/{country}/{currency}/{locale}/={originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey=ra66933236979928"
    $(".city-name").text(countries[cityNumber].city);
    $(".country-name").text(countries[cityNumber].name);

        $.ajax({
            url: queryURLWeather,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $(".current-weather").html("Temperature (F): " + response.main.temp + "</br>Humidity: " + response.main.humidity + "</br>Sky coverage: " + response.weather[0].description + "</br>Wind speed (MPH): " + response.wind.speed)
        })
    
})