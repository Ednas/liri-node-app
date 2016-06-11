// 8. Make it so liri.js can take in one of the following arguments

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


//brings in twitter information
var params = {screen_name: 'nodejs'};
dataKeys.exports.twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
var tweets = process.argv;
var nodeArg = process.argv;


// console.log(JSON.stringify(data, null, 2));
