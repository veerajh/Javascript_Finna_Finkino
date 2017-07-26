$(function () {
    // Handler for .ready() called.

    var currentName;
    // http://localhost:3000/database
    //OMDB movie request, response
    //http://www.omdbapi.com/?

    function getMovie(movieName) {

        var encodedMovieName = encodeURIComponent(movieName);

        $.ajax({
            'url': 'http://www.omdbapi.com/?t=' + encodedMovieName,
            'dataType': 'json',
            'success': onMovieInfo
        });
    }

    function arraySimilarity(arr1, arr2) {
        var simCount = 0;

        for (var entry1 of arr1) {
            if (arr2.contains(entry1)) {
                simCount++;
            }
        }

        return simcount / ((arr1.length + arr2.length) / 2);

    }

    function getSimilarity(movie1, movie2) {
        var value = 0; //similarity between 0...100

        var sameDirector = movie1.director == movie2.director;
        var genreSimilarity = arraySimilarity(movie1.genre, movie2.genre);
        var actorSimilarity = arraySimilarity(movie1.actors, movie2.actors);
        value = genreSimilarity + actorSimilarity;
        if (sameDirector) {
            value += 0.5;
        }

        return value;
    }

    function compareMovies(movieName1, movieName2) {

        var encodedMovie1 = encodeURIComponent(movieName1);
        var encodedMovie2 = encodeURIComponent(movieName2);

        $.ajax({
            'url': 'http://www.omdbapi.com/?t=' + encodedMovie1,
            'dataType': 'json',
            'success': function (result1) {

                $.ajax({
                    'url': 'http://www.omdbapi.com/?t=' + encodedMovie2,
                    'dataType': 'json',
                    'success': function (result2) {
                        console.log(result1);
                        console.log(result2);
                    }
                });
            }
        });
    }

    function printMovie(movieInfo) {
        console.log('Title: ' + movieInfo.title);
        console.log('Genre: ' + movieInfo.genre);
        console.log('Director: ' + movieInfo.director);
        console.log('Actors: ' + movieInfo.actors);
        if (movieInfo.rottenValue) {
            console.log('Rotten Tomatoes points: ' + movieInfo.rottenValue);
        }

    }

    // from OMDB
    function onMovieInfo(data) {
        // console.log(data);
        var movieInfo = {};
        movieInfo.title = data.Title;
        movieInfo.genre = data.Genre.split(', ');
        movieInfo.actors = data.Actors.split(', ');
        movieInfo.director = data.Director;
        // ratings
        var ratingsArray = data.Ratings;
        var rottenValue;
        for (rating of ratingsArray) {
            if (rating.Source == 'Rotten Tomatoes') {
                rottenValue = rating.Value;
            }
        }
        if (rottenValue) {
            movieInfo.rottenValue = rottenValue;
        }
        printMovie(movieInfo);
    }

    getMovie('iron man');



    function getUserMovies(userName) {
        currentName = userName;
        $.ajax({
            'url': 'http://localhost:3000/database',
            'dataType': 'json',
            'success': onMovieData
        });
    }

    function onMovieData(data) {
        //console.log('onMovieData: '+JSON.stringify(data));
        var result = {};
        for (var entry of data) {
            // console.log(entry);

            if (entry.name.toLowerCase().includes(currentName.toLowerCase())) {
                result[entry.name] = entry.movies;
            }
        }
        console.log(result);
    }
    getUserMovies('matti');

    function getUser(name) {
        $.ajax({
            'url': 'http://localhost:3000/user/' + name,
            'dataType': 'json',
            'success': onUserData
        });
    }

    function onUserData(arr) {
        console.log('onUserData: ' + JSON.stringify(arr));
        if (arr[0]) {
            $('#result').append(arr[0].name + '<br>');
        } else {
            console.log('Not found!');
        }

    }

    $('#searchButton').click(function () {
        var userName = $('#nameInput').val();
        console.log(userName);
        getUser(userName);
    });

});