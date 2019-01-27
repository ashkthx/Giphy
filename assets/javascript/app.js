var topics = ["yes", "no", "happy", "shrug", "facepalm"];

//Function to display gifs
function displayReactions() {
    var reaction = $(this).attr("data-name");
    var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        reaction +
        "&api_key=GmXLgDD3YEWnElW37802fljmKykccnAp";

    //AJAX call to Giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //Div to hold the gifs
        for (var i = 0; i < 10; i++) {
            var newReaction = $("<div>");
            newReaction.addClass("newReaction");
            //Rating
            var reactionRating = $("<h6>");
            reactionRating.text("Rating :" + response.data[i].rating);
            //Display the images
            var reactionImgage = $("<img>");
            reactionImgage.addClass("reactionImage");
            reactionImgage.attr("src", response.data[i].images.fixed_width_still.url);
            reactionImgage.attr(
                "data-still-url",
                response.data[i].images.fixed_width_still.url
            );
            reactionImgage.attr(
                "data-animated-url",
                response.data[i].images.fixed_width.url
            );
            reactionImgage.attr(".img-thumbnail");

            newReaction.append(reactionRating);
            newReaction.append(reactionImgage);
            $("#gifResults").prepend(newReaction);
        }
    });
};

//Display buttons
function renderButtons() {
    $("#myButtons").empty();
    $("#reactionInput").val("");
    //Loop through topics
    for (var i = 0; i < topics.length; i++) {
        //Generate buttons
        var a = $("<button>");
        //Add class to button
        a.addClass("reaction btn btn-gradient-light border border-dark m-2");
        a.attr("data-name", topics[i]);
        //Add text to button
        a.text(topics[i]);
        $("#myButtons").append(a);
    }
};

//On click fucntion
$("#submitSearch").on("click", function (event) {
    event.preventDefault();
    //Get input from user
    var reaction = $("#reactionInput")
        .val()
        .trim();
    //Push new input to the topics array
    topics.push(reaction);
    renderButtons();
});

//Add click event listeners to all elements with the reaction class
$(document).on("click", ".reaction", displayReactions);
$(document).on("click", ".reactionImage", startStopGif);
renderButtons();

//Start and stop gif
function startStopGif() {
    if ($(this).attr("src") === $(this).attr("data-still-url")) {
        $(this).attr("src", $(this).attr("data-animated-url"));
    } else if ($(this).attr("src") === $(this).attr("data-animated-url")) {
        $(this).attr("src", $(this).attr("data-still-url"));
    }
};
