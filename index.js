const request = require('request');
const fixtures = require('./fixtures');
const leagues = require('./leagues');
const countries = require('./countries');
const livescores = require('./livescores');
const history = require('./history');

const apiUrl = 'http://livescore-api.com/api-client/';
let key = 'jKmNacIioQWUs3UD';
let secret = 'Re1D24KqMVULrKBKvYxGbgYA7UuAYodQ';

const buildUrl = (route, parameters = []) => {
    let url = apiUrl + route;

    const params = new URLSearchParams();
    params.set('key', key);
    params.set('secret', secret);
    parameters.forEach(paramObj => {
        params.set(paramObj.name, paramObj.value);
    });

    url += '?' + params.toString();
    return url;
};

//set api key and secret
const setKeySecre = (inputKey, inputSecret) => {
    key = inputKey;
    secret = inputSecret;
}

//check api key and secret
const checkKeySecret = () => {
    request(buildUrl('users/pair.json'), {
        json: true
    }, (err, res, body) => {
        if (err) {
            throw err;
        }
        return res.body.data.message;
    });
};


// ///test
// getHistoryLeagueLanguage(10, 'ru', (err, liveScores) => {
//     if (err) {
//         //handel error
//         console.error(err);
//     } else {
//         // do stuff 
//         console.log(liveScores);
//     }
// });