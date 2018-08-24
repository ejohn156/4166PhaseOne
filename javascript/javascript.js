$(document).ready(function () {
    event = null
    var movie = "The Matrix"
    main(event, movie)
})


$("#movieSearch").on("click", function (event) {
    var movie = ($("#input").val().trim())
    main(event, movie)
})


function popMovie(res) {
    var infoArr = {
        title: (res.Title),
        year: (res.Year),
        rating: (res.Rated),
        released: (res.Released),
        review: (res.Ratings),
        plot: res.Plot,
        image: res.Poster
    }
    return infoArr
}

function movieToHtml(info) {
    var infoDiv = $("<div>")
    var movImage = $("<img>")
    var movTitle = $("<li>")
    var movYear = $("<li>")
    var movRating = $("<li>")
    var movReleased = $("<li>")
    var movReview = $("<li>")
    var movPlot = $("<li>")

    movTitle.html("<p>Title: " + info.title + "</p>")
    movYear.html("<p>Release Year: " + info.year+"</p>")
    movRating.html("<p>Rated: " + info.rating+"</p>")
    movReleased.html("<p>Release Date: " + info.released+"</p>")
    movReview.html("<p>Review: " + info.review[0].Source + "<br>" + info.review[0].Value +"</p>")
    movPlot.html("<p>Plot: " + info.plot+"</p>")
    movImage.attr("src",info.image)
    
    infoDiv.append(movTitle)
    infoDiv.append(movYear)
    infoDiv.append(movRating)
    infoDiv.append(movReleased)
    infoDiv.append(movReview)
    infoDiv.append(movPlot)
    $("#pic").append(movImage)
    $("#info").append(infoDiv)
}

function main(event,movie){
    if(event !== null)
    event.preventDefault()
    var movie = movie

    $.ajax({
        url: "https://www.omdbapi.com/?t=" + movie + "&apikey=69a48cda",
        method: "GET",
        async: true
    }).then(function (res) {
        if(res.Title === undefined)
        alert("We could not find that movie, please try another")
        else{
        $("#info").empty()
        $("#pic").empty()
        var info = popMovie(res)
        movieToHtml(info)
        $("#input").val("")
        }
    })
}