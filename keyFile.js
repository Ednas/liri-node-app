//Because I'm getting a lot of forks and code is being copied by other students, you do need a file called
//Keys, this is basically what it will have, but you need to put your own API creds in it.
//Good luck!
//-ET

console.log('this is loaded');

//get your API creds by following these steps:
//Step One: https://apps.twitter.com/app/new
//Step Two: use http:// for your urls
//Step Three: then go to Keys and Access Tokens to get your credentials for below
//Step Four: then you have to click the button below on that page to create an access token

exports.twitterKeys = {
    consumer_key: 'Long String',
    consumer_secret: 'Shhhh Secret',
    access_token_key: 'Long String',
    access_token_secret: 'Shhhh Secret',
};

//Get your Spotify API creds here: https://developer.spotify.com/my-applications/

exports.spotifyKeys = {
    id: 'Long String',
    secret: 'Shhhh Secret'
};