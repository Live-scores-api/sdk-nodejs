const livescoreapi = require("livescoreapi");

client = livescoreapi.LivescoreAPI("<KEY>", "<SECRET>", 'http://livescore-api.com/api-client/');

client.getAllLiveScores((err, livescores) => {
    if (err) {
        console.log(err);
    } else {
        console.log(livescores);
    }
})