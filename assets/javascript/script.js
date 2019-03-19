$(document).ready(function () {
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
});

var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: "",
    code: "Be",
    flight: "Brussels"
}, {
    name: "Brazil",
    city: "Rio de Janeiro",
    image: "",
    code: "BR",
    flight: "Rio de Janeiro"
}, {
    name: "Canada",
    city: "Vancouver",
    image: "",
    code: "CA",
    flight: "Vancouver"
}, {
    name: "Czech Republic",
    city: "Prague",
    image: "",
    code: "CZ",
    flight: "Prague"
}, {
    name: "Denmark",
    city: "Helsingør",
    image: "",
    code: "DK",
    flight: "Copenhagen"
}, {
    name: "Germany",
    city: "Berlin",
    image: "",
    code: "DE",
    flight: "Berlin"
}, {
    name: "France",
    city: "Bordeaux ",
    image: "",
    code: "FR",
    flight: "Bordeaux"
}, {
    name: "Norway",
    city: "Oslo",
    image: "",
    code: "NO",
    flight: "Oslo"
}, {
    name: "Poland",
    city: "Kraków",
    image: "",
    code: "PL",
    flight: "Krakow"
}, {
    name: "Russia",
    city: "Novosibirsk",
    image: "",
    code: "RU",
    flight: "Novosibirsk"
}, {
    name: "Slovakia",
    city: "High Tatras",
    image: "",
    code: "SK",
    flight: "Kosice"
}, {
    name: "Sierra Leone",
    city: "Freetown",
    image: "",
    code: "SL",
    flight: "Sierra Leone"
}, {
    name: "Vietnam",
    city: "Hoi An",
    image: "",
    code: "VN",
    flight: "Da Nang"
}, {
    name: "Indonesia",
    city: "Bali",
    image: "",
    code: "ID",
    flight: "Bali"
}
];

  

$(".find-city").on("click", function(event) {
    //finds random city in array
    var cityNumber = (Math.floor(Math.random()* countries.length)); 
    // AJAX CALL FOR HOLIDAYS
    var year = moment().format("YYYY");
    var month = moment().format("MM");
    var day = moment().format("DD");
    var queryURLholiday = ("https://holidayapi.pl/v1/holidays?country=" + countries[cityNumber].code + "&year=" + year + "&month=" + month + "&day=" + day + "&upcoming=true");

    $.ajax({
        url: queryURLholiday,
        method: "GET"

    }).then(function (response) {
        $("#data").empty();
        for (var i = 0; i < response.holidays.length; i++) {
            var holidayName = $("<div>");
            var holidayDate = $("<div>");

            holidayName.append(response.holidays[i].name);
            holidayDate.append(response.holidays[i].date);
            $("#data").append(holidayName, holidayDate);
        }
    })

    //api key for weather    
    var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + countries[cityNumber].city + "," + countries[cityNumber].name +  "&units=imperial&appid=" + APIKeyWeather;
    //api key for flight
  
   
    // sets city name on page
    $(".city-name").text(countries[cityNumber].city);
    $(".country-name").text(countries[cityNumber].name);

        //weather call
        $.ajax({
            url: queryURLWeather,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $(".current-weather").html("Temperature (F): " + response.main.temp + "</br>Humidity: " + response.main.humidity + "</br>Sky coverage: " + response.weather[0].description + "</br>Wind speed (MPH): " + response.wind.speed)
            // incase weather datadoesnt exist
        }).fail(function() {
            $(".current-weather").html("No weather data exists for " + countries[cityNumber].city + ", " + countries[cityNumber].name)

        });



})