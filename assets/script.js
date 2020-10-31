// function to store data from api
function test(data) {
    var header = data.message.header.status_code;

    // if 404 error does not occur get lyrics data and save it in local storage
    if (header != 404) {
        var lyrics = data.message.body.lyrics.lyrics_body;
        localStorage.clear();
        localStorage.setItem("lyrics", lyrics);
        // otherwise save 404 error to local storage to be called upon
    } else {
        localStorage.setItem("error", "404");
    }
}

// function to get values from user and find matching data in ajax calls
function search() {
    // clears text for error div
    $("#errorText").text("");

    // setting variables for input values
    var artist = $("#artist").val();
    var song = $("#song").val();

    // validates user entries
    if (artist != null && song != null) {
        var apiKey = "1c6fdd4cb29d4a66960f79e845689e9d";
        var querylURL = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=test&q_track=" +
            song + "&q_artist=" + artist + "&apikey=" + apiKey;

        // takes url link and puts it in the html document to run
        var scr = $("<script>").attr("src", querylURL);
        $("body").append(scr);

        // function to time out browser for local storage to update before page is reloaded
        setTimeout(function () {
            // checks for 404 error from api
            if (localStorage.getItem("error") != "404") {
                apiKey = "00eed5848e963c43bd2cd73c8707c667";
                querylURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + apiKey + "&format=json";

                // ajax call to get data for artist bio
                $.ajax({
                    url: querylURL,
                    method: "GET"
                }).then(function (response) {
                    var artistInfo = response.artist.bio.summary;
                    localStorage.setItem("bio", artistInfo);
                });

                // times out window for local storage to update
                setTimeout(function () {
                    // redirects window to results page
                    window.location.href = "./results.html"
                }, 200);
            } else {
                // updates error div if input if not valid
                $("#errorText").text("Search terms invalid, please try again");
            }
        }, 200);
    } else {
        // updates error div if input is incomplete
        $("#errorText").text("Search terms invalid, please try again");
    }
}

$(document).ready(function () {

    // run search function when search button is clicked
    $("#search").on("click", search);

    // runs search function when enter key is clicked
    $(document).bind("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#search").trigger("click");
        }
    });

    // redirects to wiki page when one of the top 5 artists is click
    $(".top-artist-names").on("click", function () {
        var artistName = $(this).text();
        window.location.href = "https://en.wikipedia.org/wiki/" + artistName;
        console.log(artistName);
    });

});