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

//brings in twitter information
// var mytweets = function(){
//   var client = new Twitter(keys.twitterKeys);
// //finds 20 tweets from @ednas
// var params = {screen_name: 'ednas', count: 20};
//
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });
// }
// console.log(mytweets);
var getTweets = function() {
	var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'ednas',
                count: 20
              };

    client.get('statuses/user_timeline.json', params, function(error, tweets, response){

  		    if (!error) {
                for (var i = 0; i < tweets.length; i++) {

                console.log(" ")
                console.log(tweets[i].created_at);
                console.log(" ")
                console.log(tweets[i].text);
                console.log('==============================================')


        //var tweetData = tweets[i].created_at + '\n' + tweets[i].text;

         fs.appendFileSync('log.txt', '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n', 'utf8', function(err) {
            if (err) throw err;
        })
    }

        }
    });
};


// console.log(JSON.stringify(data, null, 2));
