$(document).ready(function () {
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
});

var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: "",
    code: "Be",
}, {
    name: "Brazil",
    city: "Rio de Janeiro",
    image: "",
    code: "BR",
}, {
    name: "Canada",
    city: "Vancouver",
    image: "",
    code: "CA",
}, {
    name: "Czech Republic",
    city: "Prague",
    image: "",
    code: "CZ",
}, {
    name: "Denmark",
    city: "Helsingør",
    image: "",
    code: "DK",
}, {
    name: "Germany",
    city: "Berlin",
    image: "",
    code: "DE",
}, {
    name: "France",
    city: "Bordeaux ",
    image: "",
    code: "FR",
}, {
    name: "Norway",
    city: "Oslo",
    image: "",
    code: "NO",
}, {
    name: "Poland",
    city: "Kraków",
    image: "",
    code: "PL",
}, {
    name: "Russia",
    city: "Novosibirsk",
    image: "",
    code: "RU",
}, {
    name: "Slovakia",
    city: "High Tatras",
    image: "",
    code: "SK",
}, {
    name: "Sierra Leone",
    city: "Freetown",
    image: "",
    code: "SL",
}, {
    name: "Vietnam",
    city: "Hoi An",
    image: "",
    code: "VN",
}, {
    name: "Indonesia",
    city: "Bali",
    image: "",
    code: "ID",
}
];



$(".find-city").on("click", function (event) {

    var cityNumber = (Math.floor(Math.random() * countries.length));
    $(".city-name").text(countries[cityNumber].city)
    $(".country-name").text(countries[cityNumber].name)


  

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


    // AJAX CALL FOR Weather
    //api key for weather    
    var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + countries[cityNumber].city + "," + countries[cityNumber].name + "&units=imperial&appid=" + APIKeyWeather;
    //api key for flight
    var APIKeyFlight;
    var queryURLFlight = "http://partners.api.skyscanner.net/apiservices/referral/v1.0/{country}/{currency}/{locale}/={originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}?apiKey=ra66933236979928"
    $(".city-name").text(countries[cityNumber].city);
    $(".country-name").text(countries[cityNumber].name);

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        $(".current-weather").html("Temperature (F): " + response.main.temp + "</br>Humidity: " + response.main.humidity + "</br>Sky coverage: " + response.weather[0].description + "</br>Wind speed (MPH): " + response.wind.speed)
    })



    // AJAX CALL FOR ZOMATO
    var APIKeyYelp = "vM6YWm9IAxDZYTbuxk8D_w1rBB0rxOtmRZW_xkTwsmSM93dTTRHRdXShK9PM8TW64q-cxa-YpYSM47o-b5U-rtQoNMrdxHm--JFfFakqzqIAlZDtwmtxl7hASvCPXHYx";
    var queryURLYelp = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=denver";

    $.ajax({
        url: queryURLYelp,
        method: "GET",
        Authorization: "Bearer vM6YWm9IAxDZYTbuxk8D_w1rBB0rxOtmRZW_xkTwsmSM93dTTRHRdXShK9PM8TW64q-cxa-YpYSM47o-b5U-rtQoNMrdxHm--JFfFakqzqIAlZDtwmtxl7hASvCPXHYx",
        cache: true,
        crossDomain: true,
        dataType: "jsonp",
        contentType: "application/json"
    }).then(function (response) {
        console.log(response)


    })

    // END OF ON CLICK FUNCTION FOR FIND CITY
})