$(document).ready(function(){
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();  
  });


var countries = [{

    name: "Belgium",
    city: "Bruges",
    image: ["assets/images/bruges1.jpg", "assets/images/bruges2.jpg", "assets/images/bruges3.jpg", "assets/images/bruges4.jpg"],
    code: "BA",
},{
    name: "Brazil",
    city: "Rio de Janeiro",
    image: ["assets/images/riodejaneiro1.jpg", "assets/images/riodejaneiro2.jpg", "assets/images/riodejaneiro3.jpg", "assets/images/riodejaneiro4.jpg"],
    code: "BR",
},{
    name: "Canada",
    city: "Vancouver",
    image: ["assets/images/vancouver1.jpg", "assets/images/vancouver2.jpg", "assets/images/vancouver3.jpg", "assets/images/vancouver4.jpg"],
    code: "CA",
},{
    name: "Czech Republic",
    city: "Prague",
    image: ["assets/images/prague1.jpg", "assets/images/prague2.jpg", "assets/images/prague3.jpg", "assets/images/prague4.jpg"],
    code: "CZ",
},{
    name: "Denmark",
    city: "Helsingør",
    image: ["assets/images/helsingør1.jpg", "assets/images/helsingør2.jpg", "assets/images/helsingør3.jpg", "assets/images/helsingør4.jpg"],
    code: "DK",
},{
    name: "Germany",
    city: "Berlin",
    image: ["assets/images/berlin1.jpg", "assets/images/berlin2.jpg", "assets/images/berlin3.jpg", "assets/images/berlin4.jpg"],
    code: "DE",
},{
    name: "France",
    city: "Bordeaux",
    image: ["assets/images/bordeaux1.jpg", "assets/images/bordeaux2.jpg", "assets/images/bordeaux3.jpg", "assets/images/bordeaux4.jpg"],
    code: "FR",
},{
    name: "Norway",
    city: "Oslo",
    image: ["assets/images/oslo1.jpg", "assets/images/oslo2.jpg", "assets/images/oslo3.jpg", "assets/images/oslo4.jpg"],
    code: "NO",
},{
    name: "Poland",
    city: "Kraków",
    image: ["assets/images/kraków1.jpg", "assets/images/kraków2.jpg", "assets/images/kraków3.jpg", "assets/images/kraków4.jpg"],
    code: "PL",
},{
    name: "Russia",
    city: "Novosibirsk",
    image: ["assets/images/novosibirsk1.jpg", "assets/images/novosibirsk2.jpg", "assets/images/novosibirsk3.jpg", "assets/images/novosibirsk4.jpg"],
    code: "RU",
},{
    name: "Slovakia",
    city: "High Tatras",
    image: ["assets/images/high-tatras1.jpg", "assets/images/high-tatras2.jpg", "assets/images/high-tatras3.jpg", "assets/images/high-tatras4.jpg"],
    code: "SK",
},{
    name: "Sierra Leone",
    city: "Freetown",
    image: ["assets/images/freetown1.jpg", "assets/images/freetown2.jpg", "assets/images/freetown3.jpg", "assets/images/freetown4.jpg"],
    code: "SL",
},{
    name: "Vietnam",
    city: "Hoi An",
    image: ["assets/images/hoi-an1.jpg", "assets/images/hoi-an2.jpg", "assets/images/hoi-an3.jpg", "assets/images/hoi-an4.jpg"],
    code: "VN",
},{
    name: "Indonesia",
    city: "Bali",
    image: ["assets/images/bali1.jpg", "assets/images/bali2", "assets/images/bali3", "assets/images/bali4"],
    code: "ID",
}
];

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

