// when page loads function is called
$(document).ready(function () {

    // function to get lyrics and bio of artist from local storage
    function pull() {
        var lyrics = localStorage.getItem("lyrics");
        var bio = localStorage.getItem("bio");

        // adds data to divs
        $("#lyric").text(lyrics);
        $("#artist").append(bio);
    }

    // calls pull function
    $(document).ready(pull);

    // button to go back to home page and clear local storage
    $("#backBtn").on("click", function () {
        window.location.href = "index.html";
        localStorage.clear();
    })
});