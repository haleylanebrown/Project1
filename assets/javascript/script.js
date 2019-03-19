

var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: ["assets/images/bruges1.jpg", "assets/images/bruges2.jpg", "assets/images/bruges3.jpg", "assets/images/bruges4.jpg"],
    code: "BA",
},{
    image: "",
    code: "Be",
    flight: "Brussels"
}, {

    name: "Brazil",
    city: "Rio de Janeiro",
    image: ["assets/images/riodejaneiro1.jpg", "assets/images/riodejaneiro2.jpg", "assets/images/riodejaneiro3.jpg", "assets/images/riodejaneiro4.jpg"],
    code: "BR",
    flight: "Rio de Janeiro"
}, {
    name: "Canada",
    city: "Vancouver",
    image: ["assets/images/vancouver1.jpg", "assets/images/vancouver2.jpg", "assets/images/vancouver3.jpg", "assets/images/vancouver4.jpg"],
    code: "CA",
    flight: "Vancouver"
}, {
    name: "Czech Republic",
    city: "Prague",
    image: ["assets/images/prague1.jpg", "assets/images/prague2.jpg", "assets/images/prague3.jpg", "assets/images/prague4.jpg"],
    code: "CZ",
    flight: "Prague"
}, {
    name: "Denmark",
    city: "Helsingør",
    image: ["assets/images/helsingør1.jpg", "assets/images/helsingør2.jpg", "assets/images/helsingør3.jpg", "assets/images/helsingør4.jpg"],
    code: "DK",
    flight: "Copenhagen"
}, {
    name: "Germany",
    city: "Berlin",
    image: ["assets/images/berlin1.jpg", "assets/images/berlin2.jpg", "assets/images/berlin3.jpg", "assets/images/berlin4.jpg"],
    code: "DE",
    flight: "Berlin"
}, {
    name: "France",
    city: "Bordeaux",
    image: ["assets/images/bordeaux1.jpg", "assets/images/bordeaux2.jpg", "assets/images/bordeaux3.jpg", "assets/images/bordeaux4.jpg"],
    code: "FR",
    flight: "Bordeaux"
}, {
    name: "Norway",
    city: "Oslo",
    image: ["assets/images/oslo1.jpg", "assets/images/oslo2.jpg", "assets/images/oslo3.jpg", "assets/images/oslo4.jpg"],
    code: "NO",
    flight: "Oslo"
}, {
    name: "Poland",
    city: "Kraków",
    image: ["assets/images/kraków1.jpg", "assets/images/kraków2.jpg", "assets/images/kraków3.jpg", "assets/images/kraków4.jpg"],
    code: "PL",
    flight: "Krakow"
}, {
    name: "Russia",
    city: "Novosibirsk",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "RU",
    flight: "Novosibirsk"
}, {
    name: "Slovakia",
    city: "High Tatras",
    image: ["assets/images/high-tatras1.jpg", "assets/images/high-tatras2.jpg", "assets/images/high-tatras3.jpg", "assets/images/high-tatras4.jpg"],
    code: "SK",
    flight: "Kosice"
}, {
    name: "Sierra Leone",
    city: "Freetown",
    image: ["assets/images/freetown1.jpg", "assets/images/freetown2.jpg", "assets/images/freetown3.jpg", "assets/images/freetown4.jpg"],
    code: "SL",
    flight: "Sierra Leone"
}, {
    name: "Vietnam",
    city: "Hoi An",
    image: ["assets/images/hoi-an1.jpg", "assets/images/hoi-an2.jpg", "assets/images/hoi-an3.jpg", "assets/images/hoi-an4.jpg"],
    code: "VN",
    flight: "Da Nang"
}, {
    name: "Indonesia",
    city: "Bali",
    image: ["assets/images/bali1.jpg", "assets/images/bali2.jpg", "assets/images/bali3.jpg", "assets/images/bali4.jpg"],
    code: "ID",
    flight: "Bali"
}
];


$(document).ready(function () {
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
});



$(".find-city").on("click", function (event) {

    var cityNumber = (Math.floor(Math.random() * countries.length));
    $(".city-name").text(countries[cityNumber].city)
    $(".country-name").text(countries[cityNumber].name)


$(".find-city").on("click", function(event) {
var cityNumber = (Math.floor(Math.random()* countries.length));
$(".city-name").text(countries[cityNumber].city)
$(".country-name").text(countries[cityNumber].name)

var queryURLEventsToken = "https://www.eventbriteapi.com/v3/users/me/?token=XMB4Y3P46DMGD4HK5LHA";
var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?token=XMB4Y3P46DMGD4HK5LHA&location.address=" + countries[cityNumber].city + "&location.within=10km&expand=venue";

$(document).ready(function() {

    $("#image1").attr("src", countries[cityNumber].image[0]);
    $("#image2").attr("src", countries[cityNumber].image[1]);
    $("#image3").attr("src", countries[cityNumber].image[2]);
    $("#image4").attr("src", countries[cityNumber].image[3]);


    $.ajax({
        url: queryURLEventsToken,
        method: "GET"
    }).then (function(response){
        console.log(response)
        $.ajax({
            url: queryURLEvents,
            method: "GET"
        }).then (function(response){
            console.log(response)

            $("tbody").empty();
            $("thead").empty();
           

        if (response.events.length >= 1) {
            var newHeader = $("<tr>").append(
                $("<th>").text("Link:").css("font-weight","Bold"),
                $("<th>").text("Event Name:").css("font-weight","Bold"),
                $("<th>").text("Snapshot:").css("font-weight","Bold"),
                $("<th>").text("Date:").css("font-weight","Bold")
            )
            $("thead").append(newHeader);

            for (var i=0; i<5; i++) {
                var eventName = response.events[i].name.text
                var eventSummary = response.events[i].summary
                var eventDate = response.events[i].start.local
                var eventURL = response.events[i].url 
                var eventLink = eventURL.link(eventURL);

               
                var date = eventDate.split("T");
                var momentDate = moment(date[0], "YYYY-MM-DD");
                var finalDate = momentDate.format("MMMM Do YYYY")

                $("a").attr('target', '_blank')

                var newRow = $("<tr>").append(
                    $("<td>").html(eventLink),
                    $("<td>").text(eventName),
                    $("<td>").text(eventSummary),
                    $("<td>").text(finalDate),     
                )
                
                $("tbody").append(newRow);
            }
        } else {
            var none = $()
            $("thead").append($("<h5>Sorry, no event data available for this city.</h5>"));
        }
        })

        });
}) 

})


  

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


    // AJAX CALL FOR YELP
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


    // END OF ON CLICK FUNCTION FOR FIND CITY
})
