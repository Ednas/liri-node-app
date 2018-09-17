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
let header = "================= Extraordinary Liri found this ...=================="
let program = process.argv[2];
let choice = process.argv[3];



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
};


// =================================================================
// Spotify function, Spotify api
function getMeSpotify(songName) {
    let spotify = new Spotify(dataKeys.spotify);

    if (!songName) {
        songName = "What's my age again";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output =
                space + header +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n";
            console.log(output);
            writeToLog(output);
        }
    });
}

var getNEO = function() {
    var startDate = "1999-12-03";
    var endDate = "1999-12-10";
    if (startDate === undefined) {
        startDate = "12/04/1996";
    }

    var urlHit = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=smpOoGW6IuQgqcUmIAgJ0fICeLXteQwyUeazHF0c";

    request(urlHit, function(error, response, body) {
        if (error) {
            console.log(error);
        } else if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            // console.log(jsonData.element_count);
            console.log("------------Data of Near Earth Objects-----------------");
            var neow1 = jsonData.near_earth_objects[endDate];
            console.log(space + "Name: " + neow1[1].name);
            console.log(space + "ID: " + neow1[1].id);
            console.log(space + "Hazardous: " + neow1[1].is_potentially_hazardous_asteroid);
            console.log(space + "Diamater min (Km): " + neow1[1].estimated_diameter.kilometers.estimated_diameter_min);
            console.log(space + "Diamater max (Km): " + neow1[1].estimated_diameter.kilometers.estimated_diameter_max);
        } else {
            console.log(response.statusCode);
        }
    });
};

function catName(name) {
    if (!name) {
        name = "Tigger";
    }
    console.log("My cat's name is " + name);
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

let doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        writeToLog(data);

        let dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }

    });
};

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
]

inquirer
    .prompt(questions)
    .then(answers => {
        console.log("Your choice was: " + answers.programs);
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