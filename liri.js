//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//these add other programs to this one
let dataKeys = require("./keys.js");
let fs = require('fs'); //file system
let twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');
let space = "\n" + "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

let writeToLog = function(data) {
    fs.appendFile("log.txt", '\r\n\r\n');

    fs.appendFile("log.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("log.txt was updated!");
    });
}


// =================================================================
// Spotify function, Spotify api
function getMeSpotify(songName) {
    let spotify = new Spotify(dataKeys.spotifyKeys);

    if (!songName) {
        songName = "What's my age again";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
            console.log(output);

            fs.appendFile("log.txt", output, function(err) {
                if (err) throw err;
                console.log('Saved!');
            });
        };
    });
}

let getTweets = function() {
    let client = new twitter(dataKeys.twitterKeys);
    let params = { screen_name: 'ednas', count: 10 };


    client.get('statuses/user_timeline', params, function(err, tweets, res) {

        if (!err) {
            // let data = space + 'created at: ' + tweets.created_at +
            //     space + 'Tweets: ' + tweets.text;
            let data = []; //empty array to hold data
            for (let i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ': tweets[i].created_at,
                    'Tweets: ': tweets[i].text,
                });
            }
            console.log(data);
            writeToLog(data);
        }
    });
};

let getMeMovie = function(movieName) {

    if (!movieName) {
        movieName = "Mr Nobody";
    }
    //Get your OMDb API key creds here http://www.omdbapi.com/apikey.aspx
    // t = movietitle, y = year, plot is short, then the API key
    let urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=33981212";

    request(urlHit, function(err, res, body) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            let jsonData = JSON.parse(body);
            // console.log(jsonData);
            output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
                space + 'Title: ' + jsonData.Title +
                space + 'Year: ' + jsonData.Year +
                space + 'Rated: ' + jsonData.Rated +
                space + 'IMDB Rating: ' + jsonData.imdbRating +
                space + 'Country: ' + jsonData.Country +
                space + 'Language: ' + jsonData.Language +
                space + 'Plot: ' + jsonData.Plot +
                space + 'Actors: ' + jsonData.Actors +
                space + 'IMDb Rating: ' + jsonData.imdbRating + "\n\n\n";

            console.log(output);

            fs.appendFile("log.txt", output, function(err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    });
}

let doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        writeToLog(data);
        let dataArr = data.split(',')

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }

    });
}

let pick = function(caseData, functionData) {
    switch (caseData) {
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
let runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);