//Function for finding songs on Spotify
var getMeSpotify = function(songName) {
    //If it doesn't find a song, find Blink 182's What's my age again
    if (songName === undefined) {
        songName = 'What\'s my age again';
    };

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        var data = []; //empty array to hold data

        for (var i = 0; i < songs.length; i++) {
            data.push({
                'artist(s)': songs[i].artists.map(getArtistNames),
                'song name: ': songs[i].name,
                'preview song: ': songs[i].preview_url,
                'album: ': songs[i].album.name,
            });
        }
        console.log(data);
        writeToLog(data);
    });
};