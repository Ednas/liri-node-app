//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//these add other programs to this one
require("dotenv").config();
let dataKeys = require("./keys.js");
let fs = require('fs'); //file system
let twitter = require('twitter');
let Spotify = require('node-spotify-api');
let request = require('request');
var inquirer = require('inquirer');

let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
let header = "================= Extraordinary Liri found this ...==================";


// Function that writes all the data from output to the logfile
function writeToLog(data) {
    fs.appendFile("log.txt", '\r\n\r\n', function(err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.appendFile("log.txt", (data), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(space + "log.txt was updated!");
    });
}

function catName(name) {
    if (!name) {
        name = "Tigger";
    }
    console.log("My cat's name is " + name);
}

// =================================================================
// Spotify function, Spotify api
function getMeSpotify(songName) {
    let spotify = new Spotify(dataKeys.spotify);
    // If there is no song name, set the song to Blink 182's What's my age again
    if (!songName) {
        songName = "What's my age again";
    }
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                "================= LIRI FOUND THIS FOR YOU...==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(output);
            writeToLog(output);
        }
    });

}
// TODO: Need to pass in year, begin date and end date
function getNEO() {
    // Placeholder variables until I pass in the dates
    var startDate = "1999-12-03";
    var endDate = "1999-12-10";
    // In case that no date is passed through (API defaults to end date + 7 days from start date)
    if (startDate === undefined) {
        startDate = "1996-12-01";
    }
    // URL for the API
    var urlHit = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=smpOoGW6IuQgqcUmIAgJ0fICeLXteQwyUeazHF0c";

    request(urlHit, function(error, response, body) {
        if (error) {
            console.log(error);
        } else if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            var neow1 = jsonData.near_earth_objects[endDate];
            output =
                space + header +
                space + "-----------------    Data of Near Earth Objects    ------------------" +
                space + "Name: " + neow1[1].name +
                space + "ID: " + neow1[1].id +
                space + "Hazardous: " + neow1[1].is_potentially_hazardous_asteroid +
                space + "Diamater min (Km): " + neow1[1].estimated_diameter.kilometers.estimated_diameter_min +
                space + "Diamater max (Km): " + neow1[1].estimated_diameter.kilometers.estimated_diameter_max;
            console.log(output);
            writeToLog(output);
        } else {
            console.log(response.statusCode);
        }
    });
}

let getTweets = function() {
    let client = new twitter(dataKeys.twitter);
    let params = { screen_name: 'ednas', count: 10 };

    client.get('statuses/user_timeline', params, function(err, tweets, res) {
        let data = []; //empty array to hold data

        data.push(space + header);
        if (err) {
            console.log('Error occured: ' + err);
            return;
        } else {
            for (let i = 0; i < tweets.length; i++) {
                data.push(
                    space + 'Created at: ' + tweets[i].created_at +
                    space + 'Tweet: ' + tweets[i].text + "\n"
                );
            }
            let newData = data.join('');
            console.log(newData);
            writeToLog(newData);
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
            output = space + header +
                space + 'Title: ' + jsonData.Title +
                space + 'Year: ' + jsonData.Year +
                space + 'Rated: ' + jsonData.Rated +
                space + 'IMDB Rating: ' + jsonData.imdbRating +
                space + 'Country: ' + jsonData.Country +
                space + 'Language: ' + jsonData.Language +
                space + 'Plot: ' + jsonData.Plot +
                space + 'Actors: ' + jsonData.Actors +
                space + 'Tomato Rating: ' + jsonData.Ratings[1].Value +
                space + 'IMDb Rating: ' + jsonData.imdbRating + "\n";

            console.log(output);
            writeToLog(output);
        }
    });
};

function doWhatItSays() {
    // Reads the random text file and passes it to the spotify function
    fs.readFile("random.txt", "utf8", function(error, data) {
        getMeSpotify(data);
    });
}

let questions = [{
        type: 'list',
        name: 'programs',
        message: 'What would you like to do?',
        choices: ['Spotify', 'Movie', 'Get Latest Tweets', 'Name my cat', 'NASA info', 'Do what it says']
    },
    {
        type: 'input',
        name: 'movieChoice',
        message: 'What\'s the name of the movie you would like?',
        when: function(answers) {
            return answers.programs == 'Movie';
        }
    },
    {
        type: 'input',
        name: 'songChoice',
        message: 'What\'s the name of the song you would like?',
        when: function(answers) {
            return answers.programs == 'Spotify';
        }
    },
    {
        type: 'input',
        name: 'catName',
        message: 'What would you name your cat?',
        when: function(answers) {
            return answers.programs == 'Name my cat';
        }
    }
];

inquirer
    .prompt(questions)
    .then(answers => {
        // Depending on which program the user chose to run it will do the function for that program
        switch (answers.programs) {
            case 'Get Latest Tweets':
                getTweets();
                break;
            case 'Spotify':
                getMeSpotify(answers.songChoice);
                break;
            case 'Movie':
                getMeMovie(answers.movieChoice);
                break;
            case 'Name my cat':
                catName(answers.catName);
                break;
            case 'Do what it says':
                doWhatItSays();
                break;
            case 'NASA info':
                getNEO();
                break;
            default:
                console.log('LIRI doesn\'t know that');
        }
    });