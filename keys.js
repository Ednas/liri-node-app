//get your API creds by following these steps:
//Step One: https://apps.twitter.com/app/new
//Step Two: use http:// for your urls
//Step Three: then go to Keys and Access Tokens to get your credentials for below
//Step Four: then you have to click the button below on that page to create an access token
exports.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};