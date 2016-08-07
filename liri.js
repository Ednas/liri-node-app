//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//these add other programs to this one
var dataKeys = require("./keys.js");
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


//Creates a function for finding artist name from spotify
var getArtistNames = function(artist){
    return artist.name;
}

//Function for finding songs on Spotify
var getMeSpotify = function(songName){
//If it doesn't find a song, find Blink 182's What's my age again
    if (songName == undefined){
        songName = 'What\'s my age again';
    }

    spotify.search({type: 'track', query: songName}, function(err, data){
        if(err){
            console.log('Error occured: ' + err);
            return;
        }
            //debugger used to find out what's inside data in the iron-node console
        var songs = data.track.items;
        var data = [];
        
        //This for loop will display the information about the song(s) to the console
        for(var i=0; i< songs.length; i++){
           
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('------------------------------------');
        
        }
    });
}


var getTweets = function() {
	var client = new twitter(dataKeys.twitterKeys);

    var params = {screen_name: 'ednas', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response){

  		    if (!error) {
                for (var i = 0; i < tweets.length; i++) {

                console.log(" ")
                console.log(tweets[i].created_at);
                console.log(" ")
                console.log(tweets[i].text);
                console.log('==============================================')

            }
        }
    });
};

var getMeMovie = function(movieName){
//if the movie name is undefined, give Mr Nobody
    if(movieName == undefined){
        movieName = 'Mr Nobody';
    }

    var urlHit = 'http://www.ombdapi.com/?t' + movieName + "&y=&plot=full&tomatoes=true&r=json";
    request(urlHit, function(error, response, body){
        if(!error && response.statusCode == 200){
            var jsonData = JSON.parse(body);

        console.log('Title: ' + jsonData.Title);
        console.log('Year: ' + jsonData.Year);
        console.log('Rated: ' + jsonData.Rated);
        console.log('IMDB Rating: ' + jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.Language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}
// console.log(JSON.stringify(data, null, 2));

var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(error, data){
        console.log(data);

        var dataArr = data.split(',')

        if (dataArr.length == 2){
            pick(dataArr[0], dataArr[1]);
        }else if(dataArr.length == 1){
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData){
    switch(caseData) {
        case 'my-tweets':
            getTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('LIRI doesn\'t know that');
    }
}

//run this on load of js file
var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);