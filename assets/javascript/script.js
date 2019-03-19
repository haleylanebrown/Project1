

var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: ["assets/images/bruges1.jpg", "assets/images/bruges2.jpg", "assets/images/bruges3.jpg", "assets/images/bruges4.jpg"],
    code: "BA",
}, {

    name: "Brazil",
    city: "Rio de Janeiro",
    image: ["assets/images/riodejaneiro1.jpg", "assets/images/riodejaneiro2.jpg", "assets/images/riodejaneiro3.jpg", "assets/images/riodejaneiro4.jpg"],
    code: "BR",

}, {
    name: "Canada",
    city: "Vancouver",
    image: ["assets/images/vancouver1.jpg", "assets/images/vancouver2.jpg", "assets/images/vancouver3.jpg", "assets/images/vancouver4.jpg"],
    code: "CA",

}, {
    name: "Czech Republic",
    city: "Praha",
    image: ["assets/images/prague1.jpg", "assets/images/prague2.jpg", "assets/images/prague3.jpg", "assets/images/prague4.jpg"],
    code: "CZ",

}, {
    name: "Denmark",
    city: "København",
    image: ["assets/images/helsingør1.jpg", "assets/images/helsingør2.jpg", "assets/images/helsingør3.jpg", "assets/images/helsingør4.jpg"],
    code: "DK",

}, {
    name: "Germany",
    city: "Berlin",
    image: ["assets/images/berlin1.jpg", "assets/images/berlin2.jpg", "assets/images/berlin3.jpg", "assets/images/berlin4.jpg"],
    code: "DE",

}, {
    name: "France",
    city: "Bordeaux",
    image: ["assets/images/bordeaux1.jpg", "assets/images/bordeaux2.jpg", "assets/images/bordeaux3.jpg", "assets/images/bordeaux4.jpg"],
    code: "FR",

}, {
    name: "Norway",
    city: "Oslo",
    image: ["assets/images/oslo1.jpg", "assets/images/oslo2.jpg", "assets/images/oslo3.jpg", "assets/images/oslo4.jpg"],
    code: "NO",

}, {
    name: "Poland",
    city: "Kraków",
    image: ["assets/images/kraków1.jpg", "assets/images/kraków2.jpg", "assets/images/kraków3.jpg", "assets/images/kraków4.jpg"],
    code: "PL",

},

// NEWLY ADDED CITIES
{
    name: "Argentina",
    city: "Buenos Aires",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],

    code: "NONE",

}, {
    name: "Australia",
    city: "Sydney",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "NONE",

}, {
    name: "Austria",
    city: "Wien",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "NONE",

}, {
    name: "Chile",
    city: "Santiago",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "NONE",

}, {
    name: "Philippines",
    city: "Manila",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "NONE",

}, {
    name: "Singapore",
    city: "Singapore",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "NONE",

},
];




$(document).ready(function () {
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
});

$(".find-city").on("click", function (event) {
    var cityNumber = (Math.floor(Math.random() * countries.length));
    // sets city name on page
    $(".city-name").text(countries[cityNumber].city)
    $(".country-name").text(countries[cityNumber].name)


    $("#image1").attr("src", countries[cityNumber].image[0]);
    $("#image2").attr("src", countries[cityNumber].image[1]);
    $("#image3").attr("src", countries[cityNumber].image[2]);
    $("#image4").attr("src", countries[cityNumber].image[3]);


    // AJAX CALL FOR EVENTS
    var queryURLEventsToken = "https://www.eventbriteapi.com/v3/users/me/?token=XMB4Y3P46DMGD4HK5LHA";
    var queryURLEvents = "https://www.eventbriteapi.com/v3/events/search/?token=XMB4Y3P46DMGD4HK5LHA&location.address=" + countries[cityNumber].city + "&location.within=10km&expand=venue";

    $.ajax({
        url: queryURLEventsToken,
        method: "GET"
    }).then(function (response) {
        $.ajax({
            url: queryURLEvents,
            method: "GET"
        }).then(function (response) {
            $("#events-body").empty();
            $("#events-head").empty();

            if (response.events.length >= 1) {
                var newHeader = $("<tr>").append(
                    $("<th>").text("Link:").css("font-weight", "Bold"),
                    $("<th>").text("Event Name:").css("font-weight", "Bold"),
                    $("<th>").text("Snapshot:").css("font-weight", "Bold"),
                    $("<th>").text("Date:").css("font-weight", "Bold")
                )
                $("#events-head").append(newHeader);

                for (var i = 0; i < 5; i++) {
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

                    $("#events-body").append(newRow);
                }
            } else {
                var none = $()
                $("#events-head").append($("<h5>Sorry, no event data available for this city.</h5>"));
            }
        })

    });
    // END AJAX CALL FOR EVENTS

    // AJAX CALL FOR HOLIDAYS
    if (countries[cityNumber].code === "NONE") {
        $("#data").empty();
        $("#data").append("Holiday information unavailable at this time");

    }
    else {
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

                var uglyDate = response.holidays[i].date
                var convertingDate = moment(uglyDate, "YYYY-MM-DD");
                var prettyDate = (convertingDate).format("MMMM Do YYYY");
                console.log(prettyDate);

                holidayName.append(response.holidays[i].name);
                holidayDate.append(prettyDate);
                $("#data").append(holidayName, holidayDate);
            }
        })
    };
    // END AJAX CALL FOR HOLIDAYS


    // AJAX CALL FOR RESTAUTANTS
    var APIKeyYelp = "vM6YWm9IAxDZYTbuxk8D_w1rBB0rxOtmRZW_xkTwsmSM93dTTRHRdXShK9PM8TW64q-cxa-YpYSM47o-b5U-rtQoNMrdxHm--JFfFakqzqIAlZDtwmtxl7hASvCPXHYx";
    var corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    var queryURLYelp = "https://api.yelp.com/v3/businesses/search?term=restaurant&radius=40000&limit=5&location=" + countries[cityNumber].city + "%2C%20" + countries[cityNumber].name;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": corsAnywhere + queryURLYelp,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer vM6YWm9IAxDZYTbuxk8D_w1rBB0rxOtmRZW_xkTwsmSM93dTTRHRdXShK9PM8TW64q-cxa-YpYSM47o-b5U-rtQoNMrdxHm--JFfFakqzqIAlZDtwmtxl7hASvCPXHYx",

        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        $("#restaurants-body").empty();
        $("#restaurants-head").empty();
        var newHeader = $("<tr>").append(
            $("<th>").text("Yelp Link:").css("font-weight", "Bold"),
            $("<th>").text("Restaurant Name:").css("font-weight", "Bold"),
            $("<th>").text("Rating:").css("font-weight", "Bold"),
            $("<th>").text("Price:").css("font-weight", "Bold"),
            $("<th>").text("Category:").css("font-weight", "Bold"),
        )
        $("#restaurants-head").append(newHeader);

        for (var i = 0; i < response.businesses.length; i++) {
            var restaurantURL = response.businesses[i].url
            var restaurantName = response.businesses[i].name
            var restaurantRating = response.businesses[i].rating
            var restaurantPrice = response.businesses[i].price
            var restaurantType = response.businesses[i].categories[0].title;

            var newRow = $("<tr>").append(
                $("<td>").html("<a id='yelp' href='" + restaurantURL + "'>Yelp page</a>"),
                $("<td>").text(restaurantName),
                $("<td>").text(restaurantRating),
                $("<td>").text(restaurantPrice),
                $("<td>").text(restaurantType),

            )
            $("#yelp").attr('target', '_blank')
            $("#restaurants-body").append(newRow);
        }
    });
    // END AJAX CALL FOR RESTAUTANTS




    // AJAX CALL FOR Weather

    //api key for weather    
    var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413"
    var queryURLWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + countries[cityNumber].city + "," + countries[cityNumber].name + "&units=imperial&appid=" + APIKeyWeather;



    //weather call

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#weather-body").empty();
        for (var i = 0; i < 40; i += 8) {

            $("#weather-head").empty("");
            $("#weather-text").empty("");
            $("#weather-text").append("<h3 style='font-size: 1.9rem'>5 day forecast</h3>");
            $("#weather-text").attr("class", "teal-text")
            var weatherHeader = $("<tr>").append(
                $("<th>").text("Date").css("font-weight", "Bold"),
                $("<th>").text("Temperature (F)").css("font-weight", "Bold"),
                $("<th>").text("Humidity %").css("font-weight", "Bold"),
                $("<th>").text("Sky coverage").css("font-weight", "Bold"),
                $("<th>").text("Windspeed (MPH)").css("font-weight", "Bold")
            );
            $("#weather-head").append(weatherHeader);
            var uglyWeatherDay = response.list[i].dt_txt;
            var convertedWeatherDay = moment(uglyWeatherDay, "YYYY-MM-DD hh:mm:ss");
            var prettyWeatherDay = (convertedWeatherDay).format("MMMM Do")

            var weatherTemp = response.list[i].main.temp;
            var weatherHumidity = response.list[i].main.humidity;
            var weatherCloud = response.list[i].weather[0].description;
            var weatherSpeed = response.list[i].wind.speed;
            var newRow = $("<tr class='weather-table-rows'>").append(
                $("<td>").text(prettyWeatherDay),
                $("<td>").html(weatherTemp),
                $("<td>").text(weatherHumidity),
                $("<td>").text(weatherCloud),
                $("<td>").text(weatherSpeed),

            )
        }
    });


    // END AJAX CALL FOR Weather



    // AJAX CALL FOR CURRENCY

    // var APIKeyCurrency = "eaa992c0be1e3c86d2a8"
    // var queryURLCurrency = "https://free.currencyconverterapi.com/api/v6/convert?q=USD_PHP&compact=ultra&apiKey=eaa992c0be1e3c86d2a8"

    // $.ajax({
    //     url: queryURLCurrency,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response)


    // })    

    // END AJAX CALL FOR CURRENCY





    // END OF ON CLICK FUNCTION FOR FIND CITY
})

