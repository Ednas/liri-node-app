# Liri - a node application

To install these npm packages, cd into the folder, then run 

```
npm install 
```

### Commands to run LIRI

Since I've added the Inquirer package, you just need to run 

```node liri.js``` it will prompt you to select a query and then asks you for the value (i.e. song name, movie name)

~~Follow the format presented in these queries~~
<del>```
-node liri.js my-tweets
-node liri.js spotify-this-song '<song name here>'
-node liri.js movie-this '<movie name here>'
-node liri.js do-what-it-says 
```</del>

#### Changes
*2018 - npm package spotify hasn't been maintained, so I switched to node-spotify-api to handle the spotify requests.*

### API Credential sites

Twitter: https://apps.twitter.com/app/new

Spotify: https://developer.spotify.com/my-applications/

OMDb API: http://www.omdbapi.com/apikey.aspx