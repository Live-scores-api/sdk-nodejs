const livescoreapi = require("./LivescoreAPI-sdk/index");

client = livescoreapi.LivescoreAPI("jKmNacIioQWUs3UD", "Re1D24KqMVULrKBKvYxGbgYA7UuAYodQ", 'http://livescore-api.com/api-client/');

client.getAllLiveScores((err, livescores) => {
    if (err) {
        console.log(err);
    } else {
        console.log(livescores);
    }
})